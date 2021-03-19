const { AuthenticationError, UserInputError } = require("apollo-server-core");

const {
  Answer,
  Submission,
  Doctor,
  Patient,
  Image,
  Question,
} = require("../../models/index.js");
const isAuth = require("../../utils/isAuth");
const imageUploader = require("../../utils/filestreamUploader");
const stringToJSON = require("../../utils/jsonProvider/parse.js");

module.exports = {
  Query: {
    getSubmissions: async (_, { patient_id: id }, context) => {
      const user = isAuth(context);
      const account_type = user.accountType;
      let submissions = [];

      // If user is patient, just return all their submissions
      // If user is doctor,
      // If doctor asked for patient_id: return all the submissions for the correct patient based on patient_id
      // If doctor did not provide a patient_id: return all submissions from all their patients
      // Else return error

      switch (account_type) {
        case "DOCTOR":
          const doctor = await Doctor.findByPk(user.id);
          if (id) {
            const patient = await Patient.findByPk(id);
            if (!patient) {
              throw new UserInputError("This patient does not exist.");
            }

            if (await doctor.hasPatient(patient)) {
              submissions = await patient.getSubmissions({
                include: [
                  Patient,
                  Image,
                  {
                    model: Answer,
                    include: [Question],
                  },
                ],
              });
            } else {
              throw new UserInputError("This patient does not belong to you.");
            }
          } else {
            const patients = await doctor.getPatients();
            for await (const patient of patients) {
              const patientSubmissions = await patient.getSubmissions({
                include: [
                  Patient,
                  Image,
                  {
                    model: Answer,
                    include: [Question],
                  },
                ],
              });
              submissions.push(...patientSubmissions);
            }
          }

          break;
        case "PATIENT":
          const patient = await Patient.findByPk(user.id);
          submissions = await patient.getSubmissions({
            include: [
              Patient,
              Image,
              {
                model: Answer,
                include: [Question],
              },
            ],
          });
          break;
        default:
          break;
      }
      return submissions || [];
    },
    getSubmission: async (_, { submission_id }, context) => {
      let user = isAuth(context);

      // find the submission
      // find the patient who owns this submission
      // if the user is a patient, and they own it, show it
      // if the user is a doctor, and they own the patient who owns it, show it
      // else return error

      const submission = await Submission.findByPk(submission_id);
      if (!submission) {
        throw new UserInputError("This submission does not exist.");
      }
      const submission_owner = await submission.getPatient();

      if (user.accountType === "PATIENT") {
        const patient = await Patient.findByPk(user.id);
        if (patient === submission_owner) {
          return submission;
        }
      } else if (user.accountType === "DOCTOR") {
        const doctor = await Doctor.findByPk(user.id);
        if (doctor.hasPatient(submission_owner)) {
          return submission;
        }
      } else {
        throw new AuthenticationError(
          "You are not logged into the correct account to access this submission."
        );
      }
    },
    getSubmissionsForReview: async (_, __, context) => {
      const user = isAuth(context);

      if (user.accountType !== "DOCTOR") {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      const doctor = await Doctor.findByPk(user.id);

      if (!doctor) {
        throw new UserInputError("Invalid doctor");
      }

      // Get all submissions that belong to patients of this doctor which have no flag
      let submissions = [];
      const patients = await doctor.getPatients();
      for await (const patient of patients) {
        const patient_submissions = await patient.getSubmissions({
          where: { flag: null },
          include: [
            Patient,
            Image,
            {
              model: Answer,
              include: [Question],
            },
          ],
        });
        submissions.push(...patient_submissions);
      }

      console.log("UNREVIEWED submissions: ", submissions);

      return submissions || [];
    },
  },
  Mutation: {
    createSubmission: async (_, { images, answers }, context) => {
      // Authenticate user, only allow patients
      const user = isAuth(context);
      if (user.accountType != "PATIENT") {
        throw new AuthenticationError("Invalid account type!");
      }

      if (!images && !answers) {
        throw new UserInputError(
          "Must supply at least either answers to a questionnaire or an image!"
        );
      }

      const patient = await Patient.findByPk(user.id);

      // Create submission
      const submission = await new Submission({
        patient_id: user.id,
      }).save();

      // Create images and add them to the submission
      images.forEach(async (image) => {
        const { Location: location } = await imageUploader(image);
        const imageSave = await new Image({
          name: location,
          url: location,
          submission_id: submission.id,
        }).save();
      });

      // Create answers and add them to the submission
      if (answers !== undefined) {
        answers = stringToJSON(answers);
        // if (Object.keys(answers.questionnaire).length !== 8) {
        //   throw new UserInputError("Invalid number of answers");
        // }
      }

      for (const questionId in answers.questionnaire) {
        const answerSave = await new Answer({
          question_id: questionId,
          submission_id: submission.id,
          value: answers.questionnaire[questionId] === "0" ? false : true,
        }).save();
      }

      const requests = await patient.getRequests({
        where: {
          fulfilled: null,
        },
      });

      requests.forEach(async (request) => {
        if (
          (images !== undefined &&
            images.length > 0 &&
            answers !== undefined) ||
          (images !== undefined &&
            images.length > 0 &&
            request.getDataValue("type") === 1) ||
          (answers !== undefined && request.getDataValue("type") === 2)
        ) {
          request.submission_id = submission.id;
          request.fulfilled = new Date();
          await request.save();
        }
      });

      return true;
    },
    flagSubmission: async (_, { submission_id, flag }, context) => {
      // Authenticate user, only allow doctors
      const user = isAuth(context);
      if (user.accountType != "DOCTOR") {
        throw new AuthenticationError("Invalid account type!");
      }

      if (flag < 1 || flag > 3) {
        throw new UserInputError("Invalid flag value. Must be 1-3 (inclusive)");
      }

      const doctor = await Doctor.findByPk(user.id);
      const submission = await Submission.findByPk(submission_id);
      const patient = await submission.getPatient();

      const canFlag = await doctor.hasPatient(patient);
      if (!canFlag) {
        throw new AuthenticationError("You cannot flag this submission");
      }

      await submission.update({ flag });
      return submission;
    },
  },
};

const { AuthenticationError, UserInputError } = require("apollo-server-core");

const {
  Answer,
  Submission,
  Doctor,
  Patient,
  Image,
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
              submissions = await patient.getSubmissions();
            } else {
              throw new UserInputError("This patient does not belong to you.");
            }
          } else {
            const patients = await doctor.getPatients();
            patients.forEach(async (patient) => {
              const patientSubmissions = await patient.getSubmissions();
              submissions.push(patientSubmissions);
            });
          }
          break;
        case "PATIENT":
          const patient = await Patient.findByPk(user.id);
          submissions = await patient.getSubmissions();
          break;
        default:
          break;
      }
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
        console.log(Object.keys(answers.questionnaire).length)
        if (Object.keys(answers.questionnaire).length !== 8)
          throw new UserInputError("Invalid number of answers");
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
  },
};

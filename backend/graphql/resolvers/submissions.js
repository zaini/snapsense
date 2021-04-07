const {
  ApolloError,
  AuthenticationError,
  UserInputError,
} = require("apollo-server");

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
const validateUpload = require("../../utils/filestreamValidate.js");
const { getDoctorById, getPatientById } = require("./utils/userAuthorisation");

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
            const patient = await getPatientById(id);

            if (await doctor.hasPatient(patient)) {
              submissions = await patient.getSubmissions({
                order: [["createdAt", "DESC"]],
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
                order: [["createdAt", "DESC"]],
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
          const patient = await getPatientById(user.id);
          submissions = await patient.getSubmissions({
            order: [["createdAt", "DESC"]],
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
          throw new ApolloError("Invalid user type", 400);
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

      const submission = await getSubmissionById(submission_id);
      const submission_owner = await submission.getPatient();

      if (user.accountType === "PATIENT") {
        const patient = await Patient.findByPk(user.id);
        if (patient.id === submission_owner.id) {
          return submission;
        } else {
          throw new UserInputError("This submission does not exist!");
        }
      } else if (user.accountType === "DOCTOR") {
        const doctor = await Doctor.findByPk(user.id);
        if (await doctor.hasPatient(submission_owner)) {
          return submission;
        } else {
          throw new UserInputError("This submission does not exist!!");
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

      const doctor = await getDoctorById(user.id);

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

      answers = stringToJSON(answers);

      // Check what all content has been uploaded
      let imageUploadExists = images.length > 0;
      let answerUploadExists = Object.keys(answers.questionnaire).length > 1;

      // One or more should exist
      if (!(imageUploadExists || answerUploadExists)) {
        throw new UserInputError(
          "Must supply at least either answers to a questionnaire or an image!"
        );
      }

      // If some answers have been submitted, validate them
      if (answerUploadExists) {
        if (Object.keys(answers.questionnaire).length < 8) {
          throw new UserInputError("Please answer all questions");
        } else {
          let radioAll = true;
          Object.keys(answers.questionnaire).forEach((p, i) => {
            console.log(p);
            if (p < 9) {
              if (!answers.questionnaire[p].val) {
                radioAll = false;
              }
            }
          });

          if (!radioAll) {
            throw new UserInputError(
              "Please select Yes or No for all questions"
            );
          }
        }
      }

      // Validate Images Here
      if (imageUploadExists) {
        for await (const image of images) {
          await validateUpload(image);
        }
      }

      const patient = await getPatientById(user.id);

      // Create submission
      const submission = await new Submission({
        patient_id: user.id,
      }).save();

      // Create images and add them to the submission
      if (imageUploadExists) {
        for await (const image of images) {
          const { Location: location } = await imageUploader(image);
          await new Image({
            name: location,
            url: location,
            submission_id: submission.id,
          }).save();
        }
      }

      if (answerUploadExists) {
        for (const questionId in answers.questionnaire) {
          if (questionId < 9) {
            await new Answer({
              question_id: questionId,
              submission_id: submission.id,
              extra: answers.questionnaire[questionId]
                ? answers.questionnaire[questionId].extra
                : null,
              value: !(answers.questionnaire[questionId].val === "0"),
            }).save();
          }
        }
      }

      const requests = await patient.getRequests({
        where: {
          fulfilled: null,
        },
      });

      requests.forEach(async (request) => {
        if (requestIsFulfilled(images, answers, request)) {
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

      isFlagValid(flag);

      const doctor = await getDoctorById(user.id);
      const submission = await getSubmissionById(submission_id);
      const patient = await submission.getPatient();

      const canFlag = await doctor.hasPatient(patient);
      if (!canFlag) {
        throw new AuthenticationError("You cannot flag this submission");
      }

      await submission.update({ flag });
      await patient.update({ flag });
      return submission;
    },
  },
};

const isFlagValid = (flag) => {
  if (flag < 1 || flag > 3) {
    throw new UserInputError("Invalid flag value. Must be 1-3 (inclusive)");
  }
};

const requestIsFulfilled = (images, answers, request) => {
  return (
    (images !== undefined &&
      images.length > 0 &&
      answers !== undefined &&
      Object.keys(answers.questionnaire).length > 1) ||
    (images !== undefined &&
      images.length > 0 &&
      request.getDataValue("type") === 1) ||
    (answers !== undefined &&
      Object.keys(answers.questionnaire).length > 1 &&
      request.getDataValue("type") === 2)
  );
};

const getSubmissionById = async (submission_id) => {
  const submission = await Submission.findOne({
    where: { id: submission_id },
    include: [
      Patient,
      Image,
      {
        model: Answer,
        include: [Question],
      },
    ],
  });

  if (!submission) {
    throw new UserInputError("This submission does not exist.");
  }
  return submission;
};

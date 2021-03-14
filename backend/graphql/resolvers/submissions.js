const { Submission, Doctor, Patient } = require("../../models/index.js");
const isAuth = require("../../utils/isAuth");
const { UserInputError } = require("apollo-server-core");

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
    createSubmission: async (_, submission_details) => {
      const submission = new Submission({
        ...submission_details,
        createdAt: new Date(),
      });

      return { ...submission.save() };
    },
  },
};

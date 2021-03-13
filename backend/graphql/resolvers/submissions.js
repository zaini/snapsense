const { Submission } = require("../../models/index.js");
const isAuth = require("../../utils/isAuth");

module.exports = {
  Query: {
    getSubmissions: async (_, { patient_id: id }, context) => {
      const user = isAuth(context);

      const account_type = user.account_type;
      let submissions = [];

      // TODO check this actually works lol

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
            if (await doctor.hasPatient(patient)) {
              submissions = await patient.getSubmissions();
            }
          } else {
            const patients = await doctor.getPatients();
            patients.forEach(async (patient) => {
              const patientSubmissions = await patient.getSubmissions();
              submissions.push(patientSubmissions);
            });
          }

          return submissions;
        case "PATIENT":
          const patient = await Patient.findByPk(user.id);
          submissions = await patient.getSubmissions();
        default:
          break;
      }

      return submissions || [];
    },

    //getSubmissionType

    getSpecificSubmission: async (_, { submission_id: id} , __) => {
      //account for such submission not existing? null case
      const submission = await Submission.findByPk(id);
      return submission;
    }
    
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

const { Submission } = require("../../models/index.js");

module.exports = {
  Query: {
    getSubmissions: async () => {
      try {
        const submissions = await Submission.findAll();
        return submissions;
      } catch (error) {
        throw new Error(error);
      }
    },

    //get all submissions related to a patient
    getSubmissionsByPatient: async (_, {}, context) => {
      const user = isAuth(context);

      //check that only assigned doctor can view? or just leave the 'patient' here?
      if (!(user.accountType === "PATIENT")) {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      try {
        const patient = await Patient.findOne({ where: { id: user.id } });
        const submissions = await patient.getSubmissions();

        return submissions;
      } catch (error) {
        throw new Error(error);
      }
    },   

    getSubmissionsByPatientByDoctor: async (_, { patient_id }, context) => {
      const user = isAuth(context);

      //check that only assigned doctor can view? or just leave the 'patient' here?
      if (!(user.accountType === "DOCTOR")) {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      try {
        const patient = await Patient.findOne({ where: { id: patient_id.id } });
        const submissions = await patient.getSubmissions();

        return submissions;
      } catch (error) {
        throw new Error(error);
      }
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

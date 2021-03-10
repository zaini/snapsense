const { Doctor, Hospital } = require("../../models/index.js");
const isAuth = require("../../utils/isAuth");

module.exports = {
  Query: {
    getDoctors: async () => {
      try {
        const doctors = await Doctor.findAll();
        return doctors;
      } catch (error) {
        throw new Error(error);
      }
    },

    //query to get all doctors from admin's hospital 
    getDoctorsByHospital: async (_, _, context) => { 
      const user = isAuth(context);

      if (!(user.accountType === "ADMIN")) {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      const {hospital_id} = user;

      try {
        const doctors = await Doctor.findAll({where: {hospital_id: hospital_id}});
        return doctors;
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Mutation: {},
};

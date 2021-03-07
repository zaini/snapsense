const { Doctor } = require("../../models/index.js");

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
    getDoctorsForHospital: async (_, {}, context) => {
      const user = isAuth(context);

      if (!(user.accountType === "ADMIN")) {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      try { //change where: condition to id: user.hospital_id 
        //why does getDoctors/getPatients gets those for a specific doctor/hospital? 
        //because that function above doesn't have any filters 
        //also add admin here?
        const hospital = await Hospital.findOne({ where: { id: user.hospital_id} });
        const doctors = await hospital.getDoctors();

        return doctors;
      } catch (error) {
        throw new Error(error);
      }
    }

  },
  Mutation: {},
};

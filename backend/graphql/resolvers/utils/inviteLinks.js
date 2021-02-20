const { ApolloError } = require("apollo-server");

const isAuth = require("../../../utils/isAuth");
const { createAccessToken } = require("./authTokens");
const { Admin, Doctor } = require("../../../models/index");
require("dotenv").config();

const URL_PREFIX = process.env.URL_PREFIX;

module.exports = {
  Mutation: {
    inviteUser: async (_, { email }, context) => {
      // Get the user and their email from the authorization header token
			
			const user = isAuth(context);
      const userEmail = user.dataValues.email;

      let role;

      switch (user.accountType) {
        case "ADMIN":
          role = "DOCTOR";
					// Check if JWT admin exists
					try {
						const admin = await Admin.findOne(user.id);
					} catch (error) {
						throw new ApolloError("Invalid user", 400);
					}

					// Check if doctor exists
					const doctor = await Doctor.findOne({where:{email}});
					if(doctor) {
						throw new ApolloError("Invalid recipient", 400)
					}
          break;
        case "DOCTOR":
          role = "PATIENT";

					// Check if JWT doctor exists
					try {
						const doctor = await Doctor.findOne(user.id);
					} catch (error) {
						throw new ApolloError("Invalid user", 400);
					}
          break;
        default:
          throw new ApolloError("Invalid invite request", 400);
          break;
      }

      // ADMIN CASES:
      // If admin sends request to an existing doctor, throw an error (DONE)
      // If admin sends request to a new doctor, render invite/:id (CLIENT SIDE)
      // If admin sends request to a new doctor, and after that doctor registers and clicks on the link again, render error page (CLIENT/BACKEND SIDE)

      // DOCTOR CASES:
      // Doctor -> new patient => render invite/:id
      // If doctors sends request to a new patient, and after that patient registers and clicks on the link again, render error page
      // Doctor -> existing patient => frontend sends a backend request creating the relation, then take user to home page
      // If doctor and patient are already related, don't do anything => render home/profile page

      const inviteTokenParams = {
        inviterEmail: userEmail,
        newAccountEmail: email,
        role,
      };

      const inviteToken = createAccessToken(inviteTokenParams);

      return `${URL_PREFIX}/invite/${inviteToken}`;
    },
  },
};

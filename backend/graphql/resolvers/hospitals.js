const { UserInputError } = require("apollo-server");

const { Hospital } = require("../../models/index.js");
const { getAuthenticatedSuperAdmin } = require("./utils/userAuthorisation");
const transactionalEmailSender = require("../../utils/transactionalEmailSender");

module.exports = {
  Query: {
    getHospitals: async (_, __, context) => {
      // Authenticate the super admin
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      // Get all hospitals
      try {
        const hospitals = await Hospital.findAll();
        return hospitals;
      } catch (error) {
        throw new Error(error);
      }
    },
    getSpecificHospital: async (_, { hospital_id }, context) => {
      // Authenticate the super admin
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      // Get specific hospital
      const hospital = await Hospital.findByPk(hospital_id);
      if (!hospital) {
        throw new UserInputError("Hospital does not exist");
      }
      return hospital;
    },
  },
  Mutation: {
    createHospital: async (_, hospital_details, context) => {
      // Authenticate the super admin
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      // Create the hospital
      const hospital = await new Hospital({
        ...hospital_details,
        createdAt: new Date(),
        updatedAt: new Date(),
      }).save();

      // Set email parameters for the template
      const htmlParams = {
        hospName: hospital_details.name,
      };

      // Set essential email parameters
      const emailParams = {
        to: hospital_details.contact_email,
        subject: "Snapsense Hospital Creation ",
        altbody: "Hospital has been created",
        template: "hospital",
        status: 0,
      };

      // Insert bundled email params into model
      await transactionalEmailSender(emailParams, htmlParams);

      return hospital;
    },
    deleteHospital: async (_, { hospital_id }, context) => {
      // Authenticate the super admin
      const superAdmin = await getAuthenticatedSuperAdmin(context);

      // Create the hospital
      const hospital = await Hospital.findByPk(hospital_id);

      if (!hospital) {
        throw new UserInputError("Hospital does not exist");
      }

      await hospital.destroy();

      return true;
    },
  },
};

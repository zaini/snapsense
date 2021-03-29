const { AuthenticationError, UserInputError } = require("apollo-server");
const { SuperAdmin, Doctor, Patient } = require("../../../models/index.js");
const isAuth = require("../../../utils/isAuth");

const getAuthenticatedSuperAdmin = async (context) => {
  // Get the user based on the context
  const user = isAuth(context);

  // Make sure user is a super admin
  if (user.accountType !== "SUPERADMIN") {
    throw new AuthenticationError("Invalid user account type!");
  }

  // Make sure the super admin is 'real' (i.e. in the db)
  const superAdmin = await SuperAdmin.findByPk(user.id);
  if (!superAdmin) {
    throw new AuthenticationError("Invalid user!");
  }

  return superAdmin;
};

// Get the doctor and make sure they exist
const getDoctorById = async (id) => {
  const doctor = await Doctor.findByPk(id);
  if (!doctor) {
    throw new UserInputError("Invalid user!");
  }
  return doctor;
};

// Get the patient and make sure they exist
const getPatientById = async (id) => {
  const patient = await Patient.findByPk(id);
  if (!patient) {
    throw new UserInputError("Invalid patient!");
  }
  return patient;
};

module.exports = { getAuthenticatedSuperAdmin, getDoctorById, getPatientById };

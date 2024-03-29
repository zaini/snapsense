const {
  AuthenticationError,
  UserInputError,
  ApolloError,
} = require("apollo-server-core");
const {
  Patient,
  Doctor,
  Request,
  Submission,
  ScheduledRequest,
  Image,
  Answer,
  Question,
} = require("../../models/index.js");
const isAuth = require("../../utils/isAuth.js");
const { Sequelize } = require("../../models/index");
const Op = Sequelize.Op;
const transactionalEmailSender = require("../../utils/transactionalEmailSender.js");
const { getDoctorById, getPatientById } = require("./utils/userAuthorisation");

const sendRequestEmail = async (doctor, patient, request_type, deadline) => {
  // Set email parameters for the template
  const htmlParams = {
    doctorEmail: doctor.email,
    patientEmail: patient.email,
    type: request_type,
    deadline: deadline,
  };

  // Set essential email parameters
  const emailParams = {
    to: patient.email,
    subject: "Snapsense Submission Request",
    altbody:
      "Please open the snapsense panel and send the desired information to your doctor.",
    template: "request",
    status: 0,
  };

  // Insert bundled email params into model
  await transactionalEmailSender(emailParams, htmlParams);
};

const requestScheduler = async (
  request,
  interval,
  frequency,
  doctor,
  patient
) => {
  console.log(`Recurring Requests: ${interval} - ${frequency}`);
  const startDate = new Date(request.deadline);
  try {
    const res = await new ScheduledRequest({
      doctor_id: doctor.id,
      patient_id: patient.id,
      request_id: request.id,
      interval,
      frequency,
      startDate,
    }).save();
    return res;
  } catch (e) {
    throw new ApolloError(e, 500);
  }
};

module.exports = {
  Query: {
    getRequestsAsPatient: async (_, __, context) => {
      const user = isAuth(context);

      if (user.accountType !== "PATIENT") {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      const patient = await getPatientById(user.id);

      const requests = await Request.findAll({
        where: { patient_id: patient.id },
        include: [Doctor, Patient, Submission],
      });

      return requests || [];
    },
    getRequestsAsDoctor: async (_, __, context) => {
      const user = isAuth(context);

      if (user.accountType !== "DOCTOR") {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      const doctor = await getDoctorById(user.id);

      const requests = await Request.findAll({
        where: { doctor_id: doctor.id },
        include: [Doctor, Patient, Submission],
      });

      return requests || [];
    },
    getRequestsForReview: async (_, __, context) => {
      const user = isAuth(context);

      if (user.accountType !== "DOCTOR") {
        throw new AuthenticationError(
          "You are not logged into the correct account for this feature."
        );
      }

      const doctor = await getDoctorById(user.id);

      const requests = await Request.findAll({
        where: {
          doctor_id: doctor.id,
          fulfilled: { [Op.ne]: null },
        },
        include: [
          Doctor,
          Patient,
          {
            model: Submission,
            where: { flag: null },
            include: [Image, { model: Answer, include: [Question] }],
          },
        ],
      });

      return requests || [];
    },
  },
  Mutation: {
    createRequest: async (
      _,
      { request_type, deadline, patient_id, interval, frequency },
      context
    ) => {
      // Authenticate user
      const user = isAuth(context);
      if (!user.accountType || user.accountType !== "DOCTOR") {
        throw new AuthenticationError("Invalid user credentials!");
      }

      validateInterval(interval);
      validateFrequency(frequency);

      const doctor = await getDoctorById(user.id);
      const patient = await getPatientById(patient_id);

      if (!(await doctor.hasPatient(patient))) {
        throw new UserInputError("This patient does not belong to you!");
      }

      // Source for date format below: https://stackoverflow.com/questions/8362952/javascript-output-current-datetime-in-yyyy-mm-dd-hhmsec-format
      try {
        // Create the request and save it
        const request = await new Request({
          doctor_id: doctor.id,
          patient_id: patient.id,
          type: request_type,
          deadline: new Date(parseInt(deadline))
            .toISOString()
            .slice(0, 19)
            .replace(/-/g, "/")
            .replace("T", " "),
        }).save();

        // Assign the request to both the doctor and patient
        await doctor.addRequest(request);
        await patient.addRequest(request);

        if (needsScheduling(interval, frequency)) {
          await requestScheduler(request, interval, frequency, doctor, patient);
        }
      } catch (error) {
        // An error will be thrown if the request is invalid as a result of a user input error
        throw new UserInputError(error);
      }

      await sendRequestEmail(doctor, patient, request_type, deadline);

      return true;
    },
  },
};

const needsScheduling = (interval, frequency) => {
  return interval > 0 && frequency > 0;
};

const validateFrequency = (frequency) => {
  if (frequency < 0 || frequency > 20) {
    throw new UserInputError("Invalid Frequency");
  }
};

const validateInterval = (interval) => {
  if (interval < 0 || interval > 20) {
    throw new UserInputError("Invalid Interval");
  }
};

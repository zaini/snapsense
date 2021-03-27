const { gql } = require("apollo-server");

module.exports = gql`
  # access token will include information such as account type/role
  type AuthResponse {
    accessToken: String
  }

  type Hospital {
    id: ID!
    name: String!
    contact_email: String!
    createdAt: String!
  }

  type Admin {
    id: ID!
    fname: String!
    lname: String!
    email: String!
    password: String!
    Hospital: Hospital!
    createdAt: String!
  }

  type Doctor {
    id: ID!
    fname: String!
    lname: String!
    email: String!
    password: String!
    Hospital: Hospital!
    createdAt: String!
  }

  type Patient {
    id: ID!
    fname: String!
    lname: String!
    email: String!
    password: String
    flag: Int
    createdAt: String!
  }

  type Submission {
    id: ID!
    Patient: Patient
    Images: [Image!]
    Answers: [Answer!]
    flag: Int
    createdAt: String!
  }

  type Request {
    id: ID!
    Doctor: Doctor
    Patient: Patient
    Submission: Submission
    type: Int!
    deadline: String!
    fulfilled: String
    createdAt: String!
  }

  type Image {
    id: ID!
    url: ID!
    createdAt: String!
  }

  type Question {
    id: ID!
    text: String!
  }

  type Answer {
    id: ID!
    Question: Question!
    value: Boolean!
    extra: String
  }

  type Feedback {
    id: ID!
    stars: Int!
    extra: String
  }

  type Mutation {
    createHospital(name: String!, contact_email: String!): Hospital
    createAdmin(
      fname: String!
      lname: String!
      email: String!
      password: String!
      hospital_id: ID!
    ): Admin!

    deleteAdmin(
      admin_id: ID!
    ): Boolean!

    createSubmission(images: [Upload!], answers: String!): Boolean!

    createRequest(
      request_type: Int!
      deadline: String!
      patient_id: ID!
      frequency: Int
      interval: Int
    ): Boolean!

    register(
      fname: String!
      lname: String!
      password: String!
      passwordConfirmation: String!
      invitationToken: String!
    ): Boolean

    login(
      email: String!
      password: String!
      account_type: String!
    ): AuthResponse

    inviteUser(email: String!): String!

    addPatientToDoctor(patient_email: String!, doctor_email: String!): Boolean!

    changePassword(password: String!, password_confirmation: String!): Boolean!
    deleteAccount(password: String!, password_confirmation: String!): Boolean!
    deleteHospital(hospital_id: ID!): Boolean!
    createFeedback(stars: Int!, extra: String): Feedback!

    flagSubmission(submission_id: ID!, flag: Int!): Submission
  }

  type Query {
    getHospitals: [Hospital!]
    getSpecificHospital(hospital_id: ID!): Hospital!
    getAdmins: [Admin!]
    getDoctors: [Doctor!]
    getPatients: [Patient!]
    getDoctorsAsAdmin: [Doctor!]
    getDoctorsAsPatient: [Doctor!]
		getQuestionnaire: [Question!]
    getSubmissions(patient_id: ID): [Submission!]
    getSubmission(submission_id: ID): Submission!
    getPatientAsDoctor(patient_id: ID!): Patient!
    getAdminById(admin_id: ID!): Admin!
    getPatientsAsDoctor: [Patient!]
    getRequestsAsPatient: [Request!]
    getRequestsAsDoctor: [Request!]
    getRequestsForReview: [Request!]
    getSpecificFeedback(feedback_id: ID!): Feedback!
    isLoggedIn: String!
    checkInvitation(invitationToken: String!): String!
    getFeedback: [Feedback!]
    getSubmissionsForReview: [Submission!]
  }
`;

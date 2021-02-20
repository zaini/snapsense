const { gql } = require("apollo-server");

module.exports = gql`
  # Each 'user' type will have to have an AccountRole associated with it
  # this is because on the frontend there must be a way to identify the
  # type of the user.
  # TODO can this just be string instead of enum? Because if we use enum we'll have to import it everywhere.
  enum AccountRole {
    ADMIN
    DOCTOR
    PATIENT
  }

  # access token will include information such as account type/role
  type LoginResponse {
    accessToken: String
  }

  type Hospital {
    id: ID!
    name: String!
    contact_email: String!
    createdAt: String!
  }

  # TODO move tokens to a 'me' function
  # The attribute 'token' will be used to determine whether the user is logged
  # in or not, it represents a JWT token

  type Admin {
    id: ID!
    fname: String!
    lname: String!
    email: String!
    password: String!
    role: AccountRole!
    hospital_id: ID!
    createdAt: String!
  }

  type Doctor {
    id: ID!
    fname: String!
    lname: String!
    email: String!
    password: String!
    role: AccountRole!
    admin_id: ID!
    createdAt: String!
  }

  type Patient {
    id: ID!
    fname: String!
    lname: String!
    email: String!
    password: String!
    role: AccountRole!
    createdAt: String!
  }

  type Submission {
    id: ID!
    patient_id: ID!
    doctor_id: ID
    deadline: String!
    fulfilled: String!
    createdAt: String!
  }

  type Image {
    id: ID!
    name: ID!
    url: ID!
    submission_id: ID!
    createdAt: String!
  }

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type Mutation {
    createHospital(name: String!, contact_email: String!): Hospital
    createAdmin(
      fname: String!
      lname: String!
      email: String!
      password: String!
      hospital_id: ID!
    ): Admin
    createDoctor(
      fname: String!
      lname: String!
      email: String!
      password: String!
      admin_id: ID!
    ): Doctor
    createPatient(
      fname: String!
      lname: String!
      email: String!
      password: String!
    ): Patient
    createSubmission(
      patient_id: ID!
      doctor_id: ID!
      deadline: String
    ): Submission

    # TODO Image Mutations
    singleUpload(file: Upload!): File!
    singleUploadStream(file: Upload!): File!

    # TODO jwt stuff
    register(
      fname: String!
      lname: String!
      email: String!
      password: String!
      account_type: String!
    ): Boolean
    login(
      email: String!
      password: String!
      account_type: String!
    ): LoginResponse
  }

  type Query {
    getHospitals: [Hospital!]
    getAdmins: [Admin!]
    getDoctors: [Doctor!]
    getPatients: [Patient!]
    getSubmissions: [Submission!]
    getImages: [Image!]
    isLoggedIn: String!
  }
`;

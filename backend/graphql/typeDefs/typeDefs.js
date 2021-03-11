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

  # TODO move tokens to a 'me' function
  # The attribute 'token' will be used to determine whether the user is logged
  # in or not, it represents a JWT token

  type Admin {
    id: ID!
    fname: String!
    lname: String!
    email: String!
    password: String!
    hospital_id: ID!
    createdAt: String!
  }

  type Doctor {
    id: ID!
    fname: String!
    lname: String!
    email: String!
    password: String!
    hospital_id: ID!
    createdAt: String!
  }

  type Patient {
    id: ID!
    fname: String!
    lname: String!
    email: String!
    password: String!
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

  type S3Object {
    ETag: String
    Location: String!
    Key: String!
    Bucket: String!
  }

  type File {
    id: ID!
    path: String!
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
    createSubmission(
      patient_id: ID!
      doctor_id: ID!
      deadline: String
    ): Submission

    # TODO Image Mutations
    # singleUpload(file: Upload!): File!
    singleUploadStream(file: Upload!): S3Object

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
  }

  type Query {
    getPatientsByDoctor: [Patient!]
    getHospitals: [Hospital!]
    getAdmins: [Admin!]
    getDoctors: [Doctor!]
    getPatients: [Patient!]
    getDoctorsByHospital: [Doctor!]
    getSubmissions(patient_id: Int): [Submission!]
    getImages: [Image!]
    isLoggedIn: String!
    checkInvitation(invitationToken: String!): String!
  }
`;

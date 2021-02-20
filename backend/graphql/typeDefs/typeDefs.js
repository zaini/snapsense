const { gql } = require("apollo-server");

module.exports = gql`
  type Hospital {
    id: ID!
    name: String!
    contact_email: String!
    createdAt: String!
  }

  # Each 'user' type will have to have an AccountRole associated with it
  # this is because on the frontend there must be a way to identify the
  # type of the user.
  enum AccountRole {
    ADMIN
    DOCTOR
    PATIENT
  }

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
    token: String!
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
    token: String!
    createdAt: String!
  }

  type Patient {
    id: ID!
    fname: String!
    lname: String!
    email: String!
    password: String!
    role: AccountRole!
    token: String!
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
    singleUpload(file: Upload!): File!
    singleUploadStream(file: Upload!): File!
  }

  type Query {
    getHospitals: [Hospital!]
    getAdmins: [Admin!]
    getDoctors: [Doctor!]
    getSubmissions: [Submission!]
  }
`;

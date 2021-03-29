import {
  GET_REQUESTS_AS_DOCTOR,
  GET_REQUESTS_AS_PATIENT,
} from "../../pages/My/RequestsPage";

const responseData = [
  {
    id: "1",
    type: 3,
    deadline: "1609804800000",
    Submission: {
      id: "1",
      Images: null,
      Answers: null,
      flag: 1,
      createdAt: "1609718400000",
    },
    Patient: {
      fname: "Patient",
      lname: "One",
      email: "patient1@gmail.com",
    },
    Doctor: {
      fname: "Doctor",
      lname: "One",
      email: "doctor1@nhs.net",
    },
  },
  {
    id: "3",
    type: 3,
    deadline: "1617216160000",
    Submission: {
      id: "11",
      Images: null,
      Answers: null,
      flag: 2,
      createdAt: "1616528700000",
    },
    Patient: {
      fname: "Patient",
      lname: "One",
      email: "patient1@gmail.com",
    },
    Doctor: {
      fname: "Doctor",
      lname: "One",
      email: "doctor1@nhs.net",
    },
  },
  {
    id: "17",
    type: 3,
    deadline: "1616999214000",
    Submission: null,
    Patient: {
      fname: "Patient",
      lname: "One",
      email: "patient1@gmail.com",
    },
    Doctor: {
      fname: "Doctor",
      lname: "One",
      email: "doctor1@nhs.net",
    },
  },
];

export const mocksWithData = [
  {
    request: {
      query: GET_REQUESTS_AS_DOCTOR,
      variables: {},
    },
    result: {
      data: {
        getRequestsAsDoctor: responseData,
      },
    },
  },
  {
    request: {
      query: GET_REQUESTS_AS_PATIENT,
      variables: {},
    },
    result: {
      data: {
        getRequestsAsPatient: responseData,
      },
    },
  },
];

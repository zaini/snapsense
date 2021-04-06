import {
  GET_DOCTORS_AS_PATIENT,
  GET_DOCTORS_AS_ADMIN,
} from "../../pages/My/DoctorsPage";

const mocks = [
  [
    {
      request: {
        query: GET_DOCTORS_AS_PATIENT,
        variables: {},
      },
      result: {
        data: {
          getDoctorsAsPatient: [
            {
              id: "1",
              fname: "Doctor",
              lname: "One",
              email: "doctorOne@gmail.com",
            },
            {
              id: "2",
              fname: "Doctor",
              lname: "Two",
              email: "doctorTwo@gmail.com",
            },
          ],
        },
      },
    },
  ],
  [
    {
      request: {
        query: GET_DOCTORS_AS_ADMIN,
        variables: {},
      },
      result: {
        data: {
          getDoctorsAsAdmin: [
            {
              id: "1",
              fname: "Doctor",
              lname: "One",
              email: "doctorOne@gmail.com",
            },
            {
              id: "2",
              fname: "Doctor",
              lname: "Two",
              email: "doctorTwo@gmail.com",
            },
          ],
        },
      },
    },
  ],
];

export default mocks;

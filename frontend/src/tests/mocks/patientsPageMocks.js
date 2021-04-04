import { GET_PATIENTS_AS_DOCTOR } from "../../pages/My/PatientsPage";

const mocks = [
  {
    request: {
      query: GET_PATIENTS_AS_DOCTOR,
      variables: {},
    },
    result: {
      data: {
        getPatientsAsDoctor: [
          {
            id: "1",
            flag: "1",
            fname: "Patient",
            lname: "One",
            email: "PatientOne@email.com",
          },
          {
            id: "2",
            flag: "2",
            fname: "Patient",
            lname: "Two",
            email: "PatientTwo@email.com",
          },
        ],
      },
    },
  },
];

export default mocks;

import { GET_HOSPITAL } from "../../pages/My/HospitalPage";

const mocks = [
  {
    request: {
      query: GET_HOSPITAL,
      variables: {
        hospital_id: "1",
      },
    },
    result: {
      data: {
        getSpecificHospital: {
          id: "1",
          name: "Hospital One",
          contact_email: "hospital.one@gmail.com",
        },
      },
    },
  },
  {
    request: {
      query: GET_HOSPITAL,
      variables: {
        hospital_id: "2",
      },
    },
    error: {
      graphQLErrors: [
        {
          message: "Hospital does not exist",
        },
      ],
    },
  },
];

export default mocks;

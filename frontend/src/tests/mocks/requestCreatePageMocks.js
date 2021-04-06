import { CREATE_REQUEST } from "../../components/Request/NewRequestForm";
import { GET_PATIENT_AS_DOCTOR } from "../../pages/My/NewRequestPage";

const giveMocks = (p) => {
  const initialDate = p;
  const mocks = [
    {
      request: {
        query: GET_PATIENT_AS_DOCTOR,
        variables: {
          patient_id: "1",
        },
      },
      result: {
        data: {
          getPatientAsDoctor: {
            id: 1,
            fname: "Patient",
            lname: "One",
          },
        },
      },
    },
    {
      request: {
        query: GET_PATIENT_AS_DOCTOR,
        variables: {
          patient_id: "2",
        },
      },
      error: {
        graphQLErrors: [
          {
            message: "This is an invalid patient",
          },
        ],
      },
    },
    {
      request: {
        query: CREATE_REQUEST,
        variables: {
          patient_id: 1,
          request_type: 3,
          interval: 0,
          frequency: 0,
          deadline: initialDate.getTime().toString(),
        },
      },
      result: { data: { createRequest: true } },
    },
  ];
  return mocks;
};

export default giveMocks;

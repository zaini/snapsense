import { GET_REQUESTS_PATIENT_PAGE } from "../../components/HomePage/PatientHomePanel";

const patientMocks = [
  {
    request: {
      query: GET_REQUESTS_PATIENT_PAGE,
    },
    result: {
      data: {
        getRequestsAsPatient: [
          {
            id: "1",
            fulfilled: null,
          },
          {
            id: "2",
            fulfilled: null,
          },
        ],
      },
    },
  },
];

export default patientMocks;

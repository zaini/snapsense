import { GET_REQUESTS } from "../../components/HomePage/PatientHomePanel";

export const patientMock = [
    {
      request: {
        query: GET_REQUESTS,
      },
      result: {
        data: {
          getRequestsAsPatient: [
            {
              id: "1",
            },
            {
              id: "2",
            },
          ],
        },
      },
    },
  ];
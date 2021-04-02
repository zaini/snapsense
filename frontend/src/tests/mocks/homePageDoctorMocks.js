import {
  GET_REQUESTS,
  GET_SUBMISSIONS,
} from "../../components/HomePage/DoctorHomePanel";

const doctorMocks = [
  {
    request: {
      query: GET_REQUESTS,
      variables: {},
    },
    result: {
      data: {
        getRequestsForReview: [
          {
            id: "3",
          },
        ],
      },
    },
  },
  {
    request: {
      query: GET_SUBMISSIONS,
      variables: {},
    },
    result: {
      data: {
        getSubmissionsForReview: [
          {
            id: "5",
          },
          {
            id: "6",
          },
          {
            id: "7",
          },
          {
            id: "8",
          },
          {
            id: "9",
          },
          {
            id: "10",
          },
          {
            id: "11",
          },
        ],
      },
    },
  },
];

export default doctorMocks;

import { GET_SPECIFIC_FEEDBACK } from "../../components/Feedback/ViewFeedback";
import { CREATE_FEEDBACK } from "../../components/Feedback/Feedback";

const mocks = [
  {
    request: {
      query: CREATE_FEEDBACK,
      variables: {
        stars: 1,
        extra: "This is a random feedback.",
      },
    },
    result: { data: { createFeedback: true } },
  },
  {
    request: {
      query: GET_SPECIFIC_FEEDBACK,
      variables: {},
    },
    result: {
      data: {
        getSpecificFeedback: {
          id: "1",
          stars: 1,
          extra: "This is a random feedback.",
        },
      },
    },
  },
];

export default mocks;

const { GET_SPECIFIC_FEEDBACK } = require("../../pages/My/ViewFeedbackPage");

const mocks = [
  {
    request: {
      query: GET_SPECIFIC_FEEDBACK,
      variables: {
        feedback_id: "1",
      },
    },
    result: {
      data: {
        getSpecificFeedback: {
          id: "1",
          stars: 5,
          extra: "Great website!",
        },
      },
    },
  },
  {
    request: {
      query: GET_SPECIFIC_FEEDBACK,
      variables: {
        feedback_id: "2",
      },
    },
    error: {
      graphQLErrors: [
        {
          message: "Feedback does not exist",
        },
      ],
    },
  },
];

export default mocks;

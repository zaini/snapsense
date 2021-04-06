import { GET_FEEDBACK } from "../../pages/My/FeedbackPage";

const mocks = [
  {
    request: {
      query: GET_FEEDBACK,
      variables: {},
    },
    result: {
      data: {
        getFeedback: [
          {
            id: "1",
            stars: 5,
            extra: "Long live bluej blues",
          },
          {
            id: "2",
            stars: 4,
            extra: "Nice website",
          },
          {
            id: "3",
            stars: 0,
            extra: null,
          },
        ],
      },
    },
  },
];

export default mocks;

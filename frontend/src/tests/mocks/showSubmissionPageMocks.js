import { GET_SUBMISSION } from "../../pages/My/ShowSubmissionPage";

const mockData = [
  {
    request: {
      query: GET_SUBMISSION,
      variables: { submission_id: "11" },
    },
    result: {
      data: {
        getSubmission: {
          id: "11",
          flag: 2,
          createdAt: "1616528700000",
          Images: [
            {
              id: "1",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/b3315c4f-8e76-4bcf-995a-324ca334f649.jpg",
            },
          ],
          Answers: [
            {
              id: "1",
              Question: {
                id: "1",
                text:
                  "Please add any other notes for your clinician (optional):",
              },
              value: true,
              extra: "fsdfsd",
            },
          ],
          Patient: {
            id: 1,
            fname: "first",
            lname: "last",
            email: "patient1@gmail.com",
            flag: 1,
          },
        },
      },
    },
  },
];

export default mockData;

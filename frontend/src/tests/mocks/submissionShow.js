import { GET_SUBMISSION } from "../../pages/My/ShowSubmissionPage";

export const mocksWithData = [
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
              id: "6",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/b3315c4f-8e76-4bcf-995a-324ca334f649.jpg",
            },
            {
              id: "7",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/3d3fe34d-83ba-4be8-aab2-e3c5201b34fc.jpg",
            },
            {
              id: "8",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/95e28fcf-9de3-4b3d-8aca-18b3aa3fcd11.jpg",
            },
          ],
          Answers: [
            {
              id: "56",
              Question: {
                id: "8",
                text:
                  "Please add any other notes for your clinician (optional):",
              },
              value: true,
              extra: "fsdfsd",
            },
            {
              id: "55",
              Question: {
                id: "7",
                text:
                  "In the past 7 days, have you noticed any unusual smells from the wound?",
              },
              value: false,
              extra: null,
            },
            {
              id: "54",
              Question: {
                id: "6",
                text:
                  "In the past 7 days, has one foot been hotter to touch than the other?",
              },
              value: true,
              extra: null,
            },
            {
              id: "53",
              Question: {
                id: "5",
                text:
                  "In the past 7 days, has your ulcer been hotter to touch than usual?",
              },
              value: false,
              extra: null,
            },
            {
              id: "52",
              Question: {
                id: "4",
                text:
                  "In the past 7 days, have you seen any puss around your ulcer?",
              },
              value: true,
              extra: "fds",
            },
            {
              id: "51",
              Question: {
                id: "3",
                text:
                  "In the past 7 days, have you seen redness around your ulcer?",
              },
              value: true,
              extra: null,
            },
            {
              id: "50",
              Question: {
                id: "2",
                text:
                  "In the past 7 days, have you had a fever (temperature higher than 36C)?",
              },
              value: false,
              extra: "dsfsdfds",
            },
            {
              id: "49",
              Question: {
                id: "1",
                text: "In the past 7 days, have you felt unwell?",
              },
              value: true,
              extra: null,
            },
          ],
          Patient: {
            id: "1",
            fname: "Patient",
            lname: "One",
            email: "patient1@gmail.com",
            flag: 2,
          },
        },
      },
    },
  },
];

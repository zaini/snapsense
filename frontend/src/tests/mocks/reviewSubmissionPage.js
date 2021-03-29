import { GET_REQUESTS } from "../../components/SubmissionsView/RequestCards/RequestCardsTable";

import { GET_SUBMISSIONS } from "../../components/SubmissionsView/SubmissionCards/SubmissionCardsTable";

import { FLAG_SUBMISSION } from "../../components/SubmissionsView/RequestCards/RequestCard";

export const fulfilledRequestData = {
  data: {
    getRequestsForReview: [
      {
        id: "4",
        type: 1,
        deadline: "1617216160000",
        fulfilled: "1616528701000",
        Submission: {
          id: "12",
          Images: [
            {
              id: "6",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/b3315c4f-8e76-4bcf-995a-324ca334f649.jpg",
              __typename: "Image",
            },
            {
              id: "7",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/3d3fe34d-83ba-4be8-aab2-e3c5201b34fc.jpg",
              __typename: "Image",
            },
            {
              id: "8",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/95e28fcf-9de3-4b3d-8aca-18b3aa3fcd11.jpg",
              __typename: "Image",
            },
          ],
          Answers: [],
          flag: null,
          createdAt: "1616528700000",
          __typename: "Submission",
        },
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Doctor: {
          id: "1",
          fname: "Doctor",
          lname: "One",
          email: "doctor1@nhs.net",
          __typename: "Doctor",
        },
        __typename: "Request",
      },
      {
        id: "5",
        type: 2,
        deadline: "1617216160000",
        fulfilled: "1616528701000",
        Submission: {
          id: "13",
          Images: [],
          Answers: [
            {
              id: "56",
              Question: {
                id: "8",
                text:
                  "Please add any other notes for your clinician (optional):",
                __typename: "Question",
              },
              value: true,
              extra: "fsdfsd",
              __typename: "Answer",
            },
            {
              id: "55",
              Question: {
                id: "7",
                text:
                  "In the past 7 days, have you noticed any unusual smells from the wound?",
                __typename: "Question",
              },
              value: false,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "54",
              Question: {
                id: "6",
                text:
                  "In the past 7 days, has one foot been hotter to touch than the other?",
                __typename: "Question",
              },
              value: true,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "53",
              Question: {
                id: "5",
                text:
                  "In the past 7 days, has your ulcer been hotter to touch than usual?",
                __typename: "Question",
              },
              value: false,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "52",
              Question: {
                id: "4",
                text:
                  "In the past 7 days, have you seen any puss around your ulcer?",
                __typename: "Question",
              },
              value: true,
              extra: "fds",
              __typename: "Answer",
            },
            {
              id: "51",
              Question: {
                id: "3",
                text:
                  "In the past 7 days, have you seen redness around your ulcer?",
                __typename: "Question",
              },
              value: true,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "50",
              Question: {
                id: "2",
                text:
                  "In the past 7 days, have you had a fever (temperature higher than 36C)?",
                __typename: "Question",
              },
              value: false,
              extra: "dsfsdfds",
              __typename: "Answer",
            },
            {
              id: "49",
              Question: {
                id: "1",
                text: "In the past 7 days, have you felt unwell?",
                __typename: "Question",
              },
              value: true,
              extra: null,
              __typename: "Answer",
            },
          ],
          flag: null,
          createdAt: "1616528700000",
          __typename: "Submission",
        },
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Doctor: {
          id: "1",
          fname: "Doctor",
          lname: "One",
          email: "doctor1@nhs.net",
          __typename: "Doctor",
        },
        __typename: "Request",
      },
      {
        id: "3",
        type: 3,
        deadline: "1617216160000",
        fulfilled: "1616528701000",
        Submission: {
          id: "11",
          Images: [
            {
              id: "6",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/b3315c4f-8e76-4bcf-995a-324ca334f649.jpg",
              __typename: "Image",
            },
            {
              id: "7",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/3d3fe34d-83ba-4be8-aab2-e3c5201b34fc.jpg",
              __typename: "Image",
            },
            {
              id: "8",
              url:
                "https://snapsensebucket.s3.ap-south-1.amazonaws.com/95e28fcf-9de3-4b3d-8aca-18b3aa3fcd11.jpg",
              __typename: "Image",
            },
          ],
          Answers: [
            {
              id: "56",
              Question: {
                id: "8",
                text:
                  "Please add any other notes for your clinician (optional):",
                __typename: "Question",
              },
              value: true,
              extra: "fsdfsd",
              __typename: "Answer",
            },
            {
              id: "55",
              Question: {
                id: "7",
                text:
                  "In the past 7 days, have you noticed any unusual smells from the wound?",
                __typename: "Question",
              },
              value: false,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "54",
              Question: {
                id: "6",
                text:
                  "In the past 7 days, has one foot been hotter to touch than the other?",
                __typename: "Question",
              },
              value: true,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "53",
              Question: {
                id: "5",
                text:
                  "In the past 7 days, has your ulcer been hotter to touch than usual?",
                __typename: "Question",
              },
              value: false,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "52",
              Question: {
                id: "4",
                text:
                  "In the past 7 days, have you seen any puss around your ulcer?",
                __typename: "Question",
              },
              value: true,
              extra: "fds",
              __typename: "Answer",
            },
            {
              id: "51",
              Question: {
                id: "3",
                text:
                  "In the past 7 days, have you seen redness around your ulcer?",
                __typename: "Question",
              },
              value: true,
              extra: null,
              __typename: "Answer",
            },
            {
              id: "50",
              Question: {
                id: "2",
                text:
                  "In the past 7 days, have you had a fever (temperature higher than 36C)?",
                __typename: "Question",
              },
              value: false,
              extra: "dsfsdfds",
              __typename: "Answer",
            },
            {
              id: "49",
              Question: {
                id: "1",
                text: "In the past 7 days, have you felt unwell?",
                __typename: "Question",
              },
              value: true,
              extra: null,
              __typename: "Answer",
            },
          ],
          flag: null,
          createdAt: "1616528700000",
          __typename: "Submission",
        },
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Doctor: {
          id: "1",
          fname: "Doctor",
          lname: "One",
          email: "doctor1@nhs.net",
          __typename: "Doctor",
        },
        __typename: "Request",
      },
    ],
  },
  loading: false,
  networkStatus: 7,
  stale: false,
};

const submissionData = {
  data: {
    getSubmissionsForReview: [
      {
        id: "6",
        flag: null,
        createdAt: "1616520992000",
        Images: [
          {
            id: "4",
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/43b49e0c-ec5e-48c2-bef1-30b72cef1676.jpg",
            __typename: "Image",
          },
        ],
        Answers: [],
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 1,
          __typename: "Patient",
        },
        __typename: "Submission",
      },
      {
        id: "7",
        flag: null,
        createdAt: "1616521006000",
        Images: [],
        Answers: [
          {
            id: "32",
            Question: {
              id: "8",
              text: "Please add any other notes for your clinician (optional):",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "31",
            Question: {
              id: "7",
              text:
                "In the past 7 days, have you noticed any unusual smells from the wound?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "30",
            Question: {
              id: "6",
              text:
                "In the past 7 days, has one foot been hotter to touch than the other?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "29",
            Question: {
              id: "5",
              text:
                "In the past 7 days, has your ulcer been hotter to touch than usual?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "28",
            Question: {
              id: "4",
              text:
                "In the past 7 days, have you seen any puss around your ulcer?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "27",
            Question: {
              id: "3",
              text:
                "In the past 7 days, have you seen redness around your ulcer?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "26",
            Question: {
              id: "2",
              text:
                "In the past 7 days, have you had a fever (temperature higher than 36C)?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "25",
            Question: {
              id: "1",
              text: "In the past 7 days, have you felt unwell?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
        ],
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 1,
          __typename: "Patient",
        },
        __typename: "Submission",
      },
      {
        id: "11",
        flag: null,
        createdAt: "1616528700000",
        Images: [
          {
            id: "6",
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/b3315c4f-8e76-4bcf-995a-324ca334f649.jpg",
            __typename: "Image",
          },
          {
            id: "7",
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/3d3fe34d-83ba-4be8-aab2-e3c5201b34fc.jpg",
            __typename: "Image",
          },
          {
            id: "8",
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/95e28fcf-9de3-4b3d-8aca-18b3aa3fcd11.jpg",
            __typename: "Image",
          },
        ],
        Answers: [
          {
            id: "56",
            Question: {
              id: "8",
              text: "Please add any other notes for your clinician (optional):",
              __typename: "Question",
            },
            value: true,
            extra: "fsdfsd",
            __typename: "Answer",
          },
          {
            id: "55",
            Question: {
              id: "7",
              text:
                "In the past 7 days, have you noticed any unusual smells from the wound?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "54",
            Question: {
              id: "6",
              text:
                "In the past 7 days, has one foot been hotter to touch than the other?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "53",
            Question: {
              id: "5",
              text:
                "In the past 7 days, has your ulcer been hotter to touch than usual?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "52",
            Question: {
              id: "4",
              text:
                "In the past 7 days, have you seen any puss around your ulcer?",
              __typename: "Question",
            },
            value: true,
            extra: "fds",
            __typename: "Answer",
          },
          {
            id: "51",
            Question: {
              id: "3",
              text:
                "In the past 7 days, have you seen redness around your ulcer?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "50",
            Question: {
              id: "2",
              text:
                "In the past 7 days, have you had a fever (temperature higher than 36C)?",
              __typename: "Question",
            },
            value: false,
            extra: "dsfsdfds",
            __typename: "Answer",
          },
          {
            id: "49",
            Question: {
              id: "1",
              text: "In the past 7 days, have you felt unwell?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
        ],
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 1,
          __typename: "Patient",
        },
        __typename: "Submission",
      },
    ],
  },
  loading: false,
  networkStatus: 7,
  stale: false,
};

export const mocksWithData = [
  {
    request: {
      query: GET_REQUESTS,
      variables: {},
    },
    result: fulfilledRequestData,
  },
  {
    request: {
      query: GET_SUBMISSIONS,
      variables: {},
    },
    result: submissionData,
  },
  {
    request: {
      query: FLAG_SUBMISSION,
      variables: {
        submission_id: "11",
        flag: 2,
      },
    },
    result: {
      data: {
        flagSubmission: {
          id: "5",
          flag: 2,
          __typename: "Submission",
        },
      },
    },
  },
];

export const mocksWithoutData = [
  {
    request: {
      query: GET_REQUESTS,
      variables: {},
    },
    result: {
      data: {
        getRequestsForReview: [],
      },
    },
  },
  {
    request: {
      query: GET_SUBMISSIONS,
      variables: {},
    },
    result: fulfilledRequestData,
  },
];

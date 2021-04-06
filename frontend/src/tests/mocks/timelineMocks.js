import { GET_SUBMISSIONS } from "../../components/SubmissionsView/SubmissionsComponent";

export const submissionData = {
  data: {
    getSubmissions: [
      {
        id: "11",
        flag: 2,
        createdAt: "1616528700000",
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Images: [
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
          {
            id: "6",
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/b3315c4f-8e76-4bcf-995a-324ca334f649.jpg",
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
        ],
        __typename: "Submission",
      },
      {
        id: "5",
        flag: 1,
        createdAt: "1616520972000",
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Images: [],
        Answers: [
          {
            id: "22",
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
            id: "21",
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
            id: "20",
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
            id: "19",
            Question: {
              id: "3",
              text:
                "In the past 7 days, have you seen redness around your ulcer?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "18",
            Question: {
              id: "2",
              text:
                "In the past 7 days, have you had a fever (temperature higher than 36C)?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "17",
            Question: {
              id: "1",
              text: "In the past 7 days, have you felt unwell?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "24",
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
            id: "23",
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
        ],
        __typename: "Submission",
      },
      {
        id: "8",
        flag: 1,
        createdAt: "1616521092000",
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Images: [
          {
            id: "5",
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/6141d396-98ed-4f0a-bb58-217e3188d217.jpg",
            __typename: "Image",
          },
        ],
        Answers: [],
        __typename: "Submission",
      },
      {
        id: "4",
        flag: 2,
        createdAt: "1616520906000",
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Images: [],
        Answers: [
          {
            id: "15",
            Question: {
              id: "7",
              text:
                "In the past 7 days, have you noticed any unusual smells from the wound?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "14",
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
            id: "13",
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
            id: "12",
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
            id: "11",
            Question: {
              id: "3",
              text:
                "In the past 7 days, have you seen redness around your ulcer?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "10",
            Question: {
              id: "2",
              text:
                "In the past 7 days, have you had a fever (temperature higher than 36C)?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "9",
            Question: {
              id: "1",
              text: "In the past 7 days, have you felt unwell?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "16",
            Question: {
              id: "8",
              text: "Please add any other notes for your clinician (optional):",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
        ],
        __typename: "Submission",
      },
      {
        id: "3",
        flag: 2,
        createdAt: "1616520873000",
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Images: [
          {
            id: "3",
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/16a1dd02-c045-4d04-9149-fe530f4e63c8.jpg",
            __typename: "Image",
          },
        ],
        Answers: [],
        __typename: "Submission",
      },
      {
        id: "10",
        flag: null,
        createdAt: "1616521168000",
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Images: [],
        Answers: [
          {
            id: "41",
            Question: {
              id: "1",
              text: "In the past 7 days, have you felt unwell?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "42",
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
            id: "43",
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
            id: "44",
            Question: {
              id: "4",
              text:
                "In the past 7 days, have you seen any puss around your ulcer?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "45",
            Question: {
              id: "5",
              text:
                "In the past 7 days, has your ulcer been hotter to touch than usual?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "46",
            Question: {
              id: "6",
              text:
                "In the past 7 days, has one foot been hotter to touch than the other?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "47",
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
            id: "48",
            Question: {
              id: "8",
              text: "Please add any other notes for your clinician (optional):",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
        ],
        __typename: "Submission",
      },
      {
        id: "9",
        flag: null,
        createdAt: "1616521146000",
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Images: [],
        Answers: [
          {
            id: "38",
            Question: {
              id: "6",
              text:
                "In the past 7 days, has one foot been hotter to touch than the other?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "34",
            Question: {
              id: "2",
              text:
                "In the past 7 days, have you had a fever (temperature higher than 36C)?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "35",
            Question: {
              id: "3",
              text:
                "In the past 7 days, have you seen redness around your ulcer?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "36",
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
            id: "37",
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
            id: "39",
            Question: {
              id: "7",
              text:
                "In the past 7 days, have you noticed any unusual smells from the wound?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "40",
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
            id: "33",
            Question: {
              id: "1",
              text: "In the past 7 days, have you felt unwell?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
        ],
        __typename: "Submission",
      },
      {
        id: "7",
        flag: null,
        createdAt: "1616521006000",
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Images: [],
        Answers: [
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
        __typename: "Submission",
      },
      {
        id: "6",
        flag: null,
        createdAt: "1616520992000",
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Images: [
          {
            id: "4",
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/43b49e0c-ec5e-48c2-bef1-30b72cef1676.jpg",
            __typename: "Image",
          },
        ],
        Answers: [],
        __typename: "Submission",
      },
      {
        id: "1",
        flag: 1,
        createdAt: "1609718400000",
        Patient: {
          id: "1",
          fname: "Patient",
          lname: "One",
          email: "patient1@gmail.com",
          flag: 2,
          __typename: "Patient",
        },
        Images: [
          {
            id: "1",
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/f150d94e-25cb-4973-bf26-d987b5bde188.jpg",
            __typename: "Image",
          },
        ],
        Answers: [
          {
            id: "8",
            Question: {
              id: "8",
              text: "Please add any other notes for your clinician (optional):",
              __typename: "Question",
            },
            value: true,
            extra: "I might die, just saying",
            __typename: "Answer",
          },
          {
            id: "1",
            Question: {
              id: "1",
              text: "In the past 7 days, have you felt unwell?",
              __typename: "Question",
            },
            value: true,
            extra: "My foot hurts",
            __typename: "Answer",
          },
          {
            id: "2",
            Question: {
              id: "2",
              text:
                "In the past 7 days, have you had a fever (temperature higher than 36C)?",
              __typename: "Question",
            },
            value: true,
            extra: "My foot still hurts",
            __typename: "Answer",
          },
          {
            id: "3",
            Question: {
              id: "3",
              text:
                "In the past 7 days, have you seen redness around your ulcer?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "4",
            Question: {
              id: "4",
              text:
                "In the past 7 days, have you seen any puss around your ulcer?",
              __typename: "Question",
            },
            value: false,
            extra: null,
            __typename: "Answer",
          },
          {
            id: "5",
            Question: {
              id: "5",
              text:
                "In the past 7 days, has your ulcer been hotter to touch than usual?",
              __typename: "Question",
            },
            value: true,
            extra: "My foot still hurts",
            __typename: "Answer",
          },
          {
            id: "6",
            Question: {
              id: "6",
              text:
                "In the past 7 days, has one foot been hotter to touch than the other?",
              __typename: "Question",
            },
            value: true,
            extra: "HELP!!!",
            __typename: "Answer",
          },
          {
            id: "7",
            Question: {
              id: "7",
              text:
                "In the past 7 days, have you noticed any unusual smells from the wound?",
              __typename: "Question",
            },
            value: true,
            extra: null,
            __typename: "Answer",
          },
        ],
        __typename: "Submission",
      },
    ],
  },
};

export const mocksWithData = [
  {
    request: {
      query: GET_SUBMISSIONS,
      variables: {},
    },
    result: submissionData,
  },
];

import { UPLOAD_SUBMISSION } from "../../pages/My/NewSubmissionPage";
import { GET_SUBMISSIONS } from "../../components/SubmissionsView/SubmissionsComponent.js";

const response = {
  questionnaire: {},
};
for (let i = 1; i < 9; i++) {
  response.questionnaire[i] = {};
  response.questionnaire[i].val = '1';
}

const toSend = JSON.stringify(response);
console.log(toSend);
//Creating mock data
const mockSuccess = [
  {
    request: {
      query: UPLOAD_SUBMISSION,
      variables: {
        images: [],
        answers: toSend,
      },
    },
    result: { data: { createSubmission: true } },
  },
  {
    request: {
      query: GET_SUBMISSIONS,
      variables: {},
    },
    result: {
      data: {
        getSubmissions: {
          images: [new Blob(["abc"], { type: "text/plain" })],
          answers: JSON.stringify([
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
          ]),
        },
      },
    },
  },
];

export default mockSuccess;

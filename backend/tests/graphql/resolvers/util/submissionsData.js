const patientOneSubmissions = {
  data: {
    getSubmissions: [
      {
        flag: 1,
        Patient: { email: "patient1@gmail.com" },
        Answers: [
          {
            Question: { text: "In the past 7 days, have you felt unwell?" },
            value: true,
          },
          {
            Question: {
              text:
                "In the past 7 days, have you had a fever (temperature higher than 36C)?",
            },
            value: true,
          },
          {
            Question: {
              text:
                "In the past 7 days, have you seen redness around your ulcer?",
            },
            value: false,
          },
          {
            Question: {
              text:
                "In the past 7 days, have you seen any puss around your ulcer?",
            },
            value: false,
          },
          {
            Question: {
              text:
                "In the past 7 days, has your ulcer been hotter to touch than usual?",
            },
            value: true,
          },
          {
            Question: {
              text:
                "In the past 7 days, has one foot been hotter to touch than the other?",
            },
            value: true,
          },
          {
            Question: {
              text:
                "In the past 7 days, have you noticed any unusual smells from the wound?",
            },
            value: true,
          },

          {
            Question: {
              text: "Please add any other notes for your clinician (optional):",
            },
            value: true,
          },
        ],
        Images: [
          {
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/f150d94e-25cb-4973-bf26-d987b5bde188.jpg",
          },
        ],
      },
    ],
  },
};

const patientTwoSubmissions = {
  data: {
    getSubmissions: [
      {
        flag: null,
        Patient: { email: "patient2@gmail.com" },
        Answers: [],
        Images: [
          {
            url:
              "https://snapsensebucket.s3.ap-south-1.amazonaws.com/f150d94e-25cb-4973-bf26-d987b5bde188.jpg",
          },
        ],
      },
    ],
  },
};

module.exports = {
  patientOneSubmissions,
  patientTwoSubmissions,
};

import React from "react";

// {
//   id: 1,
//   type: 2,
//   deadline: new Date(),
//   fulfillment_date: new Date(),
//   Submission: {
//     id: 2,
//     questionnaire: { 1: "Yes", 2: "No" },
//     images: [
//       "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
//       "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
//     ],
//   },
//   Patient: {
//     id: 1,
//     fname: "Bob",
//     lname: "McBob",
//   },
// },

// This takes a submission. We need something else for requests.
const SubmissionCard = ({ data }) => {
  const { Submission } = data;
  const { id, questionnaire, images } = Submission;
  return <div>{id}</div>;
};

export default SubmissionCard;

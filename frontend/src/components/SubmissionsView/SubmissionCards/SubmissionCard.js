import React from "react";

// id: "1"
// Doctor:
  // email: "doctor1@nhs.net"
  // fname: "Doctor"
  // lname: "One"
// Patient:
  // email: "patient1@gmail.com"
  // fname: "Patient"
  // lname: "One"
// Submission:
  // Answers: null
  // Images: null
  // createdAt: "1609718400000"
  // flag: 1
  // id: "1"
// deadline: "1609804800000"
// type: 3

// This takes a submission.
const SubmissionCard = ({ data }) => {
  const { Submission } = data;
  const { id } = Submission;
  return <div>{id}</div>;
};

export default SubmissionCard;

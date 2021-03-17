import { Box, HStack, VStack, Button, Select } from "@chakra-ui/react";
import { Link } from "react-router-dom";
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

// This takes a request as above.
const RequestCard = ({ data }) => {
  const { Patient, Submission, deadline, type } = data;
  const dateline_date = new Date(parseInt(deadline)).toDateString();
  const submission_date = new Date(
    parseInt(Submission.createdAt)
  ).toDateString();

  console.log(Patient, Submission, deadline, type);

  return (
    <Box borderWidth="1px" borderRadius="lg" p="5px">
      <HStack align="spread">
        <Box>images</Box>
        <Box>questionnaire</Box>
        <Box>
          <VStack>
            <Box>
              patient info Submitted: {submission_date} Deadline:{" "}
              {dateline_date}
            </Box>
            <Box>
              <Select placeholder="Review Submission">
                <option value="1">Low Risk</option>
                <option value="2">Medium Risk</option>
                <option value="3">High Risk</option>
              </Select>
            </Box>
            <HStack>
              <Link
                to={`/my/submissions/patients/${Patient.id}/submissions/show/${Submission.id}`}
              >
                <Button>View Submission</Button>
              </Link>
              <Link to={`/my/patients/${Patient.id}/requests/new`}>
                <Button>Make a new request</Button>
              </Link>
            </HStack>
          </VStack>
        </Box>
      </HStack>
    </Box>
  );
};

export default RequestCard;

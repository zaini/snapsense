import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Box, Stack, Text, Center } from "@chakra-ui/react";
import ImageSlideshow from "../../utils/ImageSlideshow";
import ViewQuestionnaireResponse from "../../utils/ViewQuestionnaireResponse";
import RequestCardOptions from "./RequestCardOptions";

const RequestCard = ({ data, vertical }) => {
  const { Patient, Submission, deadline } = data;

  const deadline_date = new Date(deadline);
  const submission_date = new Date(Submission.createdAt);

  const [flagSubmission] = useMutation(FLAG_SUBMISSION, {
    onCompleted() {
      // window.location.reload();
    },
    onError(err) {
      console.log(err);
    },
    update(proxy) {
      const data = proxy.readQuery({
        query: GET_REQUESTS,
      });
      proxy.writeQuery({
        query: GET_REQUESTS,
        data: {
          getRequestsForReview: data.getRequestsForReview.filter((p) => {
            return p.Submission.id !== Submission.id;
          }),
        },
      });
      const dataSubmission = proxy.readQuery({
        query: GET_SUBMISSIONS,
      });
      proxy.writeQuery({
        query: GET_SUBMISSIONS,
        data: {
          getSubmissionsForReview: dataSubmission.getSubmissionsForReview.filter(
            (p) => {
              return p.id !== Submission.id;
            }
          ),
        },
      });
    },
  });

  return (
    <Box borderWidth="1px" borderRadius="lg" p="10px" m="5px">
      {Submission.id}
      <Center p="10px">
        <Stack direction={vertical ? "column" : "row"}>
          <Box>
            {Submission.Images && Submission.Images.length === 0 ? (
              <Text fontWeight="bold" fontSize="110%" pb="50%">
                <Box
                  w="220px"
                  h="100%"
                  overflow="hidden"
                  objectFit="scale-down"
                >
                  <Center>No Images</Center>
                </Box>
              </Text>
            ) : (
              <ImageSlideshow images={Submission.Images} />
            )}
          </Box>

          {vertical && (
            <>
              <br />
              <hr />
              <br />
            </>
          )}

          <Box>
            {Submission.Answers.length === 0 ? (
              <Box w="500px">
                <Center>
                  <Text fontWeight="bold" fontSize="110%" pb="50%">
                    No questionnaire
                  </Text>
                </Center>
              </Box>
            ) : (
              <ViewQuestionnaireResponse answers={Submission.Answers} />
            )}
          </Box>

          {vertical && (
            <>
              <br />
              <hr />
              <br />
            </>
          )}

          <Box>
            <RequestCardOptions
              patient={Patient}
              submission={Submission}
              submission_date={submission_date}
              deadline_date={deadline_date}
              onFlag={flagSubmission}
            />
          </Box>
        </Stack>
      </Center>
    </Box>
  );
};

export default RequestCard;

const FLAG_SUBMISSION = gql`
  mutation flagSubmission($submission_id: ID!, $flag: Int!) {
    flagSubmission(submission_id: $submission_id, flag: $flag) {
      id
      flag
    }
  }
`;

const GET_REQUESTS = gql`
  query getRequests {
    getRequestsForReview {
      id
      type
      deadline
      fulfilled
      Submission {
        id
        Images {
          id
          url
        }
        Answers {
          id
          Question {
            id
            text
          }
          value
          extra
        }
        flag
        createdAt
      }
      Patient {
        id
        fname
        lname
        email
        flag
      }
      Doctor {
        id
        fname
        lname
        email
      }
    }
  }
`;

const GET_SUBMISSIONS = gql`
  query getSubmissions {
    getSubmissionsForReview {
      id
      flag
      createdAt
      Images {
        id
        url
      }
      Answers {
        id
        Question {
          id
          text
        }
        value
        extra
      }
      Patient {
        id
        fname
        lname
        email
        flag
      }
    }
  }
`;

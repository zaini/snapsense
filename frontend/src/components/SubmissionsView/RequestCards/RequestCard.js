import { Box, HStack, Text, Center } from "@chakra-ui/react";
import React from "react";
import ImageSlideshow from "../../utils/ImageSlideshow";
import ViewQuestionnaireResponse from "../../utils/ViewQuestionnaireResponse";
import RequestCardOptions from "./RequestCardOptions";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const RequestCard = ({ data }) => {
  const { Patient, Submission, deadline, type } = data;
  const deadline_date = new Date(parseInt(deadline)).toDateString();
  const submission_date = new Date(
    parseInt(Submission.createdAt)
  ).toDateString();

  const [flagSubmission, { loading }] = useMutation(FLAG_SUBMISSION, {
    onCompleted() {
      // TODO: refresh page through cache!
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
          getRequestsForReview: data.getRequestsForReview.filter(
            (p) => p.Submission.id !== Submission.id
          ),
        },
      });
    },
  });

  return (
    <Box borderWidth="1px" borderRadius="lg" p="10px" m="5px">
      <Center p="10px">
        <HStack>
          <Box mr="100px">
            {Submission.Images.length === 0 ? (
              <Text fontWeight="bold" fontSize="110%" pb="50%">
                This submission has no images
              </Text>
            ) : (
              <ImageSlideshow images={Submission.Images} />
            )}
          </Box>
          <Box mr="100px">
            {Submission.Answers.length === 0 ? (
              <Text fontWeight="bold" fontSize="110%" pb="50%">
                This submission has no questionnaire
              </Text>
            ) : (
              <ViewQuestionnaireResponse answers={Submission.Answers} />
            )}
          </Box>
          <Box>
            <RequestCardOptions
              patient={Patient}
              submission={Submission}
              submission_date={submission_date}
              deadline_date={deadline_date}
              onFlag={flagSubmission}
            />
          </Box>
        </HStack>
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

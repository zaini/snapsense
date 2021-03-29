import { Box, Stack, Text, Center } from "@chakra-ui/react";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../context/auth";
import ImageSlideshow from "../../utils/ImageSlideshow";
import ViewQuestionnaireResponse from "../../utils/ViewQuestionnaireResponse";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import SubmissionCardOptions from "./SubmissionCardOptions";

const SubmissionCard = ({ testID, data, vertical, redirect }) => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  // data here is a submission object
  const { Patient, Images, Answers, createdAt, flag, id } = data;

  let createdAtDate = parseInt(createdAt);
  if (isNaN(createdAtDate)) {
    createdAtDate = createdAt;
  }

  const submission_date = new Date(createdAtDate).toLocaleString();

  const [flagSubmission] = useMutation(FLAG_SUBMISSION, {
    onCompleted() {
      redirect && history.push(redirect);
    },
    onError(err) {
      console.log(err);
    },
    update(proxy) {
      const data = proxy.readQuery({
        query: GET_SUBMISSIONS,
      });
      proxy.writeQuery({
        query: GET_SUBMISSIONS,
        data: {
          getSubmissionsForReview: data.getSubmissionsForReview.filter((p) => {
            return p.id !== id;
          }),
        },
      });
      const dataRequests = proxy.readQuery({
        query: GET_REQUESTS,
      });
      proxy.writeQuery({
        query: GET_REQUESTS,
        data: {
          getRequestsForReview: dataRequests.getRequestsForReview.filter(
            (p) => {
              return p.Submission.id !== id;
            }
          ),
        },
      });
    },
  });

  return (
    <Box
      data-testid={testID}
      borderWidth="1px"
      borderRadius="lg"
      p="10px"
      m="5px"
    >
      {id}
      <Center p="10px">
        <Stack direction={vertical ? "column" : "row"}>
          <Box>
            {Images && Images.length === 0 ? (
              <Center>
                <Box
                  w="220px"
                  h="100%"
                  overflow="hidden"
                  objectFit="scale-down"
                >
                  <Text fontWeight="bold" fontSize="110%" pb="50%">
                    No images
                  </Text>
                </Box>
              </Center>
            ) : (
              <ImageSlideshow images={Images} />
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
            {Answers && Answers.length === 0 ? (
              <Box w="500px">
                <Center>
                  <Text fontWeight="bold" fontSize="110%" pb="50%">
                    No questionnaire
                  </Text>
                </Center>
              </Box>
            ) : (
              <ViewQuestionnaireResponse answers={Answers} />
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
            <SubmissionCardOptions
              user={user}
              patient={Patient}
              submission_id={id}
              submission_date={submission_date}
              onFlag={flagSubmission}
              flag={flag}
            />
          </Box>
        </Stack>
      </Center>
    </Box>
  );
};

export default SubmissionCard;

const FLAG_SUBMISSION = gql`
  mutation flagSubmission($submission_id: ID!, $flag: Int!) {
    flagSubmission(submission_id: $submission_id, flag: $flag) {
      id
      flag
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

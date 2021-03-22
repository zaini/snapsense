import { Box, Stack, Text, Center } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import ImageSlideshow from "../../utils/ImageSlideshow";
import ViewQuestionnaireResponse from "../../utils/ViewQuestionnaireResponse";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import SubmissionCardOptions from "./SubmissionCardOptions";

const SubmissionCard = ({ data, vertical }) => {
  const { user } = useContext(AuthContext);

  // data here is a submission object
  const { Patient, Images, Answers, createdAt, flag, id } = data;
  const submission_date = new Date(parseInt(createdAt)).toDateString();

  const [flagSubmission, { loading }] = useMutation(FLAG_SUBMISSION, {
    onCompleted() {
      // window.location.reload();
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
    },
  });

  return (
    <Box borderWidth="1px" borderRadius="lg" p="10px" m="5px">
      {id}
      <Center p="10px">
        <Stack direction={vertical ? "column" : "row"}>
          <Box>
            {Images.length === 0 ? (
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
            {Answers.length === 0 ? (
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

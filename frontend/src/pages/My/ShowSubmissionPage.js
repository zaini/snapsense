import gql from "graphql-tag";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { Center } from "@chakra-ui/layout";
import Submission from "../../components/ShowSubmission";

// Viewing a specific submission
const ShowSubmissionPage = () => {
  const params = useParams();
  const submissionId = params.submission_id;
  const { loading, data, error } = useQuery(GET_SUBMISSION, {
    variables: {
      submission_id: submissionId,
    },
  });

  let markup;

  if (loading) {
    markup = (
      <Center>
        <Spinner size="xl" />
      </Center>
    );
  } else if (error) {
    markup = (
      <Alert status="error">
        <AlertIcon />
        {error.graphQLErrors[0].message}
      </Alert>
    );
  } else {
    let submission = data.getSubmission;
    markup = <Submission submission={submission} />;
  }

  return markup;
};

export default ShowSubmissionPage;

const GET_SUBMISSION = gql`
  query getSubmission($submission_id: ID!) {
    getSubmission(submission_id: $submission_id) {
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

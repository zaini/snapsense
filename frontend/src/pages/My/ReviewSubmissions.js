import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Center, Heading } from "@chakra-ui/layout";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import SubmissionCardsTable from "../../components/SubmissionsView/SubmissionCards/SubmissionCardsTable";

// Shows the "cards" of all the requests that have been fulfilled but not reviewed by the doctor
const ReviewSubmissions = () => {
  const { loading, data, error } = useQuery(GET_REQUESTS);

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
    console.log(data);
    let data_rows = data.getRequestsForReview;
    data_rows = [
      {
        id: 1,
        type: 2,
        deadline: new Date(),
        fulfillment_date: new Date(),
        Submission: {
          id: 2,
          questionnaire: { 1: "Yes", 2: "No" },
          images: [
            "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
            "https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg",
          ],
        },
        Patient: {
          id: 1,
          fname: "Bob",
          lname: "McBob",
        },
      },
    ];
    markup = <SubmissionCardsTable data={data_rows} />;
  }

  return (
    <>
      <Center>
        <Heading>Review Patient Submissions</Heading>
        <hr />
        <br />
        {markup}
      </Center>
    </>
  );
};

export default ReviewSubmissions;

const GET_REQUESTS = gql`
  query getRequests {
    getRequestsForReview {
      id
      type
      deadline
      Submission {
        id
      }
      Patient {
        fname
        lname
        email
      }
      Doctor {
        fname
        lname
        email
      }
    }
  }
`;

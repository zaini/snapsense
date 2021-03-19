import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Center, Heading } from "@chakra-ui/layout";
import { Alert, AlertIcon, Spinner } from "@chakra-ui/react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import RequestCardsTable from "../../components/SubmissionsView/RequestCards/RequestCardsTable";

// Shows the "cards" of all the requests that have been fulfilled but not reviewed by the doctor and general submissions from their patients
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
    let data_rows = data.getRequestsForReview;
    markup = (
      <Tabs>
        <TabList>
          <Tab>Fulfilled & Unreviewed Requests</Tab>
          <Tab>Unreviewed Submissions</Tab>
        </TabList>
        <TabPanel>
          <RequestCardsTable data={data_rows} />
        </TabPanel>
        <TabPanel>
          <h2>all submissions will go here</h2>
        </TabPanel>
      </Tabs>
    );
  }

  return (
    <>
      <Center>
        <Heading>Review Patient Submissions</Heading>
      </Center>
      <br />
      <hr />
      <br />
      {/* Have 2 tabs: one for submissions associated with requests and one for submissions as a whole */}
      {markup}
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

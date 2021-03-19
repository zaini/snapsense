import { Center, Heading } from "@chakra-ui/layout";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import RequestCardsTable from "../../components/SubmissionsView/RequestCards/RequestCardsTable";
import SubmissionCardsTable from "../../components/SubmissionsView/SubmissionCards/SubmissionCardsTable";

// Shows the "cards" of all the requests that have been fulfilled but not reviewed by the doctor and general submissions from their patients
const ReviewSubmissions = () => {
  return (
    <>
      <Center>
        <Heading>Review Patient Submissions</Heading>
      </Center>
      <br />
      <hr />
      <br />
      {/* Have 2 tabs: one for submissions associated with requests and one for submissions as a whole */}
      <Tabs>
        <TabList>
          <Tab>Fulfilled & Unreviewed Requests</Tab>
          <Tab>Unreviewed Submissions</Tab>
        </TabList>
        <TabPanel>
          <RequestCardsTable />
        </TabPanel>
        <TabPanel>
          <SubmissionCardsTable />
        </TabPanel>
      </Tabs>
    </>
  );
};

export default ReviewSubmissions;

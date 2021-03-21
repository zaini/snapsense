import {
  Center,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

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
        <TabPanels>
          <TabPanel>
            <RequestCardsTable />
          </TabPanel>
          <TabPanel>
            <SubmissionCardsTable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default ReviewSubmissions;

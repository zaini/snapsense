import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  HStack,
  VStack,
  Button,
  Select,
  InputGroup,
  InputLeftAddon,
  Input,
} from "@chakra-ui/react";
import { BsPerson, BsFlag } from "react-icons/bs";
import { BiCalendarCheck, BiCalendarExclamation } from "react-icons/bi";

import getFlagText from "../../../utils/Flags";

const RequestCardOptions = ({
  patient,
  submission,
  submission_date,
  deadline_date,
  onFlag,
}) => {
  const [flagValue, setFlagValue] = useState(-1);

  return (
    <VStack>
      <Box width="100%">
        <InputGroup mb="10px">
          <InputLeftAddon children={<BsPerson />} backgroundColor="#ABCAE7" />
          <Input
            value={`${patient.fname} ${patient.lname} (${getFlagText(
              patient.flag
            )})`}
            isReadOnly={true}
          />
        </InputGroup>
        <InputGroup mb="10px">
          <InputLeftAddon
            children={<BiCalendarCheck />}
            backgroundColor="#ABCAE7"
          />
          <Input value={submission_date} isReadOnly={true} />
        </InputGroup>
        <InputGroup mb="10px">
          <InputLeftAddon
            children={<BiCalendarExclamation />}
            backgroundColor="#ABCAE7"
          />
          <Input value={deadline_date} isReadOnly={true} />
        </InputGroup>
        <InputGroup mb="10px">
          <InputLeftAddon children={<BsFlag />} backgroundColor="#ABCAE7" />
          <Select
            value={flagValue}
            onChange={(e) => {
              setFlagValue(e.target.value);
            }}
          >
            <option value="-1">Review Submission</option>
            <option value="1">Low Risk</option>
            <option value="2">Medium Risk</option>
            <option value="3">High Risk</option>
          </Select>
        </InputGroup>
        {/* TODO: this is not actaully linked to any API and is just mock data. */}
        <InputGroup mb="10px">
          <InputLeftAddon
            children={<p>SnapSense AI Rating</p>}
            backgroundColor="#ABCAE7"
          />
          <Input value={"High Risk"} isReadOnly={true} />
        </InputGroup>
      </Box>
      <HStack>
        <Button
          colorScheme="blue"
          isDisabled={parseInt(flagValue) === -1}
          onClick={() => {
            onFlag({
              variables: {
                submission_id: submission.id,
                flag: parseInt(flagValue),
              },
            });
            alert("This submission has now been reviewed.");
          }}
        >
          Submit Review
        </Button>
        <Link to={`/my/submissions/show/${submission.id}`}>
          <Button colorScheme="blue">View Submission</Button>
        </Link>
        <Link to={`/my/patients/${patient.id}/requests/new`}>
          <Button colorScheme="blue">Make a new request</Button>
        </Link>
      </HStack>
    </VStack>
  );
};

export default RequestCardOptions;

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
import { BsPersonFill, BsFlag } from "react-icons/bs";
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
          <InputLeftAddon children={<BsPersonFill />} />
          <Input
            value={`${patient.fname} ${patient.lname} (${getFlagText(
              patient.flag
            )})`}
            isReadOnly={true}
          />
        </InputGroup>
        <InputGroup mb="10px">
          <InputLeftAddon children={<BiCalendarCheck />} />
          <Input value={submission_date} isReadOnly={true} />
        </InputGroup>
        <InputGroup mb="10px">
          <InputLeftAddon children={<BiCalendarExclamation />} />
          <Input value={deadline_date} isReadOnly={true} />
        </InputGroup>
        <InputGroup mb="10px">
          <InputLeftAddon children={<BsFlag />} />
          <Select
            onChange={(e) => {
              setFlagValue(e.target.value);
            }}
          >
            <option value="-1" selected>
              Review Submission
            </option>
            <option value="1">Low Risk</option>
            <option value="2">Medium Risk</option>
            <option value="3">High Risk</option>
          </Select>
        </InputGroup>
      </Box>
      <HStack>
        <Button
          isDisabled={parseInt(flagValue) === -1}
          onClick={() => {
            onFlag({
              variables: {
                submission_id: submission.id,
                flag: parseInt(flagValue),
              },
            });
          }}
        >
          Submit Review
        </Button>
        <Link to={`/my/submissions/show/${submission.id}`}>
          <Button>View Submission</Button>
        </Link>
        <Link to={`/my/patients/${patient.id}/requests/new`}>
          <Button>Make a new request</Button>
        </Link>
      </HStack>
    </VStack>
  );
};

export default RequestCardOptions;

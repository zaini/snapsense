import {
  Box,
  HStack,
  VStack,
  Button,
  Select,
  Text,
  InputGroup,
  InputLeftAddon,
  Input,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BsPersonFill, BsFlag } from "react-icons/bs";
import { BiCalendarCheck, BiCalendarExclamation } from "react-icons/bi";

const RequestCardOptions = ({
  patient,
  submission,
  submission_date,
  deadline_date,
}) => {
  return (
    <Box>
      <VStack>
        <Box width="100%">
          <InputGroup mb="10px">
            <InputLeftAddon children={<BsPersonFill />} />
            <Input
              value={`${patient.fname} ${patient.lname}`}
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
            <Select placeholder="Review Submission">
              <option value="1">Low Risk</option>
              <option value="2">Medium Risk</option>
              <option value="3">High Risk</option>
            </Select>
          </InputGroup>
        </Box>
        <HStack>
          <Button>Submit Review</Button>
          <Link
            to={`/my/submissions/patients/${patient.id}/submissions/show/${submission.id}`}
          >
            <Button>View Submission</Button>
          </Link>
          <Link to={`/my/patients/${patient.id}/requests/new`}>
            <Button>Make a new request</Button>
          </Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default RequestCardOptions;

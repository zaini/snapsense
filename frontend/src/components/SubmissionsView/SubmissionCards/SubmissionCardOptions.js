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
import { BiCalendarCheck } from "react-icons/bi";
import getFlagText from "../../../utils/Flags";

const SubmissionCardOptions = ({
  user,
  patient,
  submission_id,
  submission_date,
  onFlag,
  flag,
}) => {
  const [flagValue, setFlagValue] = useState(flag || -1);

  return (
    <VStack>
      <Box w="500px">
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
          <InputLeftAddon children={<BsFlag />} backgroundColor="#ABCAE7" />
          {user.accountType === "DOCTOR" ? (
            <Select
              data-testid="requestRiskSelect"
              value={flagValue}
              onChange={(e) => {
                setFlagValue(e.target.value);
              }}
            >
              <option data-testid="selectOption" value="-1">
                Review Submission
              </option>
              <option data-testid="selectOption" value="1">
                Low Risk
              </option>
              <option data-testid="selectOption" value="2">
                Medium Risk
              </option>
              <option data-testid="selectOption" value="3">
                High Risk
              </option>
            </Select>
          ) : (
            <Input value={getFlagText(flag)} isReadOnly={true} />
          )}
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
      {user.accountType === "DOCTOR" && (
        <HStack>
          <Button
            data-testid="submitBtnForm"
            colorScheme="blue"
            isDisabled={parseInt(flagValue) === -1}
            onClick={() => {
              onFlag({
                variables: {
                  submission_id: submission_id,
                  flag: parseInt(flagValue),
                },
              });
              alert("This submission has now been reviewed.");
            }}
          >
            Submit Review
          </Button>
          <Link
            data-testid="viewLink"
            to={`/my/submissions/show/${submission_id}`}
          >
            <Button data-testid="viewSubBtnForm" colorScheme="blue">
              View Submission
            </Button>
          </Link>
          <Link
            data-testid="newRequestLink"
            to={`/my/patients/${patient.id}/requests/new`}
          >
            <Button data-testid="requestSubBtnForm" colorScheme="blue">
              Request Submission
            </Button>
          </Link>
        </HStack>
      )}
    </VStack>
  );
};

export default SubmissionCardOptions;

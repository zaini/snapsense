import { useState, useEffect } from "react";
import {
  Box,
  HStack,
  VStack,
  Button,
  Text,
  InputGroup,
  InputLeftAddon,
  Input,
  Center,
  Textarea,
  FormLabel,
  FormControl,
} from "@chakra-ui/react";
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiQuestionAnswerLine } from "react-icons/ri";

const ViewQuestionnaireResponse = ({ answers }) => {
  const [index, setIndex] = useState(0);
  const [responseComponents, setResponseComponents] = useState([]);

  useEffect(() => {
    let temp = [];
    answers.forEach((e, i) => {
      let component = (
        <VStack data-testid="QuestionAnswer" key={i} w="500px">
          <InputGroup mb="3px">
            <InputLeftAddon children={<FaRegQuestionCircle />} />
            <Input
              data-testid={`inputQuestion${i}`}
              value={e.Question.text}
              isReadOnly={true}
            />
          </InputGroup>
          <InputGroup mb="3px">
            <InputLeftAddon children={<RiQuestionAnswerLine />} />
            <Input
              data-testid={`inputAnswer${i}`}
              value={e.value === true ? "Yes" : "No"}
              isReadOnly={true}
            />
          </InputGroup>
          <FormControl mb="3px">
            <FormLabel>Other notes</FormLabel>
            <Textarea value={e.extra || ""} isReadOnly={true} />
          </FormControl>
        </VStack>
      );

      temp.push(component);
    });
    setResponseComponents(temp);
  }, []);

  return (
    <VStack>
      <Box>
        <Center>{responseComponents[index]}</Center>
      </Box>
      <HStack>
        <Button
          data-testid="answerPrevBtn"
          isDisabled={index === 0}
          onClick={() => setIndex(index - 1)}
          colorScheme="blue"
        >
          Prev
        </Button>
        <Button
          data-testid="answerNextBtn"
          isDisabled={index === answers.length - 1}
          onClick={() => setIndex(index + 1)}
          colorScheme="blue"
        >
          Next
        </Button>
      </HStack>
      <Text fontWeight="bold">
        {index + 1} / {answers.length}
      </Text>
    </VStack>
  );
};

export default ViewQuestionnaireResponse;

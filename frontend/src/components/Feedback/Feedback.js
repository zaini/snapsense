import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { FaStar } from "react-icons/fa";
import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Grid,
  Container,
  Textarea,
  Text,
  Alert,
  AlertIcon,
  Spinner,
} from "@chakra-ui/react";
import Error from "../utils/Error";

const Feedback = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [value, setValue] = useState("");
  const [canSubmit, setCanSubmit] = useState(true);

  const [createFeedback, { loading, error, data }] = useMutation(
    CREATE_FEEDBACK
  );

  const handleSubmit = () => {
    createFeedback({
      variables: {
        stars: parseInt(rating),
        extra: value,
      },
    });
    setCanSubmit(false);
  };

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  let markup;

  if (loading) {
    markup = (
      <Container p="7" borderRadius="lg" mt="20">
        <Center>
          <Spinner size="xl" />
        </Center>
      </Container>
    );
  } else if (error) {
    markup = (
      <Container p="7" borderRadius="lg" mt="20">
        <Error
          errors={[
            {
              message: error.graphQLErrors[0].message,
            },
          ]}
        />
      </Container>
    );
  } else {
    markup = (
      <>
        {data && (
          <Alert status="success" borderRadius="50px" mb={4} textAlign="center">
            <AlertIcon />
            Thank you for your feedback!
          </Alert>
        )}
        <Container p="10" borderWidth="2em" borderRadius="lg" mt="10">
          <Grid
            container="true"
            justify="center"
            direction="column"
            alignItems="center"
            textAlign="center-left"
          >
            <Text mb="8px">
              How would you rate your experience with SnapSense?
            </Text>
            <Box d="flex">
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <label key={i}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                      style={{ display: "none" }}
                    />
                    <FaStar
                      data-testid="starrate"
                      size={30}
                      color={
                        ratingValue <= (hover || rating) ? "#ffc107" : "#a9a9a9"
                      }
                      style={{
                        cursor: "pointer",
                        transition: "color 200ms",
                      }}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </Box>
            <br />
            <br />
            <Box>
              <form>
                <Text mb="8px">Additional Feedback</Text>
                <Textarea
                  data-testid="textarea"
                  isfullwidth="True"
                  value={value}
                  onChange={handleInputChange}
                  placeholder="Enter here"
                  size="sm"
                />
                <br />
                <Center>
                  <Button
                    data-testid="submitbutton"
                    mt={4}
                    colorScheme="blue"
                    rightIcon={<CheckCircleIcon />}
                    onClick={() => handleSubmit()}
                    isDisabled={!canSubmit}
                  >
                    Submit
                  </Button>
                </Center>
              </form>
            </Box>
          </Grid>
        </Container>
      </>
    );
  }

  return markup;
};
export default Feedback;

export const CREATE_FEEDBACK = gql`
  mutation createFeedback($stars: Int!, $extra: String) {
    createFeedback(stars: $stars, extra: $extra) {
      id
      stars
      extra
    }
  }
`;

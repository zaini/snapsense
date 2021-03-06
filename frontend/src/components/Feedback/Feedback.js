import { useState } from "react";
import { FaStar } from "react-icons/fa";
import {
  Box,
  Button,
  Center,
  Grid,
  Container,
  Textarea,
  Text,
} from "@chakra-ui/react";

function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [value, setValue] = useState("");

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  return (
    <Container p="10" borderWidth="1px" borderRadius="lg" mt="40">
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        textAlign="center-left"
      >
        <Text mb="8px">How was your experience in overall? </Text>
        <Box d="flex">
          {[...Array(5)].map((star, i) => {
            const ratingValue = i + 1;
            return (
              <label>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                  style={{ display: "none" }}
                />
                <FaStar
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
            <Text mb="8px">Did we meet your expectations?</Text>
            <Textarea
              value={value}
              onChange={handleInputChange}
              placeholder="Max 500 words"
              size="sm"
            />
            <br />
            <Center>
              <Button mt={4} colorScheme="blue" type="submit">
                Submit
              </Button>
            </Center>
          </form>
        </Box>
      </Grid>
    </Container>
  );
}

export default Feedback;

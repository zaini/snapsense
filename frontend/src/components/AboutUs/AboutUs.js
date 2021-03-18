import { Text, Container, Heading, Image } from "@chakra-ui/react";

import img from "./snapsense.png";

const AboutUs = () => {
  return (
    <Container mt="10">
      <Heading as="h1" size="4xl" isTruncated>
        ABOUT US
      </Heading>
      <Image mt="5" boxSize={"100%"} src={img} alt="SnapSense AI" />
      <Text mt="10" color="gray.500">
        SnapSense is a wound monitoring software making monitoring diabetic
        wounds as easy as taking a selfie! There are over 450 million patients
        worldwide with diabetes, a debilitating chronic disease. Around 25% of
        diabetic patients develop foot ulcers, responsible for 85% of
        amputations, causing significant distress + morbidity. Our app guides
        patients to snap pictures of their wound and answer a symptoms-based
        questionnaire that clinicians can easily review, reducing appointments,
        encouraging earlier recognition of wounds, and saving the patients and
        hospitals time and money.
      </Text>
      <br />
    </Container>
  );
};

export default AboutUs;

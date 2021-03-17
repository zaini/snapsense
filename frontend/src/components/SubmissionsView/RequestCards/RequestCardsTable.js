import { Container, Text } from "@chakra-ui/layout";
import React from "react";
import RequestCard from "./RequestCard";

const RequestCardsTable = ({ data }) => {
  let markup;
  if (data.length === 0) {
    markup = (
      <Container>
        <Text>You have no submissions awaiting review!</Text>
      </Container>
    );
  } else {
    markup = (
      <>
        {data.map((e, i) => {
          return <RequestCard data={e} />;
        })}
      </>
    );
  }

  return markup;
};

export default RequestCardsTable;

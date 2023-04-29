import { Card, CardHeader, Heading } from "@chakra-ui/react";
import React from "react";

function CardView(props) {
  return (
    <Card boxShadow="lg" width="100%" onClick={props.onOpen} cursor="pointer">
      <CardHeader>
        <Heading size="md">{props.cardName}</Heading>
      </CardHeader>
    </Card>
  );
}

export default CardView;

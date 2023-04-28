import { Card, CardHeader, Heading } from "@chakra-ui/react";
import React from "react";

function Board({ boardname, backgroundImg, openBoard}) {
  return (
    <Card
      cursor="pointer"
      onClick={openBoard}
      boxShadow="lg"
      height="10rem"
      width={{ base: "100%", md: "24%" }}
      backgroundImage={backgroundImg}
    >
      <CardHeader>
        <Heading color="white" size="md">
          {boardname}
        </Heading>
      </CardHeader>
    </Card>
  );
}

export default Board;

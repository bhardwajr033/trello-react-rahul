import { Card, CardHeader, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Board(props) {
  const navigate = useNavigate();
  const openBoard = (event) => {
    navigate(`/board/${props.boardId}`);
  };
  return (
    <Card
      cursor="pointer"
      onClick={openBoard}
      boxShadow="lg"
      height="10rem"
      width={{ base: "100%", md: "24%" }}
      backgroundImage={props.backgroundImg}
    >
      <CardHeader>
        <Heading color="white" size="md">
          {props.boardname}
        </Heading>
      </CardHeader>
    </Card>
  );
}

export default Board;

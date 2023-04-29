import { Box, Flex, Spinner, Wrap } from "@chakra-ui/react";
import React from "react";
import Board from "../components/Board";
import CreateBoard from "../components/CreateBoard";

function BoardContniber({ boardDetails, createBoard }) {
  if (boardDetails.length === 0) {
    return (
      <Flex align="center" justify="center" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  const boards = boardDetails.map((board, index) => {
    return (
      <Board
        key={index}
        boardname={board.name}
        backgroundImg={board.backgroundImg}
      />
    );
  });

  return (
    <Box marginTop="4rem">
      <Wrap
        justify="flex-start"
        p={{ base: "1rem", md: "2rem" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        {boards}
        <CreateBoard createBoard={createBoard} />
      </Wrap>
    </Box>
  );
}

export default BoardContniber;

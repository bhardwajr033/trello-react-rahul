import { Box, Flex, Wrap } from "@chakra-ui/react";
import React from "react";
import Board from "../components/Board";
import CreateBoard from "../components/CreateBoard";

function BoardContniber({ boardDetails,openBoard,createBoard }) {
  const boards = boardDetails.map((board, index) => {
    return (
      <Board
        key={index}
        boardname={board.name}
        backgroundImg={board.backgroundImg}
        openBoard = {openBoard}
      />
    );
  });
  return (
    <Box>
      <Wrap
        justify="flex-start"
        p={{ base: "1rem", md: "2rem" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        {boards}
        <CreateBoard createBoard={createBoard}/>
      </Wrap>
    </Box>
  );
}

export default BoardContniber;

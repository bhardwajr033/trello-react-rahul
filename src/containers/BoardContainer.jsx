import { Box, Flex, Spinner, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import CreateBoard from "../components/CreateBoard";
import { createBoard, getBoards } from "../services/boardServices";

function BoardContainer() {
  const [boardDetails, setBoardDetails] = useState([]);

  async function getBoardDetails() {
    const boardData = await getBoards();
    if (boardData.error) {
      return;
    }
    setBoardDetails(boardData);
  }

  useEffect(() => {
    getBoardDetails();
  }, []);

  const handleCreateBoard = async (newBoardName, newBoardBackground) => {
    if (!newBoardName) {
      newBoardName = "new Board";
    }
    if (!newBoardBackground) {
      newBoardBackground = "gradient-snow";
    }
    const newBoard = await createBoard(newBoardName, newBoardBackground);
    if (!newBoard.error) {
      getBoardDetails();
    }
  };

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
        boardId={board.boardId}
      />
    );
  });

  return (
    <Box marginTop="5rem">
      <Wrap
        justify="flex-start"
        p={{ base: "1rem", md: "2rem" }}
        flexDirection={{ base: "column", md: "row" }}
      >
        {boards}
        <CreateBoard createBoard={handleCreateBoard} />
      </Wrap>
    </Box>
  );
}

export default BoardContainer;

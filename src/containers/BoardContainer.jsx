import { Box, Flex, Spinner, Wrap, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Board from "../components/Board";
import CreateBoard from "../components/CreateBoard";
import { createBoard, getBoards } from "../services/boardServices";
import { Toast } from "../components/Toast";
import { useNavigate } from "react-router-dom";

function BoardContainer() {
  const [boardDetails, setBoardDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toast = useToast();

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("trello-react-rahul-user"));
    if (!user) {
      toast(Toast("Cant Verify", "error", "Please login"));
      navigate("/logIn");
    }
  }, [navigate]);

  useEffect(() => {
    (async () => {
      await getBoardDetails();
      setIsLoading(false);
    })();
  }, []);

  async function getBoardDetails() {
    const boardData = await getBoards();
    if (boardData.error) {
      toast(Toast("Failed", "error", "Error while loading"));
      return;
    }
    setBoardDetails(boardData);
  }

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
      toast(Toast("Success", "success", `Created ${newBoardName} Board`));
    } else {
      toast(Toast("Failed", "error", list.error.message));
    }
  };

  if (isLoading) {
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

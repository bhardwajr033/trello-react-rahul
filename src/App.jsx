import React, { useState } from "react";
import { NavBar } from "./containers/NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import BoardContainer from "./containers/BoardContainer";

function App() {
  const boardDetails = [
    {
      name: "Board 1",
      backgroundImg:
        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg",
    },
    {
      name: "Board 2",
      backgroundImg:
        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg",
    },
    {
      name: "Board 1",
      backgroundImg:
        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg",
    },
    {
      name: "Board 1",
      backgroundImg:
        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg",
    },
    {
      name: "Board 1",
      backgroundImg:
        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg",
    },
    {
      name: "Board 1",
      backgroundImg:
        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg",
    },
  ];

  const [boardValues, setBoardValues] = useState(boardDetails);

  const handleOpenBoard = (event) => {
    console.log(event.target);
  };

  const handleCreateBoard = (newBoardName, newBoardBackground) => {
    console.log(newBoardName, newBoardBackground);
    const newBoard = {
      name: newBoardName,
      backgroundImg:
        "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg",
    };
    setBoardValues([...boardValues, newBoard]);
  };

  return (
    <ChakraProvider>
      <NavBar />
      <BoardContainer
        createBoard={handleCreateBoard}
        openBoard={handleOpenBoard}
        boardDetails={boardValues}
      />
    </ChakraProvider>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { NavBar } from "./containers/NavBar";
import { ChakraProvider } from "@chakra-ui/react";
import BoardContainer from "./containers/BoardContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorPage from "./containers/ErrorPage";
import BoardPage from "./containers/BoardPage";
import { getBoards } from "./services/getBoards";

function App() {
  const [listItems, setListItems] = useState([
    { listName: "To Do" },
    { listName: "Doing" },
    { listName: "Done" },
  ]);

  const [boardValues, setBoardValues] = useState([]);

  useEffect(() => {
    (async () => {
      const boardData = await getBoards();
      if (boardData.error) {
        return;
      }
      setBoardValues(boardData);
    })();
  }, []);

  const handleCreateBoard = (newBoardName, newBoardBackground) => {
    let boardBackgroundImage;
    switch (newBoardBackground) {
      case "light blue":
        boardBackgroundImage =
          "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg";
        break;
      case "blue":
        boardBackgroundImage =
          "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/ocean.svg";
        break;
      case "voilet":
        boardBackgroundImage =
          "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/crystal.svg";
        break;
      default:
        boardBackgroundImage =
          "https://d2k1ftgv7pobq7.cloudfront.net/images/backgrounds/gradients/snow.svg";
    }
    const newBoard = {
      name: newBoardName,
      backgroundImg: boardBackgroundImage,
    };
    setBoardValues([...boardValues, newBoard]);
  };

  const handledeleteList = (index) => {
    let items = [...listItems];
    items.splice(index, 1);
    setListItems(items);
  };

  const handleAddList = (listName) => {
    setListItems([...listItems, { listName: listName }]);
  };

  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route
              index
              element={
                <BoardContainer
                  createBoard={handleCreateBoard}
                  boardDetails={boardValues}
                />
              }
            />
            <Route
              path="board"
              element={
                <BoardPage
                  listItems={listItems}
                  deleteList={handledeleteList}
                  addList={handleAddList}
                />
              }
            />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;

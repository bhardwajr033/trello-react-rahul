import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Spinner, useToast } from "@chakra-ui/react";
import ListInBoard from "../components/LIstInBoard";
import AddAnotherCard from "../components/AddAnotherCard";
import { useParams } from "react-router-dom";
import { createList, deleteList, getLists } from "../services/listServices";
import { getBoardDetails } from "../services/boardServices";
import { Toast } from "../components/Toast";

function BoardPage() {
  const boardId = useParams().id;
  const toast = useToast();

  const [listItems, setListItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [boardDetails, setBoardDetails] = useState({
    boardName: "",
    backgroundImage: "",
  });

  useEffect(() => {
    (async () => {
      await loadBoardDetails();
      await loadLists();
      setIsLoading(false);
    })();
  }, []);

  async function loadBoardDetails() {
    const boardDetails = await getBoardDetails(boardId);
    if (boardDetails.error) {
      return;
    }
    setBoardDetails({
      boardName: boardDetails.name,
      backgroundImage: boardDetails.backgroundImg,
    });
  }

  async function loadLists() {
    const ListData = await getLists(boardId);
    if (ListData.error) {
      return;
    }
    setListItems(ListData);
  }

  const handleAddList = async (listName) => {
    const list = await createList(listName, boardId);
    if (!list.error) {
      loadLists();
      toast(Toast("Success", "success", `Created ${listName} List`));
    } else {
      toast(Toast("Failed", "error", list.error.message));
    }
  };

  const handledeleteList = async (listId) => {
    const resStatus = await deleteList(listId);
    if (resStatus === 200) {
      loadLists();
      toast(Toast("Success", "success", `Deleted ${listName} List`));
    } else {
      toast(Toast("Failed", "error", "Error while Deleting"));
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

  const lists = listItems.map((list, index) => {
    return (
      <ListInBoard
        index={index}
        key={index}
        listName={list.listName}
        deleteList={handledeleteList}
        listId={list.listId}
      />
    );
  });

  return (
    <Box
      width="fit-content"
      minWidth="100vw"
      minHeight="97vh"
      backgroundImage={boardDetails.backgroundImage}
    >
      <Box position="fixed" top="4.5rem" left="1rem" zIndex="1" width="100%">
        <Heading p="1rem">{boardDetails.boardName}</Heading>
      </Box>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        gap="2rem"
        p="2rem"
        width="fit-content"
        paddingTop="9rem"
      >
        {lists}
        <AddAnotherCard
          width={{ base: "100%", md: "15rem" }}
          addtype="List"
          addCard={handleAddList}
        />
      </Flex>
    </Box>
  );
}

export default BoardPage;

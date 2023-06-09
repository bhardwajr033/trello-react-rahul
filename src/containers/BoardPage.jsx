import React, { useEffect, useReducer, useState } from "react";
import { Box, Flex, Heading, Spinner, useToast } from "@chakra-ui/react";
import ListInBoard from "../components/LIstInBoard";
import AddAnotherCard from "../components/AddAnotherCard";
import { useNavigate, useParams } from "react-router-dom";
import {
  UpdateList,
  createList,
  deleteList,
  getLists,
} from "../services/listServices";
import { getBoardDetails } from "../services/boardServices";
import { Toast } from "../components/Toast";

const reducerActions = {
  PageLoaded: "PageLoded",
  PageUpdated: "PageUpdated",
  ListLoded: "ListLoded",
  ListAdded: "ListAdded",
  ListUpdated: "ListUpdated",
  ListDeleted: "ListDeleted",
};

const initialState = {
  boardName: "",
  backgroundImage: "",
  isLoading: true,
  listItems: [],
};

function reducer(state, action) {
  switch (action.type) {
    case reducerActions.PageLoaded:
      return { ...state, isLoading: false };
    case reducerActions.PageUpdated:
      return {
        ...state,
        boardName: action.payload.boardName,
        backgroundImage: action.payload.backgroundImage,
      };
    case reducerActions.ListLoded:
      return {
        ...state,
        listItems: action.payload.listItems,
      };
    case reducerActions.ListAdded:
      return {
        ...state,
        listItems: [...state.listItems, action.payload.listItems],
      };
    case reducerActions.ListUpdated:
      const newListItems = state.listItems.reduce((acc, item) => {
        if (item.listId === action.payload.listId) {
          acc.push({ ...item, listName: action.payload.listName });
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
      return {
        ...state,
        listItems: newListItems,
      };
    case reducerActions.ListDeleted:
      const newListItems2 = state.listItems.filter(
        (item) => item.listId !== action.payload.listId
      );
      return {
        ...state,
        listItems: newListItems2,
      };
    default:
      console.log("Error");
  }
}

function BoardPage() {
  const boardId = useParams().id;
  const toast = useToast();

  const [boardState, dispatch] = useReducer(reducer, initialState);

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
      await loadBoardDetails();
      await loadLists();
      dispatch({ type: reducerActions.PageLoaded });
    })();
  }, []);

  async function loadBoardDetails() {
    const boardDetails = await getBoardDetails(boardId);
    if (boardDetails.error) {
      toast(Toast("Failed", "error", "Error while loading"));
      return;
    }
    dispatch({
      type: reducerActions.PageUpdated,
      payload: {
        boardName: boardDetails.name,
        backgroundImage: boardDetails.backgroundImg,
      },
    });
  }

  async function loadLists() {
    const ListData = await getLists(boardId);
    if (ListData.error) {
      toast(Toast("Failed", "error", "Error while loading"));
      navigate("/home");
      return;
    }
    dispatch({
      type: reducerActions.ListLoded,
      payload: { listItems: ListData },
    });
  }

  const handleAddList = async (listName) => {
    const ListData = await createList(listName, boardId);
    if (!ListData.error) {
      dispatch({
        type: reducerActions.ListAdded,
        payload: { listItems: ListData },
      });
      toast(Toast("Success", "success", `Created ${listName} List`));
    } else {
      toast(Toast("Failed", "error", list.error.message));
    }
  };

  const updateList = async (listId, listName) => {
    const resStatus = await UpdateList(listId, listName);
    if (resStatus === 200) {
      dispatch({
        type: reducerActions.ListUpdated,
        payload: { listId: listId, listName: listName },
      });
      toast(Toast("Success", "success", `Updated List`));
    } else {
      toast(Toast("Failed", "error", "Error while Updating"));
    }
  };

  const handledeleteList = async (listId) => {
    const resStatus = await deleteList(listId);
    if (resStatus === 200) {
      dispatch({
        type: reducerActions.ListDeleted,
        payload: { listId: listId },
      });
      toast(Toast("Success", "success", `Deleted List`));
    } else {
      toast(Toast("Failed", "error", "Error while Deleting"));
    }
  };

  if (boardState.isLoading) {
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

  const lists = boardState.listItems.map((list, index) => {
    return (
      <ListInBoard
        index={index}
        key={index}
        listName={list.listName}
        deleteList={handledeleteList}
        listId={list.listId}
        updateList={updateList}
      />
    );
  });

  return (
    <Box
      width="fit-content"
      minWidth="100vw"
      minHeight="97vh"
      backgroundImage={boardState.backgroundImage}
    >
      <Box position="fixed" top="4.5rem" left="1rem" zIndex="1" width="100%">
        <Heading p="1rem">{boardState.boardName}</Heading>
      </Box>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        gap="2rem"
        p="2rem"
        width={{ base: "100%", md: "fit-content" }}
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

import { Flex, List, useDisclosure } from "@chakra-ui/react";
import React from "react";
import ListInBoard from "../components/LIstInBoard";
import CardModal from "./CardModal";
import AddAnotherCard from "../components/AddAnotherCard";

function BoardPage(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const lists = props.listItems.map((list, index) => {
    return (
      <ListInBoard
        index={index}
        key={index}
        listName={list.listName}
        deleteList={props.deleteList}
        onOpen={onOpen}
      />
    );
  });
  return (
    <>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        gap="2rem"
        p="2rem"
        width="fit-content"
        overflowX="scroll"
        marginTop="4rem"
      >
        {lists}
        <AddAnotherCard
          width={{ base: "100%", md: "15rem" }}
          addtype="List"
          addCard={props.addList}
        />
      </Flex>
      <CardModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}

export default BoardPage;

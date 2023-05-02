import { DeleteIcon } from "@chakra-ui/icons";
import { Card, CardHeader, Flex, Heading, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardView from "./CardView";
import AddAnotherCard from "./AddAnotherCard";
import { createCard, getCardsInLists } from "../services/cardServices";
import { Toast } from "./Toast";
import UpdateCard from "./UpdateCard";

function ListInBoard(props) {
  const [cardlist, setCardList] = useState([]);

  const toast = useToast();

  useEffect(() => {
    loadCards();
  }, []);

  async function loadCards() {
    const cardList = await getCardsInLists(props.listId);
    if (cardList.error) {
      toast(Toast("Failed", "error", "Error while loading"));
      return;
    }
    setCardList(cardList);
  }

  const handleAddCard = async (cardName) => {
    const resStatus = await createCard(props.listId, cardName);
    if (resStatus === 200) {
      loadCards();
      toast(Toast("Success", "success", `Created ${cardName} Card`));
    } else {
      toast(Toast("Failed", "error", "Error while Creating Card"));
    }
  };

  const cards = cardlist.map((card, index) => {
    return (
      <CardView
        key={index}
        cardName={card.cardName}
        cardId={card.cardId}
        isUpdate={() => {
          loadCards();
        }}
      />
    );
  });

  return (
    <Card
      boxShadow="lg"
      height="fit-content"
      minHeight="10rem"
      maxHeight="60vh"
      width={{ base: "100%", md: "15rem" }}
      background="#9df9ef"
    >
      <Flex justifyContent="space-between" p="1rem">
        <CardHeader p="0">
          <Heading size="md">{props.listName}</Heading>
        </CardHeader>
        <Flex gap="1rem">
          <UpdateCard
            updatetype="List"
            updateName={props.listName}
            updateCard={props.updateList}
            updateID = {props.listId}
          />
          <DeleteIcon
            cursor="pointer"
            onClick={() => props.deleteList(props.listId)}
          />
        </Flex>
      </Flex>
      <Flex
        flexDirection="column"
        px="0.5rem"
        py="1rem"
        gap="0.5rem"
        overflowX="scroll"
      >
        {cards}
      </Flex>
      <AddAnotherCard width="100%" addtype="Card" addCard={handleAddCard} />
    </Card>
  );
}

export default ListInBoard;

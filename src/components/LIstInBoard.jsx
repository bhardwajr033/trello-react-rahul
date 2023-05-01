import { DeleteIcon } from "@chakra-ui/icons";
import { Card, CardHeader, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CardView from "./CardView";
import AddAnotherCard from "./AddAnotherCard";
import { createCard, getCardsInLists } from "../services/cardServices";

function ListInBoard(props) {
  const [cardlist, setCardList] = useState([]);

  useEffect(() => {
    loadCards();
  }, []);

  async function loadCards() {
    const cardList = await getCardsInLists(props.listId);
    if (cardList.error) {
      return;
    }
    setCardList(cardList);
  }

  const handleAddCard = async (cardName) => {
    const resStatus = await createCard(props.listId, cardName);
    if (resStatus === 200) {
      loadCards();
    }
  };

  const cards = cardlist.map((card, index) => {
    return (
      <CardView
        key={index}
        cardName={card.cardName}
        cardId={card.cardId}
        isUpdate={loadCards()}
      />
    );
  });

  return (
    <Card
      boxShadow="lg"
      height="fit-content"
      minHeight="10rem"
      width={{ base: "100%", md: "15rem" }}
    >
      <Flex justifyContent="space-between" p="1rem">
        <CardHeader p="0">
          <Heading size="md">{props.listName}</Heading>
        </CardHeader>
        <DeleteIcon
          cursor="pointer"
          onClick={() => props.deleteList(props.listId)}
        />
      </Flex>
      <Flex flexDirection="column" px="0.5rem" py="1rem" gap="0.5rem">
        {cards}
        <AddAnotherCard width="100%" addtype="Card" addCard={handleAddCard} />
      </Flex>
    </Card>
  );
}

export default ListInBoard;

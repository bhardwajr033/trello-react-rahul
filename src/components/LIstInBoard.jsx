import { DeleteIcon } from "@chakra-ui/icons";
import { Card, CardHeader, Flex, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import CardView from "./CardView";
import AddAnotherCard from "./AddAnotherCard";

function ListInBoard(props) {
  const [cardlist, setCardList] = useState([
    { cardName: "card1" },
    { cardName: "card1" },
    { cardName: "card1" },
    { cardName: "card1" },
  ]);
  const cards = cardlist.map((card, index) => {
    return (
      <CardView onOpen={props.onOpen} key={index} cardName={card.cardName} />
    );
  });

  const handleAddCard = (cardName) => {
    setCardList([...cardlist, { cardName: cardName }]);
  };

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
        <DeleteIcon cursor="pointer" onClick={()=> props.deleteList(props.index)} />
      </Flex>
      <Flex flexDirection="column" px="0.5rem" py="1rem" gap="0.5rem">
        {cards}
        <AddAnotherCard width="100%" addtype="Card" addCard={handleAddCard} />
      </Flex>
    </Card>
  );
}

export default ListInBoard;

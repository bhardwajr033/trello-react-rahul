import { Card, CardHeader, Heading, useDisclosure } from "@chakra-ui/react";
import React from "react";
import CardModal from "../containers/CardModal";

function CardView(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Card boxShadow="lg" width="100%" onClick={onOpen} cursor="pointer">
      <CardHeader>
        <Heading size="md">{props.cardName}</Heading>
      </CardHeader>
      <CardModal
        cardName = {props.cardName}
        cardID={props.cardId}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        isUpdate={props.isUpdate}
      />
    </Card>
  );
}

export default CardView;

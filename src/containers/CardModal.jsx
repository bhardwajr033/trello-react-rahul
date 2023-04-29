import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
} from "@chakra-ui/react";
import { useState } from "react";
import CheckList from "../components/CheckList";
import AddAnotherCard from "../components/AddAnotherCard";

function CardModal({ isOpen, onOpen, onClose }) {
  const [checkListItems, setCheckListItems] = useState([
    { checklistName: "checklist 1" },
    { checklistName: "checklist 1" },
    { checklistName: "checklist 1" },
    { checklistName: "checklist 1" },
  ]);

  const handleDeleteCheckList = (event) => {
    console.log(event);
  };

  const checkLists = checkListItems.map((item, index) => {
    return (
      <AccordionItem key={index} gap="1rem">
        <AccordionButton>
          <CheckList
            checklistName={item.checklistName}
            deleteCheckList={handleDeleteCheckList}
          />
        </AccordionButton>
      </AccordionItem>
    );
  });

  const handleAddCard = (checklistName) => {
    setCheckListItems([{ checklistName: checklistName }, ...checkListItems]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Card Name</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap="1rem" p="1rem">
            <AddAnotherCard
              width="100%"
              addtype="Checklist"
              addCard={handleAddCard}
            />
            <Accordion>{checkLists}</Accordion>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default CardModal;

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
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CheckList from "../components/CheckList";
import AddAnotherCard from "../components/AddAnotherCard";
import { deleteCard } from "../services/cardServices";
import {
  createCheckList,
  deleteCheckList,
  getCheckListsInCard,
} from "../services/checkListServices";

function CardModal(props) {
  const { isOpen, onOpen, onClose } = props;

  const [checkListDetails, setCheckListDetails] = useState([]);

  useEffect(() => {
    loadCheckList();
  }, []);

  async function loadCheckList() {
    const res = await getCheckListsInCard(props.cardID);
    if (!res.error) {
      setCheckListDetails(res);
    }
  }

  const handleAddCheckList = async (checklistName) => {
    const resStatus = await createCheckList(props.cardID, checklistName);
    if (resStatus === 200) {
      loadCheckList();
    }
  };

  const handleDeleteCheckList = async (checkListID) => {
    const resStatus = await deleteCheckList(checkListID);
    if (resStatus === 200) {
      loadCheckList();
    }
  };

  async function handledeleteCard() {
    const resStatus = await deleteCard(props.cardID);
    if (resStatus === 200) {
      props.isUpdate();
    } else {
      console.log("failed");
    }
  }

  const checkLists = checkListDetails.map((item, index) => {
    return (
      <AccordionItem key={index} gap="1rem">
        <AccordionButton>
          <CheckList
            checkListID={item.checkListId}
            checklistName={item.checkListName}
            deleteCheckList={handleDeleteCheckList}
          />
        </AccordionButton>
      </AccordionItem>
    );
  });

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
              addCard={handleAddCheckList}
            />
            <Accordion>{checkLists}</Accordion>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            onClick={(event) => {
              onClose(event);
              handledeleteCard();
            }}
          >
            Delete Card
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default CardModal;

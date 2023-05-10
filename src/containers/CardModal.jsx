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
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CheckList from "../components/CheckList";
import AddAnotherCard from "../components/AddAnotherCard";
import { UpdateCardAPI, deleteCard } from "../services/cardServices";
import {
  createCheckList,
  deleteCheckList,
  getCheckListsInCard,
} from "../services/checkListServices";
import { Toast } from "../components/Toast";
import UpdateCard from "../components/UpdateCard";

function CardModal(props) {
  const { isOpen, onOpen, onClose } = props;

  const [checkListDetails, setCheckListDetails] = useState([]);
  const [cardName, setCardName] = useState(props.cardName);

  const toast = useToast();

  useEffect(() => {
    loadCheckList();
  }, []);

  async function loadCheckList() {
    const res = await getCheckListsInCard(props.cardID);
    if (!res.error) {
      setCheckListDetails(res);
    } else {
      toast(Toast("Failed", "error", "Error while loading"));
    }
  }

  const handleAddCheckList = async (checklistName) => {
    const resDetail = await createCheckList(props.cardID, checklistName);
    if (!resDetail.error) {
      setCheckListDetails([...checkListDetails, resDetail]);
      toast(Toast("Success", "success", `Created ${checklistName} Checklist`));
    } else {
      toast(Toast("Failed", "error", "Error while Creating Checklist"));
    }
  };

  const handleDeleteCheckList = async (checkListID) => {
    const resStatus = await deleteCheckList(checkListID);
    if (resStatus === 200) {
      const newCheckListDetails = checkListDetails.filter(
        (checkList) => checkList.checkListId !== checkListID
      );
      setCheckListDetails(newCheckListDetails);
      toast(Toast("Success", "success", `Deleted  Checklist`));
    } else {
      toast(Toast("Failed", "error", "Error while Deleting Checklist"));
    }
  };

  const handelUpdateCard = async (cardID, cardName) => {
    const resStatus = await UpdateCardAPI(cardID, cardName);
    if (resStatus === 200) {
      setCardName(cardName);
      props.isUpdate();
      toast(Toast("Success", "success", `Updated Card`));
    } else {
      toast(Toast("Failed", "error", "Error while Updating"));
    }
  };

  async function handledeleteCard() {
    const resStatus = await deleteCard(props.cardID);
    if (resStatus === 200) {
      props.isUpdate();
      toast(Toast("Success", "success", `Deleted  Card`));
    } else {
      toast(Toast("Failed", "error", "Error while Deleting Card"));
    }
  }

  const checkLists = checkListDetails.map((item, index) => {
    return (
      <AccordionItem key={index} gap="1rem">
        <AccordionButton>
          <CheckList
            cardID={props.cardID}
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
      <ModalContent background="#d0bdf4">
        <ModalHeader>
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            paddingRight="3rem"
          >
            {cardName}
            <UpdateCard
              updatetype="Card"
              updateName={cardName}
              updateCard={handelUpdateCard}
              updateID={props.cardID}
            />
          </Flex>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDirection="column" gap="1rem" p="1rem">
            <AddAnotherCard
              width="100%"
              addtype="Checklist"
              addCard={handleAddCheckList}
            />
            <Accordion background="#9df9ef">{checkLists}</Accordion>
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

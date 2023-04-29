import { AddIcon } from "@chakra-ui/icons";
import {
  Card,
  CardHeader,
  Center,
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
  Select,
  Flex,
} from "@chakra-ui/react";
import React from "react";

function CreateBoard({ createBoard }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  let newBoardName = "new Board";
  let newBoardBackground = "blue";
  const createNewBoard = () => {
    onClose();
    createBoard(newBoardName, newBoardBackground);
  };
  return (
    <>
      <Card
        onClick={onOpen}
        cursor="pointer"
        boxShadow="lg"
        height="10rem"
        width={{ base: "100%", md: "24%" }}
        textAlign="center"
        background="lightgray"
      >
        <Center height="100%">
          <Flex flexDirection="column">
            <CardHeader>
              <Heading size="md">Create new board</Heading>
            </CardHeader>
            <Center>
              <AddIcon />
            </Center>
          </Flex>
        </Center>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} size={{ base: "sm", md: "lg" }}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new Board</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDirection="column" gap="1rem">
              <Input
                placeholder="board name"
                onChange={(event) => {
                  newBoardName = event.target.value;
                }}
              />
              <Select
                placeholder="background image"
                onChange={(event) => {
                  newBoardBackground = event.target.value;
                }}
              >
                <option value="light blue">light blue</option>
                <option value="blue">blue</option>
                <option value="voilet">voilet</option>
              </Select>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={createNewBoard}>
              Create
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CreateBoard;

import { AddIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardHeader,
  Heading,
  Input,
  PopoverFooter,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import React, { useRef, useState } from "react";

function AddAnotherCard(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleClose() {
    setIsOpen(false);
  }

  const ref = useRef(null);

  return (
    <Popover isOpen={isOpen} onClose={handleClose}>
      <PopoverTrigger>
        <Card
          onClick={handleClick}
          boxShadow="lg"
          width={props.width}
          height="fit-content"
          background="#9df9ef"
        >
          <CardHeader>
            <Heading size="md">
              <AddIcon marginRight="0.5rem" /> Add {props.addtype}
            </Heading>
          </CardHeader>
        </Card>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Add New {props.addtype}</PopoverHeader>
        <PopoverBody>
          <Input
            ref={ref}
            id="inputValue"
            placeholder="List name"
            width="100%"
            autoComplete="off"
          />
        </PopoverBody>
        <PopoverFooter>
          <Button
            colorScheme="blue"
            onClick={(event) => {
              props.addCard(
                ref.current.value ? ref.current.value : `New ${props.addtype}`
              );
              ref.current.value = "";
              handleClose(event);
            }}
          >
            Add
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default AddAnotherCard;

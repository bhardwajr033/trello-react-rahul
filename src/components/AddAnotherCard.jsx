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
import React from "react";

function AddAnotherCard(props) {
  let newCardName = `new ${props.addtype}`;
  return (
    <Popover>
      <PopoverTrigger>
        <Card boxShadow="lg" width={props.width} height="fit-content">
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
            placeholder="List name"
            width="100%"
            onChange={(event) => {
              newCardName = !event.target.value
                ? "new list"
                : event.target.value;
            }}
          />
        </PopoverBody>
        <PopoverFooter>
          <Button colorScheme="blue" onClick={() => props.addCard(newCardName)}>
            Add
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default AddAnotherCard;

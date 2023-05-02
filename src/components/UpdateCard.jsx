import {  EditIcon } from "@chakra-ui/icons";
import {
  Button,
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

function UpdateCard(props) {
  const [isOpen, setIsOpen] = useState(false);

  function handleClick() {
    setIsOpen(!isOpen);
  }

  function handleClose() {
    setIsOpen(false);
  }

  const ref = useRef(null);
  if(ref.current){
      ref.current.value = props.updateName;
  }

  return (
    <Popover isOpen={isOpen} onClose={handleClose}>
      <PopoverTrigger>
        <EditIcon onClick={handleClick} />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Update {props.updatetype}</PopoverHeader>
        <PopoverBody>
          <Input
            ref={ref}
            id="inputValue"
            placeholder=""
            width="100%"
            autoComplete="off"
          />
        </PopoverBody>
        <PopoverFooter>
          <Button
            colorScheme="blue"
            onClick={(event) => {
              props.updateCard(
                props.updateID,
                ref.current.value
                  ? ref.current.value
                  : `New ${props.updatetype}`
              );
              ref.current.value = "";
              handleClose(event);
            }}
          >
            Update
          </Button>
        </PopoverFooter>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateCard;

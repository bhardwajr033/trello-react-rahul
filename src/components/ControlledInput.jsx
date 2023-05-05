import { Input } from "@chakra-ui/react";
import React from "react";

function ControlledInput(props) {
  return (
      <Input
        required={props.required || false}
        value={props.value}
        onChange={({ target }) => props.handleOnChange(target)}
        type={props.type}
        placeholder={props.placeholder}
        border={props.border}
        disabled={props.isInputDisabled}
      />
  );
}

export default ControlledInput;

import { DeleteIcon } from "@chakra-ui/icons";
import { Checkbox, Flex } from "@chakra-ui/react";

function CheckItem(props) {
  return (
    <Flex width="100%" justifyContent="space-between">
      <Checkbox
        spacing="1rem"
        size="md"
        width="100%"
        isChecked={props.state === "complete"}
        onChange={() =>
          props.handleCheckUncheck(
            props.checkItemID,
            props.state === "complete"
          )
        }
        textDecorationLine={
          props.state === "complete" ? "line-through" : "none"
        }
      >
        {props.checkBoxName}
      </Checkbox>
      <DeleteIcon onClick={() => props.deleteCheckItem(props.checkItemID)} />
    </Flex>
  );
}

export default CheckItem;

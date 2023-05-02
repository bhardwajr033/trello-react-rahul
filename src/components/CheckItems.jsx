import { DeleteIcon } from "@chakra-ui/icons";
import { Checkbox, Flex } from "@chakra-ui/react";

function CheckItem(props) {
  return (
    <Flex width="100%" justifyContent="space-between">
      <Checkbox spacing="1rem" size="md" width="100%">
        {props.checkBoxName}
      </Checkbox>
      <DeleteIcon onClick={()=>props.deleteCheckItem(props.checkItemID)}/>
    </Flex>
  );
}

export default CheckItem;

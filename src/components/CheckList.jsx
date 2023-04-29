import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { AccordionPanel, Flex, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import CheckBox from "./CheckItems";

function CheckList(props) {
  const [checkItemDetails, setCheckItemDetails] = useState([
    { checkitemName: "Check 1" },
    { checkitemName: "Check 1" },
    { checkitemName: "Check 1" },
  ]);

  const checkitems = checkItemDetails.map((item, index) => {
    return <CheckBox key={index} checkBoxName={item.checkitemName} />;
  });

  let newCheckItemName = "new check";

  const handleAddCheckItem = () => {
    setCheckItemDetails([
      { checkitemName: newCheckItemName },
      ...checkItemDetails,
    ]);
  };

  return (
    <Flex flexDirection="column" width="100%">
      <Flex justifyContent="space-between" p="1rem" width="100%">
        <Heading size="md">{props.checklistName}</Heading>
        <DeleteIcon cursor="pointer" onClick={props.deleteCheckList} />
      </Flex>
      <AccordionPanel>
        <Flex flexDirection="column" width="100%" gap="0.5rem">
          <Flex flexDirection="row" gap="1rem">
            <Input
              placeholder="Add Checkitem"
              onChange={(event) => {
                newCheckItemName = event.target.value;
              }}
            />
            <CheckIcon onClick={handleAddCheckItem} />
          </Flex>
          {checkitems}
        </Flex>
      </AccordionPanel>
    </Flex>
  );
}

export default CheckList;

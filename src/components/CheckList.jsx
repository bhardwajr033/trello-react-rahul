import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { AccordionPanel, Flex, Heading, Input } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import CheckBox from "./CheckItems";
import {
  getCheckItemsInCheckList,
  createCheckItem,
  deleteCheckItem,
} from "../services/checkItemServices";

function CheckList(props) {
  const [checkItemDetails, setCheckItemDetails] = useState([]);

  useEffect(() => {
    loadCheckItems();
  }, []);

  async function loadCheckItems() {
    const res = await getCheckItemsInCheckList(props.checkListID);
    if (!res.error) {
      setCheckItemDetails(res);
    }
  }

  const handleAddCheckItem = async (checkItemName) => {
    const resStatus = await createCheckItem(props.checkListID, checkItemName);
    if (resStatus === 200) {
      loadCheckItems();
    }
  };

  const handleDeleteCheckItem = async (checkItemID) => {
    const resStatus = await deleteCheckItem(props.checkListID, checkItemID);
    if (resStatus === 200) {
      loadCheckItems();
    }
  };

  const checkitems = checkItemDetails.map((item, index) => {
    return (
      <CheckBox
        key={index}
        checkBoxName={item.checkItemName}
        checkItemID={item.checkItemId}
        deleteCheckItem={handleDeleteCheckItem}
      />
    );
  });

  const CheckItemRef = useRef(null);

  return (
    <Flex flexDirection="column" width="100%">
      <Flex justifyContent="space-between" p="1rem" width="100%">
        <Heading size="md">{props.checklistName}</Heading>
        <DeleteIcon
          cursor="pointer"
          onClick={() => props.deleteCheckList(props.checkListID)}
        />
      </Flex>
      <AccordionPanel>
        <Flex flexDirection="column" width="100%" gap="0.5rem">
          <Flex flexDirection="row" gap="1rem">
            <Input ref={CheckItemRef} placeholder="Add Checkitem" />
            <CheckIcon
              onClick={() => handleAddCheckItem(CheckItemRef.current.value)}
            />
          </Flex>
          {checkitems}
        </Flex>
      </AccordionPanel>
    </Flex>
  );
}

export default CheckList;

import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  AccordionPanel,
  Button,
  Flex,
  Heading,
  Input,
  Progress,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import CheckItem from "./CheckItems";
import {
  getCheckItemsInCheckList,
  createCheckItem,
  deleteCheckItem,
  checkUncheckCheckItem,
} from "../services/checkItemServices";
import { Toast } from "./Toast";

function CheckList(props) {
  const [checkItemDetails, setCheckItemDetails] = useState([]);

  const toast = useToast();

  useEffect(() => {
    loadCheckItems();
  }, []);

  async function loadCheckItems() {
    const res = await getCheckItemsInCheckList(props.checkListID);
    if (!res.error) {
      setCheckItemDetails(res);
    } else {
      toast(Toast("Failed", "error", "Error while loading"));
    }
  }

  const handleAddCheckItem = async (checkItemName) => {
    const rescheckItemDetail = await createCheckItem(
      props.checkListID,
      checkItemName
    );
    if (!rescheckItemDetail.error) {
      setCheckItemDetails([...checkItemDetails, rescheckItemDetail]);
      toast(Toast("Success", "success", `Created ${checkItemName} CheckItem`));
    } else {
      toast(Toast("Failed", "error", "Error while Creating CheckItem"));
    }
  };

  const handleDeleteCheckItem = async (checkItemID) => {
    const resStatus = await deleteCheckItem(props.checkListID, checkItemID);
    if (resStatus === 200) {
      const newCheckItemDetails = checkItemDetails.filter(
        (checkItem) => checkItem.checkItemId !== checkItemID
      );
      setCheckItemDetails(newCheckItemDetails);
      toast(Toast("Success", "success", `Deleted  CheckItem`));
    } else {
      toast(Toast("Failed", "error", "Error while Deleting CheckItem"));
    }
  };

  const handleCheckUncheck = async (checkItemID, stateBoolean) => {
    const resStatus = await checkUncheckCheckItem(
      props.cardID,
      props.checkListID,
      checkItemID,
      stateBoolean ? "incomplete" : "complete"
    );
    if (resStatus === 200) {
      const newCheckItemDetails = checkItemDetails.reduce((acc, checkitem) => {
        if (checkitem.checkItemId === checkItemID) {
          acc.push({
            ...checkitem,
            state: stateBoolean ? "incomplete" : "complete",
          });
        } else {
          acc.push(checkitem);
        }
        return acc;
      }, []);
      setCheckItemDetails(newCheckItemDetails);
      toast(
        Toast(
          "Success",
          "success",
          `${stateBoolean ? "Unchecked" : "Checked"} CheckItem`
        )
      );
    } else {
      toast(Toast("Failed", "error", "Error while updating CheckItem"));
    }
  };

  const checkitems = checkItemDetails.map((item, index) => {
    return (
      <CheckItem
        key={index}
        checkBoxName={item.checkItemName}
        checkItemID={item.checkItemId}
        deleteCheckItem={handleDeleteCheckItem}
        state={item.state}
        handleCheckUncheck={handleCheckUncheck}
      />
    );
  });

  let progressValue = 0;
  if (checkItemDetails.length !== 0) {
    progressValue = Math.round(
      (checkItemDetails.reduce((acc, item) => {
        if (item.state === "complete") {
          acc = acc + 1;
        }
        return acc;
      }, 0) /
        checkItemDetails.length) *
        100
    );
  }

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
            <Input
              ref={CheckItemRef}
              placeholder="Add Checkitem"
              onKeyUp={(event) => {
                if (event.key === "Enter") {
                  handleAddCheckItem(
                    CheckItemRef.current.value
                      ? CheckItemRef.current.value
                      : "New CheckItem"
                  );
                  CheckItemRef.current.value = "";
                }
              }}
            />
            <CheckIcon
              marginTop="0.5rem"
              onClick={() => {
                handleAddCheckItem(
                  CheckItemRef.current.value
                    ? CheckItemRef.current.value
                    : "New CheckItem"
                );
                CheckItemRef.current.value = "";
              }}
            />
          </Flex>
          <Flex flexDirection="row" gap="1rem">
            <Text>{progressValue.toString() + "%"}</Text>
            <Progress
              marginTop="0.3rem"
              size="md"
              borderRadius="10px"
              width="100%"
              value={progressValue}
            />
          </Flex>
          {checkitems}
        </Flex>
      </AccordionPanel>
    </Flex>
  );
}

export default CheckList;

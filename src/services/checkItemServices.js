import axios from "axios";

const baseURL = "https://api.trello.com";
const key = "befc9f65333d9079f2745afff39b3023";
const token =
  "ATTA5047d40645d6a5d15c91531a22fe889d01d1fad2e7f20d1d6843c5372cf17b457125F6FD";

export async function getCheckItemsInCheckList(checkListId) {
  try {
    const res = await axios.get(
      `${baseURL}/1/checklists/${checkListId}/checkitems/?key=${key}&token=${token}`
    );
    return res.data.reduce((acc, checkitem) => {
      acc.push({
        checkItemName: checkitem.name,
        checkItemId: checkitem.id,
        state: checkitem.state,
      });
      return acc;
    }, []);
  } catch (err) {
    return { error: err };
  }
}

export async function createCheckItem(checkListId, checkItemName) {
  try {
    const res = await axios.post(
      `${baseURL}/1/checklists/${checkListId}/checkItems`,
      {
        name: checkItemName,
        pos: "bottom",
        key: key,
        token: token,
      }
    );
    return {
      checkItemName: res.data.name,
      checkItemId: res.data.id,
      state: res.data.state,
    };
  } catch (err) {
    return { error: err };
  }
}

export async function deleteCheckItem(checkListId, checkItemId) {
  try {
    const res = await axios.delete(
      `${baseURL}/1/checklists/${checkListId}/checkItems/${checkItemId}?key=${key}&token=${token}`
    );
    return res.status;
  } catch (err) {
    return 500;
  }
}

export async function checkUncheckCheckItem(
  cardID,
  checkListId,
  checkItemId,
  state
) {
  try {
    const res = await axios.put(
      `${baseURL}/1/cards/${cardID}/checklist/${checkListId}/checkItem/${checkItemId}`,
      {
        state: state,
        key: key,
        token: token,
      }
    );
    return res.status;
  } catch (err) {
    return 500;
  }
}

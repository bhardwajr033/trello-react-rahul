import axios from "axios";

const baseURL = "https://api.trello.com";
const key = "befc9f65333d9079f2745afff39b3023";
const token =
  "ATTA5047d40645d6a5d15c91531a22fe889d01d1fad2e7f20d1d6843c5372cf17b457125F6FD";

export async function getCheckListsInCard(cardID) {
  try {
    const res = await axios.get(
      `${baseURL}/1/card/${cardID}/checklists/?key=${key}&token=${token}`
    );
    return res.data.reduce((acc, checklists) => {
      acc.push({
        checkListName: checklists.name,
        checkListId: checklists.id,
      });
      return acc;
    }, []);
  } catch (err) {
    return { error: err };
  }
}

export async function createCheckList(cardId, checkListName) {
  try {
    const res = await axios.post(`${baseURL}/1/checklists`, {
      name: checkListName,
      idCard: cardId,
      pos: "bottom",
      key: key,
      token: token,
    });
    return {
      checkListName: res.data.name,
      checkListId: res.data.id,
    };
  } catch (err) {
    return {error : err};
  }
}

export async function deleteCheckList(checkListId) {
  try {
    const res = await axios.delete(
      `${baseURL}/1/checklists/${checkListId}/?key=${key}&token=${token}`
    );
    return res.status;
  } catch (err) {
    return 500;
  }
}

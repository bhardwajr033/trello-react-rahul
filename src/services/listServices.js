import axios from "axios";

const baseURL = "https://api.trello.com";
const key = "befc9f65333d9079f2745afff39b3023";
const token =
  "ATTA5047d40645d6a5d15c91531a22fe889d01d1fad2e7f20d1d6843c5372cf17b457125F6FD";

export async function getLists(boardId) {
  try {
    const res = await axios.get(
      `${baseURL}/1/boards/${boardId}/lists?key=${key}&token=${token}`
    );
    return res.data.reduce((acc, list) => {
      acc.push({
        listName: list.name,
        listId: list.id,
      });
      return acc;
    }, []);
  } catch (err) {
    return { error: err };
  }
}

export async function createList(listName, boardId) {
  try {
    const res = await axios.post(`${baseURL}/1/lists`, {
      name: listName,
      idBoard: boardId,
      key: key,
      token: token,
      pos: "bottom",
    });
    const list = await res.data;
    return {
      listName: list.name,
      listId: list.id,
    };
  } catch (err) {
    return { error: err };
  }
}

export async function UpdateList(listId, listName) {
  try {
    const res = await axios.put(`${baseURL}/1/lists/${listId}/`, {
      name: listName,
      key: key,
      token: token,
    });
    return res.status;
  } catch (err) {
    return 500;
  }
}

export async function deleteList(listId) {
  try {
    const res = await axios.put(`${baseURL}/1/lists/${listId}/`, {
      closed: true,
      key: key,
      token: token,
    });
    return res.status;
  } catch (err) {
    return 500;
  }
}

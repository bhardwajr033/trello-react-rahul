import axios from "axios";

const baseURL = "https://api.trello.com";
const key = "befc9f65333d9079f2745afff39b3023";
const token =
  "ATTA5047d40645d6a5d15c91531a22fe889d01d1fad2e7f20d1d6843c5372cf17b457125F6FD";

export async function getCardsInLists(ListId) {
  try {
    const res = await axios.get(
      `${baseURL}/1/list/${ListId}/cards?key=${key}&token=${token}`
    );
    return res.data.reduce((acc, card) => {
      acc.push({
        cardName: card.name,
        cardId: card.id,
      });
      return acc;
    }, []);
  } catch (err) {
    return { error: err };
  }
}

export async function createCard(listId, cardName) {
  try {
    const res = await axios.post(`${baseURL}/1/cards`, {
      name: cardName,
      idList: listId,
      pos: "bottom",
      key: key,
      token: token,
    });
    return {
      cardName: res.data.name,
      cardId: res.data.id,
    };
  } catch (err) {
    return { error: err };
  }
}

export async function UpdateCardAPI(cardID, cardName) {
  try {
    const res = await axios.put(`${baseURL}/1/card/${cardID}/`, {
      name: cardName,
      key: key,
      token: token,
    });
    return res.status;
  } catch (err) {
    return 500;
  }
}

export async function deleteCard(cardID) {
  try {
    const res = await axios.delete(
      `${baseURL}/1/cards/${cardID}/?key=${key}&token=${token}`
    );
    return res.status;
  } catch (err) {
    return 500;
  }
}

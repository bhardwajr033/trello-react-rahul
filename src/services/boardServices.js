import axios from "axios";

const baseURL = "https://api.trello.com";
const key = "befc9f65333d9079f2745afff39b3023";
const token =
  "ATTA5047d40645d6a5d15c91531a22fe889d01d1fad2e7f20d1d6843c5372cf17b457125F6FD";

export async function getBoards() {
  try {
    const res = await axios.get(
      `${baseURL}/1/members/me/boards?key=${key}&token=${token}`
    );
    return res.data.reduce((acc, board) => {
      acc.push({
        name: board.name,
        boardId: board.id,
        backgroundImg: board.prefs.backgroundImage,
      });
      return acc;
    }, []);
  } catch (err) {
    return { error: err };
  }
}

export async function getBoardDetails(boardId) {
  try {
    const res = await axios.get(
      `${baseURL}/1/board/${boardId}?key=${key}&token=${token}`
    );
    const board = res.data;
    return {
      name: board.name,
      boardId: board.id,
      backgroundImg: board.prefs.backgroundImage,
    };
  } catch (err) {
    return { error: err };
  }
}

export async function createBoard(newBoardName, newBoardBackground) {
  try {
    const res = await axios.post(`${baseURL}/1/boards/`, {
      name: newBoardName,
      prefs_background: newBoardBackground,
      key: key,
      token: token,
    });
    const board = res.data;
    return {
      name: board.name,
      boardId: board.id,
      backgroundImg: board.prefs.backgroundImage,
    };
  } catch (err) {
    return { error: err };
  }
}

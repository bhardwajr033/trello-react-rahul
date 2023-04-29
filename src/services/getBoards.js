import axios from "axios";

export async function getBoards() {
  try {
    const res = await axios.get(
      "https://api.trello.com/1/members/me/boards?key=befc9f65333d9079f2745afff39b3023&token=ATTA5047d40645d6a5d15c91531a22fe889d01d1fad2e7f20d1d6843c5372cf17b457125F6FD"
    );
    return res.data.reduce((acc, board) => {
      acc.push({
        name: board.name,
        id: board.id,
        backgroundImg: board.prefs.backgroundImage,
      });
      return acc;
    }, []);
  } catch (err) {
    return { error: err };
  }
}

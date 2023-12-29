import axios from "axios"

export const boardsAction = () => async (dispatch) => {
  try {
    dispatch({ type: "SENDING-BOARD-REQUEST", loading: true })

    const response = await axios.get(
      "https://trello-d791c-default-rtdb.firebaseio.com/boards.json"
    )

    const data = await response.data

    let arrey = []

    for (const item in data) {
      arrey.push({
        board: data[item].board,
        userId: data[item].userId,
        boardId: data[item].boardId,
      })
    }

    dispatch({
      type: "SENDING-BOARD-DATA-SUCCESS",
      loading: false,
      payload: arrey,
    })
  } catch (error) {
    console.log(error)
  }
}

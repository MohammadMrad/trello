import axios from "axios"

export const boardNameAction = () => async (dispatch) => {
  try {
    dispatch({ type: "SENDING-BOARD-REQUEST", loading: true })

    const response = await axios.get(
      "https://trello-d791c-default-rtdb.firebaseio.com/boardName.json"
    )

    const data = await response.data

    let arrey = []

    for (const item in data) {
      arrey.push({
        boardName: data[item].boardName,
      })
    }

    dispatch({
      type: "FETCH-BOARD-DATA-SUCCESS",
      payload: arrey,
      loading: false,
    })
  } catch (error) {
    console.log(error)
  }
}

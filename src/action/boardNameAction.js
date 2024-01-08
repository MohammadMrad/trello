import axios from "axios"

export const boardNameAction = () => async (dispatch) => {
  try {
    // dispatch({ type: "SENDING-BOARD-NAME-REQUEST", loading: true })

    const boards = localStorage.getItem("boards")
      ? JSON.parse(localStorage.getItem("boards"))
      : []

    let arrey = []

    for (const item in boards) {
      arrey.push({
        boardName: boards[item].boardName,
        boardId: boards[item].boardId,
        userId: boards[item].userId,
        creationTime: boards[item].creationTime,
      })
    }

    dispatch({
      type: "FETCH-BOARD-NAME-DATA-SUCCESS",
      payload: arrey,
      loading: false,
    })

    if (navigator.onLine) {
      const response = await axios.delete(
        "https://trello-d791c-default-rtdb.firebaseio.com/boardName.json"
      )
      // const data = await response.data
      // console.log(data)

      for (const item in boards) {
        const response = await axios.post(
          "https://trello-d791c-default-rtdb.firebaseio.com/boardName.json",
          {
            boardName: boards[item].boardName,
            boardId: boards[item].boardId,
            userId: boards[item].userId,
          }
        )

        // const data = await response.data
        // console.log(data)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

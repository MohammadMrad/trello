import axios from "axios"

export const commentAction = () => async (dispatch) => {
  try {
    dispatch({ type: "SENDING-COMMENT-REQUEST", loading: true })
    const response = await axios.get(
      "https://trello-d791c-default-rtdb.firebaseio.com/comment.json"
    )

    const data = await response.data

    let arrey = []

    for (const item in data) {
      arrey.push({
        comment: data[item].comment,
        cardId: data[item].cardId,
      })
    }

    dispatch({
      type: "FETCH-COMMENT-DATA-SUCCESS",
      payload: arrey,
      loading: false,
    })
  } catch {}
}

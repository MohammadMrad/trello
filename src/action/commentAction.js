import axios from "axios"

export const commentAction = () => async (dispatch) => {
  try {
    // dispatch({ type: "SENDING-COMMENT-REQUEST", loading: true })

    const comment = localStorage.getItem("comment")
      ? JSON.parse(localStorage.getItem("comment"))
      : []

    let arrey = []

    for (const item in comment) {
      arrey.push({
        comment: comment[item].comment,
        cardId: comment[item].cardId,
      })
    }

    dispatch({
      type: "FETCH-COMMENT-DATA-SUCCESS",
      payload: arrey,
      loading: false,
    })

    if (navigator.onLine) {
      const response = await axios.delete(
        "https://trello-d791c-default-rtdb.firebaseio.com/comment.json"
      )
      const data = await response.data
      //  console.log(data)

      for (const item in comment) {
        const response = await axios.post(
          "https://trello-d791c-default-rtdb.firebaseio.com/comment.json",
          {
            comment: comment[item].comment,
            cardId: comment[item].cardId,
          }
        )

        const data = await response.data
        // console.log(data)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

import axios from "axios"

export const commentAction = () => async (dispatch) => {
  try {
    // dispatch({ type: "SENDING-COMMENT-REQUEST", loading: true })
    const user = JSON.parse(localStorage.getItem("user"))

    if (localStorage.getItem("comment") === null) {
      const response = await axios.get(
        "https://trello-d791c-default-rtdb.firebaseio.com/comment.json"
      )

      const data = await response.data
      // console.log(data)

      let arrey = []

      for (const item in data) {
        arrey.push({
          comment: data[item].comment,
          cardId: data[item].cardId,
        })
      }

      localStorage.setItem("comment", JSON.stringify([...arrey]))

      dispatch({
        type: "FETCH-COMMENT-DATA-SUCCESS",
        payload: arrey,
        loading: false,
      })
    } else {
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
    }

    if (navigator.onLine) {
      const GETresponse = await axios.get(
        `https://trello-d791c-default-rtdb.firebaseio.com/comment.json`
      )

      const GETdata = (await GETresponse.data) ? await GETresponse.data : []

      const Comments = Object.values(GETdata)

      const otherUsersComment = Comments.filter((item) => {
        return item.userId !== user
      })

      const currentUserComments = localStorage.getItem("comment")
        ? JSON.parse(localStorage.getItem("comment"))
        : []

      const allComments = []

      otherUsersComment.map((item) => {
        allComments.push({
          comment: item.comment,
          cardId: item.cardId,
        })
      })

      currentUserComments.map((item) => {
        allComments.push({
          comment: item.comment,
          cardId: item.cardId,
        })
      })

      const response = await axios.delete(
        "https://trello-d791c-default-rtdb.firebaseio.com/comment.json"
      )
      // const data = await response.data
      // console.log(data)

      for (const item in allComments) {
        const response = await axios.post(
          "https://trello-d791c-default-rtdb.firebaseio.com/comment.json",
          {
            comment: allComments[item].comment,
            cardId: allComments[item].cardId,
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

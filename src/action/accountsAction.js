import axios from "axios"

export const accountsAction = (boardTitle, userId) => async (dispatch) => {
  try {
    dispatch({ type: "SENDING-ACCOUNT-REQUEST", loading: true })

    const response = await axios.get(
      "https://trello-d791c-default-rtdb.firebaseio.com/accounts.json"
    )
    const data = await response.data

    let arrey = []

    for (const item in data) {
      arrey.push({
        boardId: data[item].boardId,
        userId: data[item].userId,
        user: data[item].user,
        password: data[item].password,
      })
    }

    dispatch({
      type: "FETCH-ACCOUNT-DATA-SUCCESS",
      payload: arrey,
      loading: false,

      // if(boardTitle) {
      //   axios.delete(
      //     "https://trello-d791c-default-rtdb.firebaseio.com/accounts.json"
      //   )

      //   let t = []

      //   arrey.forEach((item) => {
      //     if (userId === item.userId) {

      //     }
      //   })
      // },
    })
  } catch (error) {
    console.log(error)
  }
}

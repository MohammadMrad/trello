import axios from "axios"

export const accountsAction = () => async (dispatch) => {
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
    })
  } catch (error) {
    console.log(error)
  }
}

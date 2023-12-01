import axios from "axios"

export const accountsListAction = () => async (dispatch) => {
  try {
    dispatch({ type: "SENDING-ACCOUNT-REQUEST", loading: true })

    const response = await axios.get(
      "https://trello-d791c-default-rtdb.firebaseio.com/accounts.json"
    )
    const data = await response.data

    let arrey = []

    for (const item in data) {
      arrey.push({
        id: data[item].id,
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

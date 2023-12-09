import axios from "axios"

export const listsNameAction = () => async (dispatch) => {
  try {
    dispatch({ type: "SENDING-LISTN-REQUEST", loading: true })
    const response = await axios.get(
      `https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`
    )

    const data = await response.data

    const arrey = []

    console.log(data)

    for (const item in data) {
      arrey.push({
        list: data[item].list,
      })
    }

    dispatch({
      type: "FETCH-LISTN-DATA-SUCCESS",
      payload: arrey,
      loading: false,
    })
  } catch (error) {
    console.log(error)
  }
}

import axios from "axios"
import { useSelector } from "react-redux"

export const cardsNameAction = (type) => async (dispatch) => {
  try {
    dispatch({ type: "SENDING-CARD-REQUEST", loading: true })

    const response = await axios.get(
      "https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json"
    )

    const data = await response.data

    const arrey = []

    for (const item in data) {
      arrey.push({
        card: data[item].card,
        id: data[item].id,
        listId: data[item].listId,
      })
    }

    dispatch({
      type: "FETCH-CARD-DATA-SUCCESS",
      payload: arrey,
      loading: false,
    })
  } catch (error) {
    console.log(error)
  }
}

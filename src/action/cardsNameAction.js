import axios from "axios"
import { useSelector } from "react-redux"

export const cardsNameAction = () => async (dispatch) => {
  try {
    // dispatch({ type: "SENDING-CARD-REQUEST", loading: true })

    const cards = localStorage.getItem("cards")
      ? JSON.parse(localStorage.getItem("cards"))
      : []

    const arrey = []

    for (const item in cards) {
      arrey.push({
        card: cards[item].card,
        listId: cards[item].listId,
        cardId: cards[item].cardId,
        userId: cards[item].userId,
      })
    }

    dispatch({
      type: "FETCH-CARD-DATA-SUCCESS",
      payload: arrey,
      loading: false,
    })

    if (navigator.onLine) {
      const response = await axios.delete(
        "https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json"
      )
      const data = await response.data
      // console.log(data)

      for (const item in cards) {
        const response = await axios.post(
          "https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json",
          {
            card: cards[item].card,
            listId: cards[item].listId,
            cardId: cards[item].cardId,
            userId: cards[item].userId,
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

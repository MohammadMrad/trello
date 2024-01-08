import axios from "axios"

export const cardsNameAction = (cardIdDelete) => async (dispatch) => {
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
        creationTime: cards[item].creationTime,
      })
    }

    dispatch({
      type: "FETCH-CARD-DATA-SUCCESS",
      payload: arrey,
      loading: false,
    })

    if (cardIdDelete) {
      const updatedCards = cards.filter((item) => item.cardId !== cardIdDelete)

      console.log(updatedCards)
      localStorage.setItem("cards", JSON.stringify(updatedCards))

      dispatch({
        type: "DELETE-CARD",
        payload: cardIdDelete,
        loading: false,
      })
    }

    if (navigator.onLine) {
      const response = await axios.delete(
        "https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json"
      )
      // const data = await response.data
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
        // const data = await response.data
        // console.log(data)
      }

      dispatch({
        type: "FETCH-CARD-DATA-SUCCESS",
        payload: cards,
        loading: false,
      })
    }

    if (cardIdDelete) {
      if (navigator.onLine) {
        const response = await axios.delete(
          "https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json"
        )
        // const data = await response.data
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
          // const data = await response.data
          // console.log(data)
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

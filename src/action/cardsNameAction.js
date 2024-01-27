import axios from "axios"

export const cardsNameAction =
  (cardIdDelete, debounce, reName, event, cartId) =>
  async (dispatch, getState) => {
    try {
      // dispatch({ type: "SENDING-CARD-REQUEST", loading: true })
      const user = JSON.parse(localStorage.getItem("user"))

      if (localStorage.getItem("cards") === null) {
        const user = JSON.parse(localStorage.getItem("user"))

        const response = await axios.get(
          "https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json"
        )

        const data = await response.data
        // console.log(data)

        let arrey = []

        for (const item in data) {
          if (data[item].userId === user) {
            arrey.push({
              card: data[item].card,
              listId: data[item].listId,
              cardId: data[item].cardId,
              userId: data[item].userId,
              creationTime: data[item].creationTime,
            })
          }
        }

        localStorage.setItem("cards", JSON.stringify([...arrey]))

        dispatch({
          type: "FETCH-CARD-DATA-SUCCESS",
          payload: arrey,
          loading: false,
        })
      } else if (reName === false) {
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
          const updatedCards = cards.filter(
            (item) => item.cardId !== cardIdDelete
          )

          localStorage.setItem("cards", JSON.stringify(updatedCards))

          dispatch({
            type: "DELETE-CARD",
            payload: cardIdDelete,
            loading: false,
          })
        }
      } else if (reName === true) {
        const currentState = getState()
        const { cardsName } = currentState.cardsName

        const currentCard = cardsName.filter((item) => {
          return item.cardId === cartId
        })

        const CardsExceptCurrentCard = cardsName.filter((item) => {
          return item.cardId !== cartId
        })

        localStorage.setItem(
          "cards",
          JSON.stringify([
            ...CardsExceptCurrentCard,
            {
              card: event.target.value,
              listId: currentCard[0].listId,
              cardId: currentCard[0].cardId,
              userId: currentCard[0].userId,
              creationTime: currentCard[0].creationTime,
            },
          ])
        )

        const cards = localStorage.getItem("cards")
          ? JSON.parse(localStorage.getItem("cards"))
          : []

        dispatch({
          type: "FETCH-CARD-DATA-SUCCESS",
          payload: cards,
          loading: false,
        })
      }

      if (navigator.onLine && debounce === true) {
        const GETresponse = await axios.get(
          `https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json`
        )

        const GETdata = (await GETresponse.data) ? await GETresponse.data : []

        const cards = Object.values(GETdata)

        const otherUsersCards = cards.filter((item) => {
          return item.userId !== user
        })

        const currentUsercards = localStorage.getItem("cards")
          ? JSON.parse(localStorage.getItem("cards"))
          : []

        let allCards = []

        otherUsersCards.map((item) => {
          allCards.push({
            card: item.card,
            listId: item.listId,
            cardId: item.cardId,
            userId: item.userId,
            creationTime: item.creationTime,
          })
        })

        currentUsercards.map((item) => {
          allCards.push({
            card: item.card,
            listId: item.listId,
            cardId: item.cardId,
            userId: item.userId,
            creationTime: item.creationTime,
          })
        })

        const response = await axios.delete(
          "https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json"
        )
        // const data = await response.data
        // console.log(data)

        for (const item in allCards) {
          const response = await axios.post(
            "https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json",
            {
              card: allCards[item].card,
              listId: allCards[item].listId,
              cardId: allCards[item].cardId,
              userId: allCards[item].userId,
              creationTime: allCards[item].creationTime,
            }
          )
          // const data = await response.data
          // console.log(data)
        }
      }

      // if (cardIdDelete) {
      //   if (navigator.onLine) {
      //     const response = await axios.delete(
      //       "https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json"
      //     )
      //     // const data = await response.data
      //     // console.log(data)

      //     for (const item in cards) {
      //       const response = await axios.post(
      //         "https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json",
      //         {
      //           card: cards[item].card,
      //           listId: cards[item].listId,
      //           cardId: cards[item].cardId,
      //           userId: cards[item].userId,
      //         }
      //       )
      //       // const data = await response.data
      //       // console.log(data)
      //     }
      //   }
      // }
    } catch (error) {
      console.log(error)
    }
  }

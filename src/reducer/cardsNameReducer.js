import update from "immutability-helper"

export const cardsNameReducer = (state = { cardsName: [] }, action) => {
  switch (action.type) {
    case "SENDING-CARD-REQUEST":
      return {
        ...state,
        loader: action.loading,
      }
    case "FETCH-CARD-DATA-SUCCESS":
      return {
        ...state,
        cardsName: action.payload,
        loader: action.loading,
      }
    case "DELETE-CARD":
      return {
        ...state,
        cardsName: state.cardsName.filter(
          (item) => item.cardId !== action.payload
        ),
        loader: action.loading,
      }

    default:
      return state
  }
}

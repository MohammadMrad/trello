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
    default:
      return state
  }
}

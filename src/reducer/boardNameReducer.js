export const boardNameReducer = (state = { boardName: [] }, action) => {
  switch (action.type) {
    case "SENDING-BOARD-REQUEST":
      return {
        ...state,
        loader: action.loading,
      }
    case "FETCH-BOARD-DATA-SUCCESS":
      return {
        ...state,
        boardName: action.payload,
        loader: action.loading,
      }
    default:
      return state
  }
}

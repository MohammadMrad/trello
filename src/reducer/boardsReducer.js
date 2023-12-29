export const boardsReducer = (state = { boards: [] }, action) => {
  switch (action.type) {
    case "SENDING-BOARD-REQUEST":
      return {
        ...state,
        loader: action.loading,
      }
    case "SENDING-BOARD-DATA-SUCCESS":
      return {
        ...state,
        boardName: action.payload,
        loader: action.loading,
      }
    default:
      return state
  }
}

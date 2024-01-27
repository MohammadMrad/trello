export const boardNameReducer = (state = { boardName: [] }, action) => {
  switch (action.type) {
    case "SENDING-BOARD-NAME-REQUEST":
      return {
        ...state,
        loader: action.loading,
      }
    case "FETCH-BOARD-NAME-DATA-SUCCESS":
      return {
        ...state,
        boardName: action.payload,
        loader: action.loading,
      }
    default:
      return state
  }
}

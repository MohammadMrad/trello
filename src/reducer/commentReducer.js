export const commentReducer = (state = { comment: [] }, action) => {
  switch (action.type) {
    case "SENDING-COMMENT-REQUEST":
      return {
        ...state,
        loader: action.loading,
      }
    case "FETCH-COMMENT-DATA-SUCCESS":
      return {
        ...state,
        comment: action.payload,
        loader: action.loading,
      }
    default:
      return state
  }
}

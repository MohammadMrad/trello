export const accountsListReducer = (state = { accountsList: [] }, action) => {
  switch (action.type) {
    case "SENDING-ACCOUNT-REQUEST":
      return {
        ...state,
        loader: action.loading,
      }
    case "FETCH-ACCOUNT-DATA-SUCCESS":
      return {
        ...state,
        accountsList: action.payload,
        loader: action.loading,
      }
    default:
      return state
  }
}

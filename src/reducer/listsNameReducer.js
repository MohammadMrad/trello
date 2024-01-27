export const listsNameReducer = (state = { listsName: [] }, action) => {
  switch (action.type) {
    case "SENDING-LISTN-REQUEST":
      return {
        ...state,
        loader: action.loading,
      }
    case "FETCH-LISTN-DATA-SUCCESS":
      return {
        ...state,
        listsName: action.payload,
        loader: action.loading,
      }
    case "DELETE-DATA":
      return {
        ...state,
        listsName: state.listsName.filter(
          (item) => item.listId !== action.payload
        ),
        loader: action.loading,
      }
    case "SEARCH-LISTS":
      // if (action.payload) {
      return {
        ...state,
        searchItem: action.payload,
        listsName: state.listsName.filter((item) => {
          if (action.payload !== undefined) {
            return item.list.trim().toLowerCase().includes(action.payload)
          } else {
            return state.listsName
          }
        }),
        // }
      }

    default:
      return state
  }
}

export const listReducer = (state = { list: [] }, action) => {
  switch (action.type) {
    case "append":
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}

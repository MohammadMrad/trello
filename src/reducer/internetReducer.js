export const internetReducer = (
  state = { online: navigator.onLine },
  action
) => {
  switch (action.type) {
    case "CHECKING-INTERNET":
      return {
        ...state,
        online: action.payload,
      }
    default:
      return state
  }
}

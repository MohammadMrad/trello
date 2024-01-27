export const internetAction = (online) => async (dispatch) => {
  try {
    dispatch({ type: "CHECKING-INTERNET", payload: online })
  } catch (error) {
    console.log(error)
  }
}

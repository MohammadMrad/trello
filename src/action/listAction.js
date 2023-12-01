import axios from "axios"

export const listAction = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "https://trello-d791c-default-rtdb.firebaseio.com/list.json"
    )
    const data = await response.data

    const array = []

    for (const item in data) {
      array.push({
        list: data[item].list,
      })
    }

    dispatch({ type: "append", payload: array })
  } catch (error) {
    console.log(error)
  }
}

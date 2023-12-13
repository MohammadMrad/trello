import axios from "axios"

export const listsNameAction = (listIdDelete) => async (dispatch) => {
  try {
    dispatch({ type: "SENDING-LISTN-REQUEST", loading: true })
    const response = await axios.get(
      `https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`
    )

    const data = await response.data

    const arrey = []

    // console.log(data)

    for (const item in data) {
      arrey.push({
        list: data[item].list,
        listId: data[item].listId,
      })
    }

    dispatch({
      type: "FETCH-LISTN-DATA-SUCCESS",
      payload: arrey,
      loading: false,
    })

    if (listIdDelete) {
      axios.delete(
        `https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`
      )

      const t = arrey.filter((item) => {
        return item.listId !== listIdDelete
      })

      t.map((item) => {
        axios
          .post(
            `https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`,
            {
              list: item.list,
              listId: item.listId,
            }
          )
          .then((response) => {
            // console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      })
    }

    dispatch({
      type: "DELETE-DATA",
      payload: listIdDelete,
      loading: false,
    })
  } catch (error) {
    console.log(error)
  }
}

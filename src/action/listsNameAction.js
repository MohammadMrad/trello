import axios from "axios"

export const listsNameAction =
  (listIdDelete, listNameToFilter) => async (dispatch) => {
    try {
      // dispatch({ type: "SENDING-LISTN-REQUEST", loading: true })

      const lists = localStorage.getItem("lists")
        ? JSON.parse(localStorage.getItem("lists"))
        : []

      const arrey = []

      for (const item in lists) {
        console.log(lists[item].creationTime)
        arrey.push({
          list: lists[item].list,
          listId: lists[item].listId,
          userId: lists[item].userId,
          boardId: lists[item].boardId,
          creationTime: lists[item].creationTime,
        })
      }

      dispatch({
        type: "FETCH-LISTN-DATA-SUCCESS",
        payload: arrey,
        loading: false,
      })

      if (listIdDelete) {
        const updatedLists = arrey.filter((item) => {
          return item.listId !== listIdDelete
        })

        localStorage.setItem("lists", JSON.stringify(updatedLists))

        dispatch({
          type: "DELETE-DATA",
          payload: listIdDelete,
          loading: false,
        })
      }

      if (listNameToFilter) {
        dispatch({
          type: "SEARCH-LISTS",
          payload: listNameToFilter,
        })
      }

      if (navigator.onLine) {
        const response = await axios.delete(
          `https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`
        )
        // const data = await response.data
        // console.log(data);

        for (const item in lists) {
          const response = await axios.post(
            `https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`,
            {
              list: lists[item].list,
              listId: lists[item].listId,
              userId: lists[item].userId,
              boardId: lists[item].boardId,
            }
          )

          // const data = await response.data
          // console.log(data)
        }
      }

      if (listIdDelete) {
        if (navigator.onLine) {
          const response = await axios.delete(
            `https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`
          )
          // const data = await response.data
          // console.log(data)

          for (const item in lists) {
            const response = await axios.post(
              `https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`,
              {
                list: lists[item].list,
                listId: lists[item].listId,
                userId: lists[item].userId,
                boardId: lists[item].boardId,
              }
            )
            // const data = await response.data
            // console.log(data)
          }
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

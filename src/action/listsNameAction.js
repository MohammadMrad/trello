import axios from "axios"

export const listsNameAction =
  (listIdDelete, listNameToFilter, debounce, reName, event, listId) =>
  async (dispatch, getState) => {
    try {
      // dispatch({ type: "SENDING-LISTN-REQUEST", loading: true })
      const user = JSON.parse(localStorage.getItem("user"))

      if (localStorage.getItem("lists") === null) {
        const user = JSON.parse(localStorage.getItem("user"))

        const response = await axios.get(
          "https://trello-d791c-default-rtdb.firebaseio.com/listsName.json"
        )

        const data = await response.data
        // console.log(data)

        let arrey = []

        for (const item in data) {
          if (data[item].userId === user) {
            arrey.push({
              list: data[item].list,
              listId: data[item].listId,
              userId: data[item].userId,
              boardId: data[item].boardId,
              creationTime: data[item].creationTime,
            })
          }
        }

        localStorage.setItem("lists", JSON.stringify([...arrey]))

        dispatch({
          type: "FETCH-LISTN-DATA-SUCCESS",
          payload: arrey,
          loading: false,
        })
      } else if (reName === false) {
        const lists = localStorage.getItem("lists")
          ? JSON.parse(localStorage.getItem("lists"))
          : []

        const arrey = []

        for (const item in lists) {
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
      } else if (reName === true) {
        const currentState = getState()
        const { listsName } = currentState.listsName

        const currentList = listsName.filter((item) => {
          return item.listId === listId
        })

        const ListsExceptCurrentList = listsName.filter((item) => {
          return item.listId !== listId
        })

        localStorage.setItem(
          "lists",
          JSON.stringify([
            ...ListsExceptCurrentList,
            {
              list: event.target.value,
              listId: currentList[0].listId,
              userId: currentList[0].userId,
              boardId: currentList[0].boardId,
              creationTime: currentList[0].creationTime,
            },
          ])
        )

        const lists = localStorage.getItem("lists")
          ? JSON.parse(localStorage.getItem("lists"))
          : []

        lists.sort((firstCart, secondCart) => {
          if (firstCart.creationTime > secondCart.creationTime) {
            return 1
          } else if (firstCart.creationTime < secondCart.creationTime) {
            return -1
          } else {
            return 0
          }
        })

        dispatch({
          type: "FETCH-LISTN-DATA-SUCCESS",
          payload: lists,
          loading: false,
        })
      }

      dispatch({
        type: "SEARCH-LISTS",
        payload: listNameToFilter,
      })

      if (listIdDelete) {
        const lists = localStorage.getItem("lists")
          ? JSON.parse(localStorage.getItem("lists"))
          : []

        const arrey = []

        for (const item in lists) {
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

      if (
        navigator.onLine &&
        listNameToFilter === undefined &&
        debounce === true
      ) {
        const GETresponse = await axios.get(
          `https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`
        )

        const GETdata = (await GETresponse.data) ? await GETresponse.data : []

        const lists = Object.values(GETdata)

        const otherUsersLists = lists.filter((item) => {
          return item.userId !== user
        })

        const currentUserlists = localStorage.getItem("lists")
          ? JSON.parse(localStorage.getItem("lists"))
          : []

        let allLists = []

        otherUsersLists.map((item) => {
          allLists.push({
            list: item.list,
            listId: item.listId,
            userId: item.userId,
            boardId: item.boardId,
            creationTime: item.creationTime,
          })
        })

        currentUserlists.map((item) => {
          allLists.push({
            list: item.list,
            listId: item.listId,
            userId: item.userId,
            boardId: item.boardId,
            creationTime: item.creationTime,
          })
        })

        const response = await axios.delete(
          `https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`
        )
        // const data = await response.data
        // console.log(data);

        for (const item in allLists) {
          const response = await axios.post(
            `https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`,
            {
              list: allLists[item].list,
              listId: allLists[item].listId,
              userId: allLists[item].userId,
              boardId: allLists[item].boardId,
              creationTime: allLists[item].creationTime,
            }
          )

          // const data = await response.data
          // console.log(data)
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

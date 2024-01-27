import axios from "axios"

export const boardNameAction =
  (debounce, reName, event) => async (dispatch, getState) => {
    try {
      // dispatch({ type: "SENDING-BOARD-NAME-REQUEST", loading: true })
      const user = JSON.parse(localStorage.getItem("user"))

      if (localStorage.getItem("boards") === null) {
        const response = await axios.get(
          "https://trello-d791c-default-rtdb.firebaseio.com/boardName.json"
        )

        const data = await response.data
        // console.log(data)

        let arrey = []

        console.log(data)

        for (const item in data) {
          console.log("1")
          if (data[item].userId === user) {
            console.log("2")
            arrey.push({
              boardName: data[item].boardName,
              boardId: data[item].boardId,
              userId: data[item].userId,
              creationTime: data[item].creationTime,
            })
          }
        }

        localStorage.setItem("boards", JSON.stringify(arrey))

        dispatch({
          type: "FETCH-BOARD-NAME-DATA-SUCCESS",
          payload: arrey,
          loading: false,
        })
      } else if (reName === false) {
        const boards = localStorage.getItem("boards")
          ? JSON.parse(localStorage.getItem("boards"))
          : []

        let arrey = []

        for (const item in boards) {
          arrey.push({
            boardName: boards[item].boardName,
            boardId: boards[item].boardId,
            userId: boards[item].userId,
            creationTime: boards[item].creationTime,
          })
        }

        dispatch({
          type: "FETCH-BOARD-NAME-DATA-SUCCESS",
          payload: arrey,
          loading: false,
        })
      } else if (reName === true) {
        const currentState = getState()
        const { boardName } = currentState.boardName

        const currentBoard = JSON.parse(localStorage.getItem("currentBoard"))

        const boardsExceptCurrentboard = boardName.filter((item) => {
          return item.boardId !== currentBoard[0].boardId
        })

        localStorage.setItem(
          "boards",
          JSON.stringify([
            ...boardsExceptCurrentboard,
            {
              boardId: currentBoard[0].boardId,
              boardName: event.target.value,
              userId: currentBoard[0].userId,
              creationTime: currentBoard[0].creationTime,
            },
          ])
        )

        const boards = localStorage.getItem("boards")
          ? JSON.parse(localStorage.getItem("boards"))
          : []

        dispatch({
          type: "FETCH-BOARD-NAME-DATA-SUCCESS",
          payload: boards,
          loading: false,
        })
      }

      if (navigator.onLine && debounce === true) {
        const GETresponse = await axios.get(
          "https://trello-d791c-default-rtdb.firebaseio.com/boardName.json"
        )
        const GETdata = (await GETresponse.data) ? await GETresponse.data : []

        const boards = Object.values(GETdata)

        const otherUsersBoards = boards.filter((item) => {
          return item.userId !== user
        })

        const currentUserBoards = localStorage.getItem("boards")
          ? JSON.parse(localStorage.getItem("boards"))
          : []

        let allBoards = []

        otherUsersBoards.map((item) => {
          allBoards.push({
            boardName: item.boardName,
            boardId: item.boardId,
            userId: item.userId,
            creationTime: item.creationTime,
          })
        })

        currentUserBoards.map((item) => {
          allBoards.push({
            boardName: item.boardName,
            boardId: item.boardId,
            userId: item.userId,
            creationTime: item.creationTime,
          })
        })

        const response = await axios.delete(
          "https://trello-d791c-default-rtdb.firebaseio.com/boardName.json"
        )
        // const data = await response.data
        // console.log(data)

        for (const item in allBoards) {
          const response = await axios.post(
            "https://trello-d791c-default-rtdb.firebaseio.com/boardName.json",
            {
              boardName: allBoards[item].boardName,
              boardId: allBoards[item].boardId,
              userId: allBoards[item].userId,
              creationTime: allBoards[item].creationTime,
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

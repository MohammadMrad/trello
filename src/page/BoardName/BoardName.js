import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { boardNameAction } from "../../action/boardNameAction"
import Header from "../../components/Header/Header"
import SmallPage from "../../components/SmallPage/SmallPage"
import "./BoardName.css"
import Loader from "../../components/Loader/Loader"
import InternetChecker from "../../components/InternetChecker/InternetChecker"

const BoardName = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const state = useSelector((state) => state.boardName)
  const { loader, boardName } = state

  useEffect(() => {
    if (!loader && boardName.length !== 0) {
      navigate("/signUp/listsName")
    }
  })

  const handleBoardName = (event) => {
    event.preventDefault()

    const userId = JSON.parse(localStorage.getItem("user"))

    const boardId = JSON.parse(localStorage.getItem("boardsId"))

    const boards = localStorage.getItem("boards")
      ? JSON.parse(localStorage.getItem("boards"))
      : []

    localStorage.setItem(
      "boards",
      JSON.stringify([
        ...boards,
        {
          boardId: boardId,
          boardName: event.target.boardName.value,
          userId: userId,
          creationTime: new Date().getTime(),
        },
      ])
    )
    dispatch(boardNameAction(true, false, null))

    navigate("/signUp/listsName")
  }

  return loader ? (
    <Loader />
  ) : (
    <div className="Board-name">
      <InternetChecker />
      <div>
        <Header />
      </div>
      <main className="board-name__container">
        <div className="board-name__description">
          <h1>It all starts with the board</h1>
          <p>
            A board is where work happens in Trello. You'll find your cards,
            lists, due dates, and more to keep you organized and on track.
          </p>
          <form
            className="board-name__form"
            onSubmit={(event) => handleBoardName(event)}
          >
            <label htmlFor="">Enter a board name</label>
            <div className="board-name__input-btn-container">
              <input
                type="text"
                name="boardName"
                placeholder="e.g., My Trello board"
                className="board-name__input"
                // value={boardName}
              />
              <button type="submit" className="board-name__submit-btn">
                Next
              </button>
            </div>
          </form>
        </div>
        <div style={{ margin: "0 10%" }}>
          <SmallPage />
        </div>
      </main>
    </div>
  )
}

export default BoardName

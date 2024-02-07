import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { boardNameAction } from "../../action/boardNameAction"
import Header from "../../components/Header/Header"
import SmallPage from "../../components/SmallPage/SmallPage"
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
    <div>
      <InternetChecker />

      <Header />

      <main className="flex items-center flex-col justify-around *:mx-12 text-center mt-10 lg:text-start lg:flex-row lg:mt-0">
        <section className="*:my-4">
          <h1 className="text-3xl">It all starts with the board</h1>
          <p className="font-['Shabnam-Thin'] font-bold">
            A board is where work happens in Trello. You'll find your cards,
            lists, due dates, and more to keep you organized and on track.
          </p>
          <form
            className="flex flex-col items-center lg:items-start"
            onSubmit={(event) => handleBoardName(event)}
          >
            <label className="text-sm invisible lg:visible">
              Enter a board name
            </label>
            <div className="flex">
              <input
                type="text"
                name="boardName"
                placeholder="e.g., My Trello board"
                className="font-['Shabnam-Thin'] p-2 w-72 font-bold border-2 border-solid border-border-color bg-bg-input rounded outline-outline text-sm mr-4"
                // value={boardName}
              />
              <button
                type="submit"
                className="py-2 px-4 bg-bg-btn rounded text-white hover:bg-btn-hover"
              >
                Next
              </button>
            </div>
          </form>
        </section>
        <section>
          <SmallPage />
        </section>
      </main>
    </div>
  )
}

export default BoardName

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { listsNameAction } from "../../action/listsNameAction"
import Header from "../../components/Header/Header"
import SmallPage from "../../components/SmallPage/SmallPage"
import Loader from "../../components/Loader/Loader"
import uuid from "react-uuid"
import InternetChecker from "../../components/InternetChecker/InternetChecker"

const ListsName = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const state = useSelector((state) => state.listsName)
  const { loader, listsName } = state

  useEffect(() => {
    if (!loader && listsName.length !== 0) {
      navigate("/signUp/CartName")
    }
  })

  const handleSubmitBtn = (event) => {
    event.preventDefault()

    const userId = JSON.parse(localStorage.getItem("user"))

    localStorage.setItem("firstListId", JSON.stringify(uuid()))
    const firstListId = JSON.parse(localStorage.getItem("firstListId"))

    const boardId = JSON.parse(localStorage.getItem("boardsId"))

    const lists = localStorage.getItem("lists")
      ? JSON.parse(localStorage.getItem("lists"))
      : []

    localStorage.setItem(
      "lists",
      JSON.stringify([
        ...lists,
        {
          list: event.target.listOne.value,
          listId: firstListId,
          userId: userId,
          boardId: boardId,
          creationTime: new Date().getTime() + 1,
        },
        {
          list: event.target.listTwo.value,
          listId: uuid(),
          userId: userId,
          boardId: boardId,
          creationTime: new Date().getTime() + 2,
        },
        {
          list: event.target.listThree.value,
          listId: uuid(),
          userId: userId,
          boardId: boardId,
          creationTime: new Date().getTime() + 3,
        },
      ])
    )
    dispatch(listsNameAction(null, undefined, true, false, null))

    navigate("/signUp/CartName")
  }
  return loader ? (
    <Loader />
  ) : (
    <div>
      <InternetChecker />

      <Header />

      <main className="flex items-center  justify-around mx-12 flex-col text-center  xl:flex-row">
        <section className="*:my-3 max-w-prose mt-20 xl:mt-0 xl:text-start">
          <h1 className="text-3xl">Now organize your board with lists</h1>
          <p className="font-['Shabnam-Thin'] font-bold ">
            A list is a bundle of cards that repeesent milestones.a see of
            ideas, or team goals, Customize your lists and add as many as you'd
            like
          </p>
          <h3>A lot of people start with:</h3>
          <form
            className="flex flex-col *:my-2 items-center xl:items-start "
            onSubmit={(event) => handleSubmitBtn(event)}
          >
            <label className="!mb-1 text-sm">Name your lists</label>
            <input
              type="text"
              name="listOne"
              placeholder="e.g., To do"
              className="font-['Shabnam-Thin'] p-2 w-72 font-bold border-2 border-solid border-border-color bg-bg-input rounded outline-outline text-sm"
            />
            <input
              type="text"
              name="listTwo"
              placeholder="e.g., Doing"
              className="font-['Shabnam-Thin'] p-2 w-72 font-bold border-2 border-solid border-border-color bg-bg-input rounded outline-outline text-sm"
            />
            <input
              type="text"
              name="listThree"
              placeholder="e.g., Done"
              className="font-['Shabnam-Thin'] p-2 w-72 font-bold border-2 border-solid border-border-color bg-bg-input rounded outline-outline text-sm"
            />
            <button
              type="submit"
              className="py-2 px-4 mt-4  text-sm bg-bg-btn rounded text-white hover:bg-btn-hover"
            >
              Next
            </button>
          </form>
        </section>
        <section>
          <SmallPage />
        </section>
      </main>
    </div>
  )
}

export default ListsName

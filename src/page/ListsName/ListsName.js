import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { listsNameAction } from "../../action/listsNameAction"
import Header from "../../components/Header/Header"
import SmallPage from "../../components/SmallPage/SmallPage"
import "./ListsName.css"
import Loader from "../../components/Loader/Loader"
import uuid from "react-uuid"

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

    // axios
    //   .post(`https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`, {
    //     list: event.target.listOne.value,
    //     listId: firstListId,
    //     userId: userId,
    //     boardId: boardId,
    //   })
    //   .then((response) => {
    //     // console.log(response)
    //     dispatch(listsNameAction())
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    // axios
    //   .post(`https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`, {
    //     list: event.target.listTwo.value,
    //     listId: uuid(),
    //     userId: userId,
    //     boardId: boardId,
    //   })
    //   .then((response) => {
    //     // console.log(response)
    //     dispatch(listsNameAction())
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    // axios
    //   .post(`https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`, {
    //     list: event.target.listThree.value,
    //     listId: uuid(),
    //     userId: userId,
    //     boardId: boardId,
    //   })
    //   .then((response) => {
    //     // console.log(response)
    //     dispatch(listsNameAction())
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

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
    dispatch(listsNameAction())

    navigate("/signUp/CartName")
  }
  return loader ? (
    <Loader />
  ) : (
    <div className="lists-name">
      <div>
        <Header />
      </div>
      <main className="lists-name__container">
        <div className="lists-name__description">
          <h1>Now organize your board with lists</h1>
          <p>
            A list is a bundle of cards that repeesent milestones.a see of
            ideas, or team goals, Customize your lists and add as many as you'd
            like
          </p>
          <h3>A lot of people start with:</h3>
          <form
            className="lists-name__form"
            onSubmit={(event) => handleSubmitBtn(event)}
          >
            <label>Name your lists</label>
            <input
              type="text"
              name="listOne"
              placeholder="e.g., To do"
              className="lists-name__input"
              // onChange={(event) => handleListNameOne(event)}
            />
            <input
              type="text"
              name="listTwo"
              placeholder="e.g., Doing"
              className="lists-name__input"
              // onChange={(event) => handleListNameTwo(event)}
            />
            <input
              type="text"
              name="listThree"
              placeholder="e.g., Done"
              className="lists-name__input"
              // onChange={(event) => handleListNameThree(event)}
            />
            <button type="submit" className="lists-name__submit-btn">
              Next
            </button>
          </form>
        </div>
        <div>
          <SmallPage />
        </div>
      </main>
    </div>
  )
}

export default ListsName

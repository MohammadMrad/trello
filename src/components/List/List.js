import React, { useState } from "react"
import "./List.css"
import Card from "../Card/Card"
import { useDispatch, useSelector } from "react-redux"
import { listsNameAction } from "../../action/listsNameAction"
import { cardsNameAction } from "../../action/cardsNameAction"
import uuid from "react-uuid"

const List = ({ list }) => {
  const dispatch = useDispatch()

  const [addACartBtnClicked, setAddACartBtnClicked] = useState(false)

  const listNameState = useSelector((state) => state.listsName)
  const { listsName } = listNameState

  const cardsState = useSelector((state) => state.cardsName)
  const { cardsName } = cardsState

  const cardss = cardsName.filter((item) => {
    return item.listId === list.listId
  })

  cardss.sort((firstCart, secondCart) => {
    if (firstCart.creationTime > secondCart.creationTime) {
      return 1
    } else if (firstCart.creationTime < secondCart.creationTime) {
      return -1
    } else {
      return 0
    }
  })

  let addACartBtn = (
    <button
      type="submit"
      className="addACartBtnNotClicked"
      onClick={() => setAddACartBtnClicked(true)}
    >
      <i className="fa fa-plus"></i>
      <span>Add a card</span>
    </button>
  )

  if (addACartBtnClicked) {
    addACartBtn = (
      <form onSubmit={(event) => addCardHandle(event)}>
        <article style={{ display: addACartBtnClicked ? "block" : "none" }}>
          <input
            type="text"
            name="list"
            placeholder="Enter a title for this card…"
            className="card-title-input"
          />
        </article>
        <div style={{ display: "flex" }}>
          <button type="submit" className="addACartBtnClicked">
            <span>Add card</span>
          </button>
          <button
            className="close-add-card"
            onClick={() => setAddACartBtnClicked(false)}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
      </form>
    )
  }

  const addCardHandle = (event) => {
    event.preventDefault()

    const userId = JSON.parse(localStorage.getItem("user"))

    // axios
    //   .post("https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json", {
    //     card: event.target.list.value,
    //     listId: list.listId,
    //     cardId: uuid(),
    //     userId: userId,
    //   })
    //   .then((response) => {
    //     dispatch(cardsNameAction())
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    const cards = localStorage.getItem("cards")
      ? JSON.parse(localStorage.getItem("cards"))
      : []

    localStorage.setItem(
      "cards",
      JSON.stringify([
        ...cards,
        {
          card: event.target.list.value,
          listId: list.listId,
          cardId: uuid(),
          userId: userId,
          creationTime: new Date().getTime(),
        },
      ])
    )
    dispatch(cardsNameAction())
    setAddACartBtnClicked(false)
  }

  const removeListHandle = () => {
    dispatch(listsNameAction(list.listId))
  }

  const handleRenameList = (event) => {
    const listId = list.listId

    const currentList = listsName.filter((item) => {
      return item.listId === listId
    })

    const ListsExceptCurrentList = listsName.filter((item) => {
      return item.listId !== listId
    })

    console.log(currentList[0].creationTime)

    localStorage.setItem(
      "lists",
      JSON.stringify([
        ...ListsExceptCurrentList,
        {
          list: event.target.value,
          listId: currentList[0].listId,
          boardId: currentList[0].boardId,
          userId: currentList[0].userId,
          creationTime: currentList[0].creationTime,
        },
      ])
    )

    dispatch(listsNameAction())
  }

  return (
    <div className="list">
      <section className="list__header">
        <input
          type="text"
          className="list__list-name-input"
          value={list.list}
          onChange={handleRenameList}
        />

        <span className="list__more-icon">
          <i className="fa fa-trash-o" onClick={() => removeListHandle()}></i>
        </span>
      </section>
      <article>
        {cardss.map((item, index) => {
          return <Card card={item} key={index} />
        })}
      </article>

      <div className="list-footer">{addACartBtn}</div>
    </div>
  )
}

export default List

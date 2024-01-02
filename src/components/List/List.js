import React, { useEffect, useRef, useState } from "react"
import "./List.css"
import Card from "../Card/Card"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { listsNameAction } from "../../action/listsNameAction"
import { cardsNameAction } from "../../action/cardsNameAction"
import CartName from "../../page/CartName/CartName"
import uuid from "react-uuid"

const List = ({ list }) => {
  const dispatch = useDispatch()

  const [addACartBtnClicked, setAddACartBtnClicked] = useState(false)

  const listNameState = useSelector((state) => state.listsName)
  const { listsName } = listNameState

  const cardsState = useSelector((state) => state.cardsName)
  const { cardsName } = cardsState

  // const cards = listsName.map((list) => {
  //   const b = cardsName.filter((cart, index) => {
  //     return list.listId === cart.cardId
  //   })
  //   return b
  // })
  // console.log(cards)
  // cards.forEach((item) => {
  //   let m = Object.values(item)
  // })

  // console.log(list)

  const cardss = cardsName.filter((item) => {
    // console.log(item.listId)
    // console.log(list.listId)
    // console.log("mohammad")
    return item.listId === list.listId
  })
  // console.log(cardss)

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
        },
      ])
    )
    dispatch(cardsNameAction())
    setAddACartBtnClicked(false)
  }

  const removeListHandle = () => {
    dispatch(listsNameAction(list.listId))
  }

  return (
    <div className="list">
      <section className="list__header">
        <h2>{list.list}</h2>
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

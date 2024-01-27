import React, { useMemo, useRef, useState } from "react"
import "./List.css"
import Card from "../Card/Card"
import { useDispatch, useSelector } from "react-redux"
import { listsNameAction } from "../../action/listsNameAction"
import { cardsNameAction } from "../../action/cardsNameAction"
import uuid from "react-uuid"

const List = ({ list }) => {
  const dispatch = useDispatch()

  const debounceRef = useRef()

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
    dispatch(cardsNameAction(null, true, false, null, null))
    setAddACartBtnClicked(false)
  }

  const removeListHandle = () => {
    const listID = list.listId
    dispatch(listsNameAction(listID, undefined, true, false, null, listId))
  }

  const listId = list.listId

  const handleDebounceRenameList = (fn, wait) => {
    let inDebounce = null

    return (event) => {
      fn(listsNameAction(null, undefined, false, true, event, listId))

      clearTimeout(inDebounce)

      inDebounce = setTimeout(() => {
        fn(listsNameAction(null, undefined, true, false, null))
      }, wait)
    }
  }

  useMemo(() => {
    debounceRef.current = handleDebounceRenameList(dispatch, 5000)
  }, [debounceRef])

  return (
    <div className="list">
      <section className="list__header">
        <input
          type="text"
          className="list__list-name-input"
          value={list.list}
          onChange={debounceRef.current}
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

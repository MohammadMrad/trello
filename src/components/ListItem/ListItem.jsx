import React, { useMemo, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import CardItem from "../CardItem/CardItem"
import { listsNameAction } from "../../action/listsNameAction"
import { cardsNameAction } from "../../action/cardsNameAction"
import uuid from "react-uuid"
import { useDrag, useDrop } from "react-dnd"

const ListItem = ({ list, moveList }) => {
  const dispatch = useDispatch()

  const debounceRef = useRef()

  const [addACartBtnClicked, setAddACartBtnClicked] = useState(false)

  const cardsState = useSelector((state) => state.cardsName)
  const { cardsName } = cardsState

  const cardss = cardsName.filter((item) => {
    return item.listId === list.listId
  })

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

  let addACartBtn = (
    <button
      type="submit"
      className=" flex bg-slate-200 rounded-md text-sm w-full p-2 hover:bg-slate-300 *:mx-1 mt-4"
      onClick={() => setAddACartBtnClicked(true)}
    >
      <i className="fa fa-plus text-fa-color mx-4"></i>
      <span>Add a card</span>
    </button>
  )

  if (addACartBtnClicked) {
    addACartBtn = (
      <form onSubmit={(event) => addCardHandle(event)} className="w-full">
        <article style={{ display: addACartBtnClicked ? "block" : "none" }}>
          <input
            type="text"
            name="list"
            placeholder="Enter a title for this card…"
            className="font-['Shabnam-Thin'] font-bold text-sm min-h-12 rounded-md w-full my-2 outline-none border-2 border-solid border-bg-btn p-2 pb-8"
          />
        </article>
        <div style={{ display: "flex" }}>
          <button
            type="submit"
            className="py-1 px-4 bg-bg-btn rounded text-white hover:bg-btn-hover text-sm"
          >
            Add card
          </button>
          <button
            className="border-none py-1.5 px-3 rounded ml-2 text-sm bg-gray-300 hover:bg-gray-400"
            onClick={() => setAddACartBtnClicked(false)}
          >
            <i className="fa fa-times text-fa-color"></i>
          </button>
        </div>
      </form>
    )
  }

  const handleDebounceMoveCard = () => {
    let inDebounce = null

    return (draggedCard, hoveredCard) => {
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => {
        dispatch(
          cardsNameAction(
            null,
            true,
            false,
            null,
            null,
            true,
            draggedCard,
            hoveredCard
          )
        )
      }, 500)
    }
  }

  const moveCardRef = useRef()

  useMemo(() => {
    moveCardRef.current = handleDebounceMoveCard()
  }, [])

  const [{ isDragging }, drag] = useDrag({
    type: "list",
    item: list,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [{ HandlerId }, drop] = useDrop({
    accept: "list",
    collect: (monitor) => ({
      HandlerId: monitor.getHandlerId(),
    }),
    hover: (item, monitor) => {
      const draggedList = item
      const hoveredList = list

      moveList(draggedList, hoveredList)
      // item = hoveredList
      // item.index = hoveredList
    },
  })

  const opacity = isDragging ? 0 : 1

  const ref = useRef()

  drag(drop(ref))

  return (
    <div
      className="flex flex-col justify-between shadow-xl mx-2 my-4 p-3 min-w-64 rounded-md bg-slate-100"
      style={{ opacity: opacity }}
      ref={ref}
      id={HandlerId}
    >
      <section className="flex items-center justify-between w-full">
        <input
          type="text"
          className="font-bold w-40 p-1 outline-outline rounded bg-transparent"
          value={list.list}
          onChange={debounceRef.current}
        />

        <span className="list__more-icon">
          <i
            className="fa fa-trash-o text-fa-color hover:rotate-45 transition-all"
            onClick={() => removeListHandle()}
          ></i>
        </span>
      </section>
      <article>
        {cardss.map((item, index) => {
          return (
            <CardItem card={item} key={index} moveCard={moveCardRef.current} />
          )
        })}
      </article>

      <div className="flex items-center">{addACartBtn}</div>
    </div>
  )
}

export default ListItem

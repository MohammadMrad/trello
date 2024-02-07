import React, { useMemo, useRef, useState } from "react"
import ReactModal from "react-modal"
import { useDispatch, useSelector } from "react-redux"
import { commentAction } from "../../action/commentAction"
import CommentItem from "../CommentItem/CommentItem"
import { cardsNameAction } from "../../action/cardsNameAction"
import { useDrag, useDrop } from "react-dnd"

const Card = ({ card, moveCard }) => {
  const dispatch = useDispatch()

  const debounceRef = useRef()

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [pageWidth, setPageWidth] = useState(window.innerWidth)

  const commentState = useSelector((state) => state.comment)
  const { comment } = commentState

  const commentt = comment.filter((item) => item.cardId === card.cardId)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleSendComment = (event) => {
    event.preventDefault()

    const comment = localStorage.getItem("comment")
      ? JSON.parse(localStorage.getItem("comment"))
      : []

    localStorage.setItem(
      "comment",
      JSON.stringify([
        ...comment,
        {
          comment: event.target.comment.value,
          cardId: card.cardId,
        },
      ])
    )

    dispatch(commentAction())
    event.target.comment.value = ""
  }

  let commentBox = (
    <form className="flex flex-col items-start" onSubmit={handleSendComment}>
      <input
        type="text"
        name="comment"
        className="w-full h-12 outline-outline border-2 border-slate-400 font-['Shabnam-Thin'] font-bold text-sm rounded p-2"
        placeholder="Write a comment..."
      />
      <button
        type="submit"
        className="py-1 px-4 bg-bg-btn rounded text-white hover:bg-btn-hover mt-4"
      >
        Send
      </button>
    </form>
  )

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    content: {
      width: pageWidth > 1000 ? "45%" : "70%",
      height: "85%",
      margin: "auto",
      borderRadius: "7px",
      backgroundColor: "#ebecf0",
    },
  }

  const handleRemoveCart = () => {
    const cardId = card.cardId
    dispatch(cardsNameAction(cardId, true, false, null, cartId))
  }

  const cartId = card.cardId

  const handleDebounceRenameCard = (fn, wait) => {
    let inDebounce = null

    return (event) => {
      fn(cardsNameAction(null, false, true, event, cartId))

      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => {
        fn(cardsNameAction(null, true, false, null, cartId))
      }, wait)
    }
  }

  useMemo(() => {
    debounceRef.current = handleDebounceRenameCard(dispatch, 5000)
  }, [debounceRef])

  const cardId = card.id

  const [{ handlerId, receiveHandlerId }, drop] = useDrop({
    accept: "cards",
    collect(monitor) {
      return {
        handlerId: !!monitor.getHandlerId(),
      }
    },
    hover(item, monitor) {
      const draggedCard = item.card
      const hoveredCard = card

      moveCard(draggedCard, hoveredCard)
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: "cards",
    item: { card },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1

  const ref = useRef()

  drag(drop(ref))

  return (
    <div
      ref={ref}
      style={{ opacity: isDragging ? 0 : 1 }}
      id={handlerId}
      className="transition delay-300"
    >
      <div
        className="flex items-start justify-between rounded-md shadow-lg  p-2 h-14 my-3 text-sm font-['Shabnam-Thin'] font-bold bg-slate-200 hover:bg-slate-300"
        onDoubleClick={openModal}
      >
        <div>{card.card}</div>
        <div className="flex group px-1" onClick={handleRemoveCart}>
          <i className="fa fa-trash text-fa-color transition-all group-hover:rotate-45 text-sm"></i>
        </div>
      </div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="modal"
        style={customStyles}
      >
        <div>
          <div className="mb-12 flex items-center">
            <i className="fa fa-window-maximize mr-2 text-fa-color"></i>
            <input
              type="name"
              className="font-['Shabnam-Thin'] font-bold w-40 p-1 outline-outline text-sm rounded bg-transparent"
              onChange={debounceRef.current}
              value={card.card}
            />
          </div>
          <div className="card__send-comment-box">{commentBox}</div>
          <div className="flex flex-col items-start bg-slate-300 w-full h-96 rounded p-2 overflow-y-auto mt-12">
            {commentt.map((item, index) => {
              return <CommentItem comment={item} key={index} />
            })}
          </div>
        </div>
      </ReactModal>
    </div>
  )
}

export default Card

import React, { useEffect, useState } from "react"
import ReactModal from "react-modal"
import { useDispatch, useSelector } from "react-redux"
import { commentAction } from "../../action/commentAction"
import Comment from "../Comment/Comment"
import { cardsNameAction } from "../../action/cardsNameAction"
import "./Card.css"

const Card = ({ card }) => {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    dispatch(cardsNameAction())
  }, [dispatch])

  const commentState = useSelector((state) => state.comment)
  const { comment } = commentState

  const cardsState = useSelector((state) => state.cardsName)
  const { cardsName } = cardsState

  const commentt = comment.filter((item) => item.cardId === card.cardId)

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleSendComment = (event) => {
    event.preventDefault()

    // axios
    //   .post("https://trello-d791c-default-rtdb.firebaseio.com/comment.json", {
    //     comment: event.target.comment.value,
    //     cardId: card.cardId,
    //   })
    //   .then((response) => {
    //     dispatch(commentAction())
    //     event.target.comment.value = ""
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

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
    <div className="card__comment-box">
      <form
        action=""
        className="card__comment-form"
        onSubmit={handleSendComment}
      >
        <input
          type="text"
          name="comment"
          id="card__comment-input"
          placeholder="Write a comment..."
        />
        <button type="submit" className="card__comment-btn">
          Send
        </button>
      </form>
    </div>
  )

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    content: {
      width: "55%",
      height: "85%",
      margin: "auto",
      borderRadius: "7px",
      backgroundColor: "#ebecf0",
    },
  }

  const handleRemoveCart = (cardIdDelete) => {
    dispatch(cardsNameAction(cardIdDelete))
  }

  const handleRenameCard = (event) => {
    const cartId = card.cardId

    const currentCard = cardsName.filter((item) => {
      return item.cardId === cartId
    })

    const CardsExceptCurrentCard = cardsName.filter((item) => {
      return item.cardId !== cartId
    })

    localStorage.setItem(
      "cards",
      JSON.stringify([
        ...CardsExceptCurrentCard,
        {
          card: event.target.value,
          listId: currentCard[0].listId,
          cardId: currentCard[0].cardId,
          userId: currentCard[0].userId,
          creationTime: currentCard[0].creationTime,
        },
      ])
    )

    dispatch(cardsNameAction())
  }

  return (
    <div className="card">
      <h3 className="card-content" onDoubleClick={openModal}>
        <span>{card.card}</span>
        <span>
          <i
            className="fa fa-trash"
            onClick={() => handleRemoveCart(card.cardId)}
          ></i>
        </span>
      </h3>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="modal"
        // style={{ width: "50%" }}
        style={customStyles}
      >
        <div className="card__modal">
          <div className="card__cart-name">
            <i className="fa fa-window-maximize"></i>
            {/* <span>{card.card}</span> */}
            <input
              type="name"
              className="card__card-name-input"
              onChange={handleRenameCard}
              value={card.card}
            />
          </div>
          <div className="card__send-comment-box">{commentBox}</div>
          <div className="card__comments">
            {commentt.map((item, index) => {
              return <Comment comment={item} key={index} />
            })}
          </div>
          {/* <button onClick={closeModal}>Close</button> */}
        </div>
      </ReactModal>
    </div>
  )
}

export default Card

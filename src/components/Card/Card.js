import React, { useState } from "react"
import "./Card.css"
import ReactModal from "react-modal"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { commentAction } from "../../action/commentAction"
import Comment from "../Comment/Comment"

const Card = ({ card }) => {
  const dispatch = useDispatch()

  const [modalIsOpen, setModalIsOpen] = useState(false)

  const commentState = useSelector((state) => state.comment)
  const { comment } = commentState

  const commentt = comment.filter((item) => {
    return item.cardId === card.cardId
  })

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const handleSendComment = (event) => {
    event.preventDefault()

    axios
      .post("https://trello-d791c-default-rtdb.firebaseio.com/comment.json", {
        comment: event.target.comment.value,
        cardId: card.cardId,
      })
      .then((response) => {
        dispatch(commentAction())
        event.target.comment.value = ""
      })
      .catch((error) => {
        console.log(error)
      })
  }

  let commentBox = (
    <div className="card__comment-box">
      <form
        action=""
        className="card__comment-form"
        onSubmit={handleSendComment}
      >
        <input type="text" name="comment" id="card__comment-input" />
        <button type="submit" className="card__comment-btn">
          Send
        </button>
      </form>
    </div>
  )

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)", // رنگ سیاه با شفافیت
    },
    content: {
      width: "55%",
      height: "85%",
      margin: "auto",
      borderRadius: "7px",
      backgroundColor: "#ebecf0",
    },
  }

  return (
    <div className="card">
      <h3 className="card-title" onClick={openModal}>
        {card.card}
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
            <span>{card.card}</span>
          </div>
          <div className="card__send-comment-box">{commentBox}</div>
          <div className="card__comments">
            {commentt.map((item, index) => {
              return <Comment comment={item} />
            })}
          </div>
          {/* <button onClick={closeModal}>Close</button> */}
        </div>
      </ReactModal>
    </div>
  )
}

export default Card

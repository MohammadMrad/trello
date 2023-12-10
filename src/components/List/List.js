import React, { useEffect, useRef, useState } from "react"
import "./List.css"
import Card from "../Card/Card"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import ReactModal from "react-modal"
import { listsNameAction } from "../../action/listsNameAction"
import { cardsNameAction } from "../../action/cardsNameAction"

const List = ({ value }) => {
  const dispatch = useDispatch()

  const [addACartBtnClicked, setAddACartBtnClicked] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const cardsState = useSelector((state) => state.cardsName)
  const { cardsName } = cardsState

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

    axios
      .post("https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json", {
        card: event.target.list.value,
      })
      .then((response) => {
        dispatch(cardsNameAction())
      })
      .catch((error) => {
        console.log(error)
      })

    setAddACartBtnClicked(false)
  }

  const removeListHandle = () => {
    axios
      .delete(`https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`)
      .then((response) => {
        console.log(response)
        dispatch(listsNameAction)
      })
      .catch((error) => {
        console.log(error)
      })

    dispatch(listsNameAction())
  }

  return (
    <div className="list">
      <section className="list__header">
        <h2>{value}</h2>
        <span className="list__more-icon">
          <i className="fa fa-ellipsis-h"></i>
        </span>
      </section>
      <article onClick={() => setModalIsOpen(!modalIsOpen)}>
        {cardsName.map((item, index) => {
          const a = item.card
          return (
            <div className="list-title" key={index}>
              {a}
            </div>
          )
        })}
      </article>

      <div className="list-footer">{addACartBtn}</div>

      <ReactModal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(!modalIsOpen)}
      >
        <div>mohammad</div>
      </ReactModal>

      <button type="submit" onClick={() => removeListHandle()}>
        remve
      </button>
    </div>
  )
}

export default List

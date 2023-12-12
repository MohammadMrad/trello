import React, { useEffect } from "react"
import "./CartName.css"
import Header from "../../components/Header/Header"
import SmallPage from "../../components/SmallPage/SmallPage"
import { useDispatch, useSelector } from "react-redux"
import { cardsNameAction } from "../../action/cardsNameAction"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import Id from "../../components/id/Id"
import uuid from "react-uuid"

const CartName = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const state = useSelector((state) => state.cardsName)
  const { cardsName, loader } = state

  const listsNameState = useSelector((state) => state.listsName)
  const { listsName } = listsNameState
  console.log(listsName)
  const list1 = listsName[0].listId
  console.log(list1)

  const accountListState = useSelector((state) => state.accountsList)
  const { accountsList } = accountListState

  useEffect(() => {
    if (!loader && cardsName.length !== 0) {
      // navigate(`/board/${accountsList[0].id}`)
      navigate("/board")
    }
  })

  const handleSubmitBtn = (event) => {
    event.preventDefault()

    axios
      .post("https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json", {
        card: event.target.cardOne.value,
        listId: list1,
        cardId: uuid(),
      })
      .then((response) => {
        console.log(response)
        dispatch(cardsNameAction())
      })
      .catch((error) => {
        console.log(error)
      })

    axios
      .post("https://trello-d791c-default-rtdb.firebaseio.com/cardsName.json", {
        card: event.target.cardTwo.value,
        listId: list1,
        cardId: uuid(),
      })
      .then((response) => {
        console.log(response)
        dispatch(cardsNameAction())
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return loader ? (
    <Loader />
  ) : (
    <div className="cart-name">
      <div>
        <Header />
      </div>
      <main className="cart-name__container">
        <div className="cart-name__description">
          <h1>Carts are your building blocks</h1>
          <p>for things you need to do organize, or share with a teamemate </p>
          <p>
            You can also set due dates for cards so you'll never miss a things.
          </p>
          <h3>
            Add title for a few cards in your
            <span style={{ fontWeight: "bold" }}>
              {/* {listsName[0].listOneName} */}
            </span>
            list
          </h3>
          <form
            className="cart-name__form"
            onSubmit={(event) => handleSubmitBtn(event)}
          >
            <label>Card Name 1</label>
            <input
              type="text"
              name="cardOne"
              className="cart-name__input"
              placeholder="e.g., Project Planning"
              // onChange={(event) => handleCardNameOne(event)}
            />
            <label>Card Name 2</label>
            <input
              type="text"
              name="cardTwo"
              className="cart-name__input"
              placeholder="e.g., Kichoff meeting"
              // onChange={(event) => handleCardNameTwo(event)}
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

export default CartName

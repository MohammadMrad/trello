import React, { useEffect } from "react"
import Header from "../../components/Header/Header"
import SmallPage from "../../components/SmallPage/SmallPage"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Loader from "../../components/Loader/Loader"
import uuid from "react-uuid"
import InternetChecker from "../../components/InternetChecker/InternetChecker"

const CartName = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const state = useSelector((state) => state.cardsName)
  const { cardsName, loader } = state

  const boardId = JSON.parse(localStorage.getItem("boardsId"))

  useEffect(() => {
    if (!loader && cardsName.length !== 0) {
      // navigate(`/board/${accountsList[0].id}`)
      navigate(`/board/${boardId}`)
    }
  })

  const handleSubmitBtn = (event) => {
    event.preventDefault()

    const userId = JSON.parse(localStorage.getItem("user"))

    const firstListId = JSON.parse(localStorage.getItem("firstListId"))

    const cards = localStorage.getItem("cards")
      ? JSON.parse(localStorage.getItem("cards"))
      : []

    localStorage.setItem(
      "cards",
      JSON.stringify([
        ...cards,
        {
          card: event.target.cardOne.value,
          listId: firstListId,
          cardId: uuid(),
          userId: userId,
          creationTime: new Date().getTime() + 1,
        },
        {
          card: event.target.cardTwo.value,
          listId: firstListId,
          cardId: uuid(),
          userId: userId,
          creationTime: new Date().getTime() + 2,
        },
      ])
    )
    // dispatch(cardsNameAction())

    navigate(`/board/${boardId}`)
  }

  return loader ? (
    <Loader />
  ) : (
    <div className="cart-name">
      <InternetChecker />
      <div>
        <Header />
      </div>
      <main className="flex items-center justify-around lg:*:mx-12 flex-col lg:flex-row ">
        <section className="*:my-3 mt-20 lg:mt-0 text-center lg:text-start">
          <h1 className="text-3xl">Carts are your building blocks</h1>
          <p className="font-['Shabnam-Thin'] font-bold max-w-prose">
            for things you need to do organize, or share with a teamemate, You
            can also set due dates for cards so you'll never miss a things.
          </p>
          <h3>
            Add title for a few cards in your
            <span style={{ fontWeight: "bold" }}></span>
            list
          </h3>
          <form
            className="flex flex-col items-center lg:items-start text-center lg:text-start"
            onSubmit={(event) => handleSubmitBtn(event)}
          >
            <label className="text-sm invisible lg:visible">Card Name 1</label>
            <input
              type="text"
              name="cardOne"
              className="font-['Shabnam-Thin'] p-2 w-72 font-bold border-2 border-solid border-border-color bg-bg-input rounded outline-outline text-sm lg:mb-8"
              placeholder="e.g., Project Planning"
            />
            <label className="text-sm invisible lg:visible">Card Name 2</label>
            <input
              type="text"
              name="cardTwo"
              className="font-['Shabnam-Thin'] p-2 w-72 font-bold border-2 border-solid border-border-color bg-bg-input rounded outline-outline text-sm"
              placeholder="e.g., Kichoff meeting"
            />
            <button
              type="submit"
              className="py-2 px-4 mt-4 text-sm bg-bg-btn rounded text-white hover:bg-btn-hover"
            >
              Next
            </button>
          </form>
        </section>
        <section>
          <SmallPage />
        </section>
      </main>
    </div>
  )
}

export default CartName

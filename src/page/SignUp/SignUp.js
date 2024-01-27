import React, { useEffect, useState } from "react"
import Background from "../../components/Background/Background"
import { Link, useNavigate } from "react-router-dom"
import "./SignUp.css"
import AnotherSocial from "../../components/AnotherSocial/AnotherSocial"
import uuid from "react-uuid"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { accountsAction } from "../../action/accountsAction"
import Loader from "../../components/Loader/Loader"
import logo from "../../assets/images/trello-logo-blue.svg"
import InternetChecker from "../../components/InternetChecker/InternetChecker"

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [message, setMessage] = useState("")

  const state = useSelector((state) => state.accountsList)
  const { loader, accountsList } = state

  useEffect(() => {
    if (!loader && accountsList.length !== 0) {
      navigate("/signUp/welcome")
    }
  })

  const handleSignUp = (event) => {
    event.preventDefault()

    if (event.target.password.value.length < 7) {
      setMessage("Password must have at least eight characters")
    } else if (
      event.target.repeatPassword.value !== event.target.password.value
    ) {
      setMessage("Password not repeated correctly")
    } else if (event.target.password.value.includes("123")) {
      setMessage("Choose a stronger password")
    } else {
      setMessage("")

      localStorage.setItem("user", JSON.stringify(uuid()))
      const userId = JSON.parse(localStorage.getItem("user"))

      localStorage.setItem("boardsId", JSON.stringify(uuid()))
      const boardId = JSON.parse(localStorage.getItem("boardsId"))

      axios
        .post(
          "https://trello-d791c-default-rtdb.firebaseio.com/accounts.json",
          {
            boardId: boardId,
            userId: userId,
            user: event.target.userName.value,
            password: event.target.password.value,
          }
        )
        .then((response) => {
          dispatch(accountsAction())
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return loader ? (
    <Loader />
  ) : (
    <div className="sign-up">
      <InternetChecker />
      <div className="sign-up__bacground-image">
        <Background />
      </div>
      <div className="sign-up__container">
        <div className="sign-up__box">
          <figure>
            <img src={logo} alt="trello-logo" className="sign-up__logo" />
          </figure>
          <h2 className="sign-up__title">Sign up to continue</h2>
          <form
            onSubmit={(event) => handleSignUp(event)}
            className="sign-up__form"
          >
            <input
              type="text"
              name="userName"
              placeholder="Enter user name"
              className="sign-up__input"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="sign-up__input"
            />
            <input
              type="password"
              name="repeatPassword"
              placeholder="repeat Password again"
              className="sign-up__input"
            />
            <div className="sign-up__message">
              {message.length > 1 ? (
                <i className="fa fa-times-circle"></i>
              ) : null}
              <span>{message}</span>
            </div>
            <button type="submit" className="sign-up__submit-btn">
              Sign up
            </button>
          </form>
          <div>
            <AnotherSocial />
          </div>
          <Link to="/logIn" className="sign-up__log-in-link">
            Already have an Atlassian account? Log in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Signup

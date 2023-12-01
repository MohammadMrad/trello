import React, { useState } from "react"
import Background from "../../components/Background/Background"
import { Link, Route, Routes, useNavigate } from "react-router-dom"
import "./SignUp.css"
import AnotherSocial from "../../components/AnotherSocial/AnotherSocial"
import uuid from "react-uuid"
import Welcome from "../Welcome/Welcome"
import BoardName from "../BoardName/BoardName"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { accountsListAction } from "../../action/accountsAction"
import Loader from "../../components/Loader/Loader"

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const state = useSelector((state) => state.accountsList)
  const { loader } = state
  console.log(loader)

  const handleSignUp = (event) => {
    event.preventDefault()

    axios
      .post("https://trello-d791c-default-rtdb.firebaseio.com/accounts.json", {
        id: uuid(),
        user: event.target.userName.value,
        password: event.target.password.value,
      })
      .then((response) => {
        console.log(response)
        dispatch(accountsListAction())
        // navigate("/signUp/welcome")
      })
      .catch((error) => {
        console.log(error)
      })

    setTimeout(() => {
      navigate("/signUp/welcome")
    }, 1500)
  }

  return loader ? (
    <Loader />
  ) : (
    <div className="sign-up">
      <div className="sign-up__bacground-image">
        <Background />
      </div>
      <div className="sign-up__container">
        <div className="sign-up__box">
          <figure>
            <img
              src="/images/trello-logo-blue.svg"
              alt="trello-logo"
              className="sign-up__logo"
            />
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

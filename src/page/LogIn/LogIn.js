import React, { useEffect, useState } from "react"
import "./LogIn.css"
import Background from "../../components/Background/Background"
import { Link, useNavigate } from "react-router-dom"
import AnotherSocial from "../../components/AnotherSocial/AnotherSocial"
import { useDispatch, useSelector } from "react-redux"
import { accountsAction } from "../../action/accountsAction"
import logo from "../../assets/images/trello-logo-blue.svg"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")

  const accountListState = useSelector((state) => state.accountsList)
  const { accountsList } = accountListState

  const boardId = JSON.parse(localStorage.getItem("boardsId"))

  useEffect(() => {
    dispatch(accountsAction())
  }, [dispatch])

  const handleLogin = (event) => {
    event.preventDefault()

    for (const item in accountsList) {
      if (
        event.target.userName.value === accountsList[item].user &&
        event.target.password.value === accountsList[item].password
      ) {
        setMessage("")

        navigate(`/board/${boardId}`)
      } else {
        setMessage("There are no accounts with this information")
      }
    }
  }

  return (
    <div className="log-in">
      <div className="log-in__bacground-image">
        <Background />
      </div>
      <div className="log-in__container">
        <div className="log-in__box">
          <figure>
            <img src={logo} alt="trello-logo" className="log-in__logo" />
          </figure>
          <h2 className="log-in__title">Log in to Trello</h2>
          <form
            onSubmit={(event) => handleLogin(event)}
            action="#"
            className="log-in__form"
          >
            <input
              type="text"
              name="userName"
              placeholder="Enter user name"
              className="log-in__input"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="log-in__input"
            />
            <div className="log-in__message">
              {message.length > 1 ? (
                <i className="fa fa-times-circle"></i>
              ) : null}
              <span>{message}</span>
            </div>
            <button type="submit" className="log-in__submit-btn">
              Continue
            </button>
          </form>
          <div>
            <AnotherSocial />
          </div>
          <Link to="/signUp" className="log-in__sign-up-link">
            Can't log in? Create an account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login

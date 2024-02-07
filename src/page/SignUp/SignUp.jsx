import React, { useState } from "react"
import Background from "../../components/Background/Background"
import { Link, useNavigate } from "react-router-dom"
import AnotherSocial from "../../components/AnotherSocial/AnotherSocial"
import uuid from "react-uuid"
import axios from "axios"
import { useDispatch } from "react-redux"
import { accountsAction } from "../../action/accountsAction"
import Loader from "../../components/Loader/Loader"
import logo from "../../assets/images/trello-logo-blue.svg"
import InternetChecker from "../../components/InternetChecker/InternetChecker"

const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = (event) => {
    event.preventDefault()

    setLoading(true)

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
          if (!loading && userId) {
            navigate("/signUp/welcome")
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  return loading ? (
    <Loader />
  ) : (
    <main>
      <InternetChecker />

      <Background />

      <div className="flex flex-col items-center text-center relative z-10">
        <div className="flex flex-col items-center  px-8 py-4 bg-white justify-start md:shadow-2xl mt-12">
          <figure>
            <img src={logo} alt="trello-logo" className="w-32 my-4" />
          </figure>
          <h2 className="mb-4">Sign up to continue</h2>
          <form
            onSubmit={(event) => handleSignUp(event)}
            className="flex flex-col *:m-2 after:content-['OR'] font-['Shabnam-Thin'] font-bold after:text-xs after:my-2 text-sm"
          >
            <input
              type="text"
              name="userName"
              placeholder="Enter user name"
              className="font-['Shabnam-Thin'] p-2 w-72 font-bold border-2 border-solid border-border-color bg-bg-input rounded outline-outline text-sm"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="font-['Shabnam-Thin'] p-2 w-72 font-bold border-2 border-solid border-border-color bg-bg-input rounded outline-outline text-sm"
            />
            <input
              type="password"
              name="repeatPassword"
              placeholder="repeat Password again"
              className="font-['Shabnam-Thin'] p-2 w-72 font-bold border-2 border-solid border-border-color bg-bg-input rounded outline-outline text-sm"
            />
            <div className="flex text-red-600 font-['Shabnam-Thin'] self-start">
              {message.length > 1 ? (
                <i className="fa fa-times-circle"></i>
              ) : null}
              <span>{message}</span>
            </div>
            <button
              type="submit"
              className="py-2 w-72 bg-bg-btn rounded text-white hover:bg-btn-hover"
            >
              Sign up
            </button>
          </form>
          <div>
            <AnotherSocial />
          </div>
          <Link
            to="/logIn"
            className="mt-2 font-[Shabnam-Thin] font-bold hover:underline text-bg-btn text-sm"
          >
            Already have an account? Log in
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Signup

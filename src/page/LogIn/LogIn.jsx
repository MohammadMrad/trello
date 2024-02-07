import React, { useEffect, useState } from "react"
import Background from "../../components/Background/Background"
import { Link, useNavigate } from "react-router-dom"
import AnotherSocial from "../../components/AnotherSocial/AnotherSocial"
import { useDispatch, useSelector } from "react-redux"
import { accountsAction } from "../../action/accountsAction"
import logo from "../../assets/images/trello-logo-blue.svg"
import axios from "axios"
import InternetChecker from "../../components/InternetChecker/InternetChecker"
import Loader from "../../components/Loader/Loader"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [message, setMessage] = useState("")
  const [Loading, setLoading] = useState(false)

  const accountListState = useSelector((state) => state.accountsList)
  const { accountsList } = accountListState

  useEffect(() => {
    dispatch(accountsAction())
  }, [])

  const handleAccount = async (userId) => {
    localStorage.setItem("user", JSON.stringify(userId))

    const user = await JSON.parse(localStorage.getItem("user"))

    const response = await axios.get(
      "https://trello-d791c-default-rtdb.firebaseio.com/boardName.json"
    )

    const data = await response.data

    const arrey = []

    for (const item in data) {
      if (data[item].userId === user) {
        arrey.push({
          boardName: data[item].boardName,
          boardId: data[item].boardId,
          userId: data[item].userId,
          creationTime: data[item].creationTime,
        })
      }
    }

    localStorage.setItem("boards", JSON.stringify(arrey))

    localStorage.setItem("boardsId", JSON.stringify(arrey[0].boardId))
    const firstBoardsId = JSON.parse(localStorage.getItem("boardsId"))

    if (!Loading && firstBoardsId) {
      navigate(`/board/${firstBoardsId}`)
    }
  }

  const handleLogin = (event) => {
    event.preventDefault()

    for (const item in accountsList) {
      if (
        event.target.userName.value === accountsList[item].user &&
        event.target.password.value === accountsList[item].password
      ) {
        setMessage("")
        const user = accountsList[item]
        const { userId } = user

        setLoading(true)

        handleAccount(userId)
      } else {
        setMessage("There are no accounts with this information")
      }
    }
  }

  //start whith tailwinscss 1402,10,09 :)

  return Loading ? (
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
          <h2 className="mb-4">Log in to Trello</h2>
          <form
            onSubmit={(event) => handleLogin(event)}
            action="#"
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
              Continue
            </button>
          </form>
          <div>
            <AnotherSocial />
          </div>
          <Link
            to="/signUp"
            className="mt-2 font-[Shabnam-Thin] font-bold hover:underline text-bg-btn text-sm"
          >
            Can't log in? Create an account
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Login

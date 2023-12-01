import React from "react"
import { Link, useNavigate } from "react-router-dom"
import Blob from "../../components/Blob/Blob"
import Header from "../../components/Header/Header"
import "./Welcome.css"
import { useSelector } from "react-redux"

const Welcome = () => {
  const navigate = useNavigate()

  const handleBuildBoard = () => {
    navigate("/signup/boardName")
  }

  return (
    <div className="welcome">
      <div>
        <Header />
      </div>
      <main className="welcome__container">
        <div className="welcome__description">
          <h1>Welcome to Trello!</h1>
          <p>
            We are glad you made it. let`s start organizing your project so you
            can get things done
          </p>
          <div className="welcome__link">
            <button onClick={handleBuildBoard}>Build your first board</button>
          </div>
        </div>
        <div className="welcome__img-box">
          {/* <Blob style={{ maxWidth: "40rem" }}> */}
          <img
            src="/images/welcome-page.svg"
            alt="welcome-page"
            className="welcome__img"
          />
          {/* </Blob> */}
        </div>
      </main>
    </div>
  )
}

export default Welcome

import React from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import "./Welcome.css"
import image from "../../assets/images/welcome-page.svg"
import InternetChecker from "../../components/InternetChecker/InternetChecker"

const Welcome = () => {
  const navigate = useNavigate()

  const handleBuildBoard = () => {
    navigate("/signup/boardName")
  }

  return (
    <div className="welcome">
      <InternetChecker />
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
          <img src={image} alt="welcome-page" className="welcome__img" />
        </div>
      </main>
    </div>
  )
}

export default Welcome

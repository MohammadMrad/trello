import React from "react"
import { useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import image from "../../assets/images/welcome-page.svg"
import InternetChecker from "../../components/InternetChecker/InternetChecker"

const Welcome = () => {
  const navigate = useNavigate()

  const handleBuildBoard = () => {
    navigate("/signup/boardName")
  }

  const hanleGetBoard = () => {
    navigate("/board")
  }

  return (
    <div className="welcome">
      <InternetChecker />
      <div>
        <Header />
      </div>
      <main className="flex flex-col text-center md:items-center md:flex-row md:text-start mt-24 md:mt-0 md:justify-around justify-start">
        <section className="*:my-3 items-center mx-8 ">
          <h1 className="text-3xl">Welcome to Trello!</h1>
          <p className="font-['Shabnam-Thin'] font-bold">
            We are glad you made it. let`s start organizing your project so you
            can get things done
          </p>
          <div className="welcome__link">
            <button
              onClick={handleBuildBoard}
              className="py-2 px-4 mt-4  text-sm bg-bg-btn rounded text-white hover:bg-btn-hover"
            >
              Build your first board
            </button>
            <button
              className="py-2 px-2 mt-4  text-sm bg-bg-btn rounded text-white hover:bg-btn-hover ml-4"
              onClick={hanleGetBoard}
            >
              <i className="fa fa-map-signs"></i>
            </button>
          </div>
        </section>
        <section className="welcome__img-box mx-8">
          <img src={image} alt="welcome-page" />
        </section>
      </main>
    </div>
  )
}

export default Welcome

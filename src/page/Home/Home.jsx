import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import image from "../../assets/images/TrelloUICollage_4x.png"
import logo from "../../assets/images/trello-logo-blue.svg"
import { useDispatch } from "react-redux"
import InternetChecker from "../../components/InternetChecker/InternetChecker"

const Home = () => {
  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    const user = localStorage.getItem("user") ? true : false

    const board = localStorage.getItem("boardsId")
      ? JSON.parse(localStorage.getItem("boardsId"))
      : []

    user ? navigate(`/board/${board}`) : navigate("/")
  }, [])

  return (
    <div className="relative">
      <InternetChecker />
      <header className="invisible md:visible">
        <nav className="flex justify-between items-center w-full h-12 z-20 fixed t-0 bg-white">
          <ul className="flex items-baseline justify-around h-full *:transition">
            <li>
              <Link to="/">
                <img src={logo} alt="" className="w-20 ml-2" />
              </Link>
            </li>
            <li className="w-20 h-full hover:bg-slate-200 flex items-center justify-center">
              <Link to="">Features</Link>
            </li>
            <li className="w-20 h-full hover:bg-slate-200 flex items-center justify-center">
              <Link to="">Solutions</Link>
            </li>
            <li className="w-20 h-full hover:bg-slate-200 flex items-center justify-center">
              <Link to="">Plans</Link>
            </li>
            <li className="w-20 h-full hover:bg-slate-200 flex items-center justify-center">
              <Link to="">Resources</Link>
            </li>
            <li className="w-20 h-full hover:bg-slate-200 flex items-center justify-center">
              <Link to="">Pricing</Link>
            </li>
          </ul>
          <ul className="flex items-center justify-around h-full">
            <li className="w-20 h-full hover:bg-slate-200 flex items-center justify-center">
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div>
        <header className="flex items-center justify-between h-12 z-20 fixed t-0 bg-white w-full visible md:invisible">
          <ul>
            <li>
              <Link to="/">
                <img src={logo} alt="home__logo" className="w-20 ml-2" />
              </Link>
            </li>
          </ul>
          <ul className="h-full">
            <li
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-full hover:bg-slate-200 flex items-center justify-center"
            >
              <i
                className="fa fa-bars text-fa-color transition"
                style={{ transform: showMenu ? "rotate(90deg)" : "rotate(0)" }}
              ></i>
            </li>
          </ul>
        </header>
        <nav
          className="flex items-start justify-center w-full h-screen z-10 fixed t-0 bg-white transition-all visible md:invisible"
          style={{
            transform: showMenu ? "translateX(0rem)" : "translateX(100%)",
          }}
        >
          <ul className="flex flex-col mt-20">
            <li className="px-4 py-2 flex items-center justify-center">
              <Link to="">Features</Link>
            </li>
            <li className="px-4 py-2 flex items-center justify-center">
              <Link to="">Solutions</Link>
            </li>
            <li className="px-4 py-2 flex items-center justify-center">
              <Link to="">Plans</Link>
            </li>
            <li className="px-4 py-2 flex items-center justify-center">
              <Link to="">Resources</Link>
            </li>
            <li className="px-4 py-2 flex items-center justify-center">
              <Link to="">Pricing</Link>
            </li>
            <li className="px-4 py-2 flex items-center justify-center">
              <Link
                to="/login"
                className="py-3 px-8 text-sm bg-bg-btn shadow-md rounded text-white hover:bg-btn-hover"
              >
                Log in
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <main className="h-screen">
        <div className="flex justify-start flex-col text-center md:flex-row md:justify-around md:text-start *:mx-12 items-center text-white bg-gradient-to-r from-violet-800 to-fuchsia-600 h-3/4">
          <section className="*:my-6  mt-20 md:mt-0">
            <h1 className="sm:text-4xl text-3xl">
              Trello brings all your tasks, teammates, and tools together
            </h1>
            <h2 className="text-xl">
              Keep everything in the same place—even if your team isn’t.
            </h2>
            <div>
              <Link
                to="/signup"
                className="py-4 px-8 mt-4  text-sm bg-bg-btn shadow-md hover:shadow-white rounded text-white hover:bg-btn-hover"
              >
                Sign up - it’s free!
              </Link>
            </div>
          </section>
          <section className="home__ui-section section-right">
            <figure className="mt-20 max-w-2xl">
              <img src={image} alt="trello-ui-collage" />
            </figure>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Home

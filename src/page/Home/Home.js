import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./Home.css"
import image from "../../assets/images/TrelloUICollage_4x.png"
import logo from "../../assets/images/trello-logo-blue.svg"
import { useDispatch } from "react-redux"
import InternetChecker from "../../components/InternetChecker/InternetChecker"

const Home = () => {
  const dispatch = useDispatch()
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
    <div className="home">
      <InternetChecker />
      <header>
        <nav className="home__navbar desktop-screen">
          <ul>
            <li>
              <Link to="/">
                <img src={logo} alt="" className="home__logo" />
              </Link>
            </li>
            <li className="home__li--hover">
              <Link to="">Features</Link>
            </li>
            <li className="home__li--hover">
              <Link to="">Solutions</Link>
            </li>
            <li className="home__li--hover">
              <Link to="">Plans</Link>
            </li>
            <li className="home__li--hover">
              <Link to="">Resources</Link>
            </li>
            <li className="home__li--hover">
              <Link to="">Pricing</Link>
            </li>
          </ul>
          <ul>
            <li className="home__li--hover">
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="home__mobile-screen">
        <header className="home__mobile-screen-header ">
          <ul>
            <li>
              <Link to="/">
                <img
                  src="/images/trello-logo-blue.svg"
                  alt=""
                  className="home__logo"
                />
              </Link>
            </li>
          </ul>
          <ul>
            <li onClick={() => setShowMenu(!showMenu)}>
              <i className="fa fa-bars"></i>
            </li>
          </ul>
        </header>
        <nav
          className="home__colmn-menu-navbar"
          style={{
            transform: showMenu ? "translateX(0rem)" : "translateX(100%)",
            position: showMenu ? "fixed" : "fixed",
          }}
        >
          <ul>
            <li className="home__li--hover">
              <Link to="">Features</Link>
            </li>
            <li className="home__li--hover">
              <Link to="">Solutions</Link>
            </li>
            <li className="home__li--hover">
              <Link to="">Plans</Link>
            </li>
            <li className="home__li--hover">
              <Link to="">Resources</Link>
            </li>
            <li className="home__li--hover">
              <Link to="">Pricing</Link>
            </li>
            <li className="home__li--border">
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        </nav>
      </div>
      <main>
        <div className="home__ui">
          <section className="home__ui-section section-left">
            <h1>Trello brings all your tasks, teammates, and tools together</h1>
            <h2>Keep everything in the same place—even if your team isn’t.</h2>
            <div>
              <Link to="/signup">Sign up - it’s free!</Link>
            </div>
          </section>
          <section className="home__ui-section section-right">
            <div className="home__ui-image">
              <img src={image} alt="trello-ui-collage" />
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default Home

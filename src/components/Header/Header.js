import React from "react"
import "./Header.css"
import logo from "../../assets/images/Capture.PNG"

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="trello-logo" />
    </header>
  )
}

export default Header

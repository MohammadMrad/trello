import React, { useState } from "react"
import "./Dropdown.css"

const Dropdown = (props) => {
  const [isOpen, SetIsOpen] = useState(false)

  const toggleDropdown = () => {
    SetIsOpen(!isOpen)
  }

  // window.onclick(SetIsOpen(!isOpen))
  // window.addEventListener("click", toggleDropdown)

  const clickBackDrop = () => {
    SetIsOpen(false)
  }

  return (
    <div>
      {isOpen ? (
        <div className="back-drop" onClick={clickBackDrop}></div>
      ) : null}
      <div className="dropdown">
        <button className="dropdown__btn" onClick={toggleDropdown}>
          {props.buttonText}
        </button>
        <div className="dropdown__container">
          {isOpen ? (
            <div className="dropdown__content">{props.children}</div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Dropdown

import React, { useEffect, useRef, useState } from "react"
import "./Dropdown.css"
import { render } from "@testing-library/react"

const Dropdown = (props) => {
  const [isOpen, SetIsOpen] = useState(false)

  const toggleDropdown = () => {
    SetIsOpen(!isOpen)
  }

  // window.onclick(SetIsOpen(!isOpen))
  // window.addEventListener("click", toggleDropdown)

  return (
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
  )
}

export default Dropdown

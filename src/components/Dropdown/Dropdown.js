import React, { useRef, useState } from "react"
import "./Dropdown.css"
import { render } from "@testing-library/react"

const Dropdown = (props) => {
  const [isOpen, SetIsOpen] = useState(false)

  const toggleDropdown = () => {
    SetIsOpen(!isOpen)
  }

  return (
    <div className="dropdown">
      <button onClick={toggleDropdown}>{props.buttonText}</button>
      <div className="dropdown__container">
        {isOpen ? (
          <div className="dropdown__content">{props.children}</div>
        ) : null}
      </div>
    </div>
  )
}

export default Dropdown

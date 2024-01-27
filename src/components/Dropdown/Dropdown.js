import React from "react"
import "./Dropdown.css"

const Dropdown = (props) => {
  return (
    <div className="dropdown">
      <div className="dropdown__btn">{props.btnTitle}</div>
      <div className="dropdown__content">{props.children}</div>
    </div>
  )
}

export default Dropdown

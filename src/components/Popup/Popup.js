import React, { useState } from "react"
import "./Popup.css"

const Popup = (props) => {
  const [isOpen, SetIsOpen] = useState(false)

  const togglePopup = () => {
    SetIsOpen(!isOpen)
  }

  const clickBackDrop = () => {
    SetIsOpen(false)
  }

  return (
    <div>
      {isOpen ? (
        <div className="back-drop" onClick={clickBackDrop}></div>
      ) : null}
      <div className="popup">
        <button className="popup__btn" onClick={togglePopup}>
          {props.btnTitle}
        </button>

        {isOpen ? <div className="popup__content">{props.children}</div> : null}
      </div>
    </div>
  )
}

export default Popup

import React, { useState } from "react"

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
        <div
          className="w-full h-screen fixed top-0 left-0 z-10"
          onClick={clickBackDrop}
        ></div>
      ) : null}
      <div className="inline-block text-center">
        <button
          className="flex bg-transparent border-none text-sm w-full h-full"
          onClick={togglePopup}
        >
          {props.btnTitle}
        </button>

        {isOpen ? (
          <div className="absolute z-20 bg-white p-4 justify-center shadow-lg -translate-x-28 translate-y-4">
            {props.children}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Popup

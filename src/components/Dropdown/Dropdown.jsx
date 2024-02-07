import React from "react"

const Dropdown = (props) => {
  return (
    <div className="group inline-block relative w-full h-full">
      <div className=" flex items-center justify-center text-center w-8 h-full hover:bg-rose-600/30">
        {props.btnTitle}
      </div>
      <div className="absolute hidden right-0 min-w-20 z-30 bg-white text-fa-color shadow-md  group-hover:block">
        {props.children}
      </div>
    </div>
  )
}

export default Dropdown

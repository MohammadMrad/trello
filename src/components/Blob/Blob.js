import React from "react"
import "./Blob.css"

const Blob = (props) => {
  return (
    <div className="blob" style={props.style}>
      <img src="/images/1695976275931.svg" alt="" className="blob__image" />
      {props.children}
    </div>
  )
}

export default Blob

import React from "react"
import "./Background.css"
import backgroundimage1 from "../../assets/images/1693665259297.svg"
import backgroundimage2 from "../../assets/images/1693665259305.svg"

const Background = () => {
  return (
    <div className="backround-login-signup-pages">
      <img src={backgroundimage1} alt="" className="background-image left" />
      <img src={backgroundimage2} alt="" className="background-image right" />
    </div>
  )
}

export default Background

import React from "react"
import "./AnotherSocial.css"
import googleLogo from "../../assets/images/google-logo.e086107b.svg"
import microsoftLogo from "../../assets/images/microsoft-logo.42b61fa1.svg"
import appleLogo from "../../assets/images/apple-logo.4f2453fb.svg"
import slacLogo from "../../assets/images/slack-logo.ad2e0409.svg"

const AnotherSocial = () => {
  return (
    <div className="social-login">
      <button className="social-login-item">
        <span>
          <img
            src={googleLogo}
            alt="google-logo"
            className="social-login-logo"
          />
        </span>
        <span className="social-login-name">Continue with Google</span>
      </button>
      <button className="social-login-item">
        <span>
          <img
            src={microsoftLogo}
            alt="microsoft-logo"
            className="social-login-logo"
          />
        </span>
        <span className="social-login-name">Continue with Microsoft</span>
      </button>
      <button className="social-login-item">
        <span>
          <img src={appleLogo} alt="apple-logo" className="social-login-logo" />
        </span>
        <span className="social-login-name">Continue with Apple</span>
      </button>
      <button className="social-login-item">
        <span>
          <img src={slacLogo} alt="slack-logo" className="social-login-logo" />
        </span>
        <span className="social-login-name">Continue with Slack</span>
      </button>
    </div>
  )
}

export default AnotherSocial

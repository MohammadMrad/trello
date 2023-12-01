import React from "react"
import "./AnotherSocial.css"

const AnotherSocial = () => {
  return (
    <div className="social-login">
      <button className="social-login-item">
        <span>
          <img
            src="/images/google-logo.e086107b.svg"
            alt="google-logo"
            className="social-login-logo"
          />
        </span>
        <span className="social-login-name">Continue with Google</span>
      </button>
      <button className="social-login-item">
        <span>
          <img
            src="/images/microsoft-logo.42b61fa1.svg"
            alt="microsoft-logo"
            className="social-login-logo"
          />
        </span>
        <span className="social-login-name">Continue with Microsoft</span>
      </button>
      <button className="social-login-item">
        <span>
          <img
            src="/images/apple-logo.4f2453fb.svg"
            alt="apple-logo"
            className="social-login-logo"
          />
        </span>
        <span className="social-login-name">Continue with Apple</span>
      </button>
      <button className="social-login-item">
        <span>
          <img
            src="/images/slack-logo.ad2e0409.svg"
            alt="slack-logo"
            className="social-login-logo"
          />
        </span>
        <span className="social-login-name">Continue with Slack</span>
      </button>
    </div>
  )
}

export default AnotherSocial

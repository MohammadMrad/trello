import googleLogo from "../../assets/images/google-logo.e086107b.svg"
import microsoftLogo from "../../assets/images/microsoft-logo.42b61fa1.svg"
import appleLogo from "../../assets/images/apple-logo.4f2453fb.svg"
import slacLogo from "../../assets/images/slack-logo.ad2e0409.svg"

const AnotherSocial = () => {
  return (
    <div className="flex flex-col my-2 *:flex after:content-[''] after:h-px after:bg-slate-300 after:mt-4 font-bold">
      <button className="flex items-center m-2 shadow-xl px-4 py-1 border">
        <span>
          <img src={googleLogo} alt="google-logo" className="w-5" />
        </span>
        <span className="ml-8">Continue with Google</span>
      </button>
      <button className="flex items-center m-2 shadow-xl px-4 py-1 border">
        <span>
          <img src={microsoftLogo} alt="microsoft-logo" className="w-5" />
        </span>
        <span className="ml-8">Continue with Microsoft</span>
      </button>
      <button className="flex items-center m-2 shadow-xl px-4 py-1 border">
        <span>
          <img src={appleLogo} alt="apple-logo" className="w-5" />
        </span>
        <span className="ml-8">Continue with Apple</span>
      </button>
      <button className="flex items-center m-2 shadow-xl px-4 py-1 border">
        <span>
          <img src={slacLogo} alt="slack-logo" className="w-5" />
        </span>
        <span className="ml-8">Continue with Slack</span>
      </button>
    </div>
  )
}

export default AnotherSocial

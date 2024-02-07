import backgroundimage1 from "../../assets/images/1693665259297.svg"
import backgroundimage2 from "../../assets/images/1693665259305.svg"

const Background = () => {
  return (
    <div className="flex justify-between absolute invisible lg:visible items-end h-screen w-full">
      <img src={backgroundimage1} alt="" className="w-96 fiexd" />
      <img src={backgroundimage2} alt="" className="w-96 fiexd" />
    </div>
  )
}

export default Background

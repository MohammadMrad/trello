const Header = () => {
  return (
    <header className="flex items-center bg-bg-btn py-2 w-full h-16 fixed top-0 text-3xl px-8 font-bold">
      {/* <img src={logo} alt="trello-logo" /> */}
      <div className="flex items-baseline">
        <i className="fa fa-trello mr-2"></i>
        <h1 className="text-white">Trello</h1>
      </div>
    </header>
  )
}

export default Header

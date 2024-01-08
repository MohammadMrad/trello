import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import "./SmallPage.css"
import logo from "../../assets/images/trello-logo-small-page.png"

const SmallPage = () => {
  useEffect(() => {}, [])

  const boardNamestate = useSelector((state) => state.boardName)
  const { boardName } = boardNamestate

  const ListsNameState = useSelector((state) => state.listsName)
  const { listsName } = ListsNameState

  const cardsNameState = useSelector((state) => state.cardsName)
  const { cardsName } = cardsNameState
  const valuesOfCardState = Object.values(cardsName)

  return (
    <div>
      <div className="small-page">
        <header className="small-page__header">
          <nav className="small-page__navbar">
            <ul>
              <li>
                <img
                  src={logo}
                  alt="small-page-logo"
                  className="small-page-logo"
                />
              </li>
              <li className="item"></li>
              <li className="item"></li>
              <li className="item"></li>
            </ul>
          </nav>
          <div className="icons">
            <span className="icon"></span>
            <span className="icon"></span>
            <span className="">
              <i className="fa fa-bell"></i>
            </span>
            <span className="icon yellow-icon"></span>
          </div>
        </header>
        <div className="little-main">
          <div className="little-title">
            <div className="board-name">
              {boardName.length === 0 ? "board-name" : boardName[0].boardName}
            </div>
            <div className="icons">
              <span className="small-icon"></span>
              <span className="small-icon"></span>
              <span className="small-icon"></span>
              <span className="item blue-icon"></span>
            </div>
          </div>
          <div className="all-box">
            <div className="small-page__list">
              <h2 className="list-name">
                {listsName.length === 0 ? "list-name" : listsName[0].list}
              </h2>
              <h3 className="card-name first-card-position">
                {cardsName.length === 0
                  ? "card-name"
                  : valuesOfCardState[0].card.card}
              </h3>
              <div className="card-box first-card"></div>
              <h3 className="card-name second-card-position">
                {cardsName.length === 0
                  ? "card-name"
                  : valuesOfCardState[1].card.card}
              </h3>
            </div>
            <div className="small-page__list">
              <h2 className="list-name">
                {listsName.length === 0 ? "list-name" : listsName[1].list}
              </h2>
              <div className="card-box second-card"></div>
            </div>
            <div className="small-page__list">
              <h2 className="list-name">
                {listsName.length === 0 ? "list-name" : listsName[2].list}
              </h2>
              <div className="card-box third-card"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SmallPage

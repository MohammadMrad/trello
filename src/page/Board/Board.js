import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./Board.css"
import { useDispatch, useSelector } from "react-redux"
import List from "../../components/List/List"
import SidebarItems from "../../components/SidebarItems/SidebarItems"
import ReactModal from "react-modal"
import { useEffect } from "react"
import { listsNameAction } from "../../action/listsNameAction"
import axios from "axios"
import { isClickableInput } from "@testing-library/user-event/dist/utils"
import { click } from "@testing-library/user-event/dist/click"
import uuid from "react-uuid"

const Board = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [starClicked, setStarClicked] = useState(false)
  const [addAListBtnClicked, setAddAListBtnClicked] = useState(false)

  const dispatch = useDispatch()

  // const [modalIsOpen, setModalIsOpen] = useState(false)

  useEffect(() => {
    dispatch(listsNameAction())
  }, [dispatch])

  const boardNameState = useSelector((state) => state.boardName)
  const { boardName } = boardNameState

  const listsNameState = useSelector((state) => state.listsName)
  const { listsName } = listsNameState

  const cardsState = useSelector((state) => state.cardsName)
  const { cardsName } = cardsState

  const accountState = useSelector((state) => state.accountsList)
  const { accountsList } = accountState
  const userName = accountsList[0].user

  const firstLetterAccount = userName.slice(0, 1)

  let addAListBtn = (
    <button
      className="board__add-new-list"
      onClick={() => setAddAListBtnClicked(true)}
    >
      <span>
        <i className="fa fa-plus"></i>
      </span>
      <span>Add another list</span>
    </button>
  )

  const addListHandle = (event) => {
    event.preventDefault()

    axios
      .post(`https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`, {
        list: event.target.listTitle.value,
        listId: uuid(),
      })
      .then((response) => {
        // console.log(response)
        dispatch(listsNameAction())
        setAddAListBtnClicked(false)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (addAListBtnClicked) {
    addAListBtn = (
      <form
        className="board__add-new-list-form"
        onSubmit={(event) => addListHandle(event)}
      >
        <input
          type="text"
          name="listTitle"
          placeholder="Enter list title..."
          style={{
            border: addAListBtnClicked ? "2px solid #0c66e4" : "none",
          }}
        />
        <div
          style={{
            marginBottom: "0.5rem",
          }}
        >
          <button className="board__add-list">Add list</button>
          <button
            className="board__close-add-list"
            onClick={() => setAddAListBtnClicked(false)}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
      </form>
    )
  }

  return (
    <div className="board">
      <div className="board__background">
        <img src="/images/36308.jpg" alt="" />
      </div>
      <div className="board__containner">
        <header>
          <nav className="board__navbar">
            <ul>
              <li className="board__navbar-li board__navbar-li-hover">
                <Link to="">
                  {/* <i className="fa fa-ellipsis-v"></i>
                <i className="fa fa-ellipsis-v"></i>
                <i className="fa fa-ellipsis-v"></i> */}
                  <i className="fa fa-th"></i>
                </Link>
              </li>
              <li className="board__navbar-li board__navbar-li-hover ">
                <Link to="">
                  <div className="board__animation-logo">
                    <h1>Trello</h1>
                    <section className="">
                      <span className="board__animation-logo-rectangle-one"></span>
                      <span className="board__animation-logo-rectangle-two"></span>
                    </section>
                  </div>
                </Link>
              </li>
              <li className="board__navbar-li board__navbar-li-hover workspaces-dropdown">
                <Link to="">
                  <div className="board__li-box">
                    <h3>Workspaces</h3>
                    <span>
                      <i className="fa fa-chevron-down"></i>
                    </span>
                  </div>
                </Link>
              </li>
              <li className="board__navbar-li board__navbar-li-hover recent-dropdown">
                <Link to="">
                  <div className="board__li-box">
                    <h3>Recent</h3>
                    <span>
                      <i className="fa fa-chevron-down"></i>
                    </span>
                  </div>
                </Link>
              </li>
              <li className="board__navbar-li board__navbar-li-hover starred-dropdown">
                <Link to="">
                  <div className="board__li-box">
                    <h3>Starred</h3>
                    <span>
                      <i className="fa fa-chevron-down"></i>
                    </span>
                  </div>
                </Link>
              </li>
              <li className="board__navbar-li board__navbar-li-hover templates-dropdown">
                <Link to="">
                  <div className="board__li-box">
                    <h3>Templates</h3>
                    <span>
                      <i className="fa fa-chevron-down"></i>
                    </span>
                  </div>
                </Link>
              </li>
              <li className="board__navbar-li board__navbar-li-hover one-li-background more-dropdown">
                <Link to="">
                  <div className="board__li-box">
                    <h3>More</h3>
                    <span>
                      <i className="fa fa-chevron-down"></i>
                    </span>
                  </div>
                </Link>
              </li>
              <li className="board__navbar-li board__navbar-li-hover one-li-background create-dropdown">
                <Link to="" className="text-link">
                  Create
                </Link>
                <Link to="" className="icon-link">
                  <i className="fa fa-plus"></i>
                </Link>
              </li>
            </ul>
            <ul>
              <li className="board__navbar-li board__Search-input-container">
                <div className="board__Search-input-box">
                  <input
                    type="text"
                    placeholder="Search"
                    className="board__input"
                  />
                </div>
                <div className="board__navbar-search-icon">
                  <i className="fa fa-search"></i>
                </div>
              </li>
              <li className="board__navbar-li board__li-padding-circle board__navbar-li-hover">
                <Link to="">
                  <i className="fa fa-bell"></i>
                </Link>
              </li>
              <li className="board__navbar-li board__li-padding-circle board__navbar-li-hover board__navbar-information-icon">
                <Link to="">
                  <i className="fa fa-question-circle-o"></i>
                </Link>
              </li>
              <li className="board__navbar-li board__li-padding-circle board__navbar-li-hover">
                <Link to="">
                  <div className="board__account-image">
                    {firstLetterAccount}
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <div className="board__container">
            <aside
              className="board__sidebar"
              style={{
                transform: showSidebar ? "translateX(0)" : "translateX(-1%)",
                width: showSidebar ? "25rem" : "1.2rem",
              }}
            >
              <div
                className="board__show-sidebar-btn"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                {showSidebar ? (
                  <i className="fa fa-chevron-left"></i>
                ) : (
                  <i className="fa fa-chevron-right"></i>
                )}
              </div>
              <section>
                <SidebarItems showSidebar={showSidebar} />
              </section>
            </aside>

            <div className="borad__main-content">
              <div className="board__header">
                <ul>
                  <li className="board__header-li board__header-li-hover">
                    <h1 style={{ color: "#fff" }}>{boardName[0].boardName}</h1>
                  </li>
                  <li
                    className="board__header-li board__header-li-hover"
                    onClick={() => setStarClicked(!starClicked)}
                  >
                    {starClicked ? (
                      <i className="fa fa-star"></i>
                    ) : (
                      <i className="fa fa-star-o"></i>
                    )}
                  </li>
                  <li className="board__header-li board__header-li-hover">
                    <i className="fa fa-user-o"></i>
                  </li>
                  <li className="board__header-li">
                    <button>
                      <i className="fa fa-window-maximize"></i>
                      Board
                    </button>
                  </li>
                </ul>
                <ul>
                  <li className="board__header-li board__header-li-hover">
                    <i className="fa fa-rocket"></i>
                  </li>
                  <li className="board__header-li board__header-li-hover">
                    <i className="fa fa-bolt"></i>
                  </li>
                  <li className="board__header-li board__header-li-hover">
                    <div className="board__header-filter-box">
                      <span>
                        <i className="fa fa-filter"></i>
                      </span>
                      <h3>Filters</h3>
                    </div>
                  </li>
                  <li className="board__header-li">
                    <button>
                      <i className="fa fa-user-plus"></i>
                      Share
                    </button>
                  </li>
                  <li className="board__header-li board__header-li-hover">
                    <i className="fa fa-ellipsis-h"></i>
                  </li>
                </ul>
              </div>
              <div className="board-canvas">
                {listsName.map((item) => {
                  return <List key={item} list={item} />
                })}
                {addAListBtn}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Board

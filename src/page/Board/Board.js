import React, { useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import "./Board.css"
import { useDispatch, useSelector } from "react-redux"
import List from "../../components/List/List"
import SidebarItems from "../../components/SidebarItems/SidebarItems"
import ReactModal from "react-modal"
import { useEffect } from "react"
import { listsNameAction } from "../../action/listsNameAction"
import uuid from "react-uuid"
import { cardsNameAction } from "../../action/cardsNameAction"
import { commentAction } from "../../action/commentAction"
import { accountsAction } from "../../action/accountsAction"
import { boardNameAction } from "../../action/boardNameAction"
import Dropdown from "../../components/Dropdown/Dropdown"

const Board = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const boardId = useParams()
  const { id } = boardId

  const [showSidebar, setShowSidebar] = useState(false)
  const [starClicked, setStarClicked] = useState(false)
  const [addAListBtnClicked, setAddAListBtnClicked] = useState(false)
  const [createBoardBtnClicked, setCreateBoardBtnClicked] = useState(false)

  const userId = JSON.parse(localStorage.getItem("user"))

  const boardNameState = useSelector((state) => state.boardName)
  const { boardName } = boardNameState

  const listsNameState = useSelector((state) => state.listsName)
  const { listsName } = listsNameState

  const cardsState = useSelector((state) => state.cardsName)
  const { cardsName } = cardsState

  const accountState = useSelector((state) => state.accountsList)
  const { accountsList } = accountState

  useEffect(() => {
    dispatch(listsNameAction())
    dispatch(cardsNameAction())
    dispatch(commentAction())
    dispatch(boardNameAction())
    dispatch(accountsAction())
  }, [dispatch])

  const currentBoard = boardName.filter((item) => item.boardId === id)

  const user = accountsList.filter((item) => item.boardId === id)
  const a = Object.values(user)

  // const userName = user[0].user
  // const firstLetterUserName = userName.slice(0, 1)

  const listt = listsName.filter((item) => item.userId === userId)

  const listtt = listt.filter((item) => item.boardId === id)

  const handleCloseModalCreateBoard = () => {
    setCreateBoardBtnClicked(false)
  }

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    content: {
      width: "15rem",
      height: "5%",
      margin: "auto",
      borderRadius: "7px",
      backgroundColor: "#ebecf0",
      // position: "absolote",
      // margin: "2rem",
    },
  }

  const handleBoardTitle = (event) => {
    event.preventDefault()

    localStorage.setItem("boardId", JSON.stringify(uuid()))
    const boardId = JSON.parse(localStorage.getItem("boardId"))

    // axios
    //   .post("https://trello-d791c-default-rtdb.firebaseio.com/boardName.json", {
    //     boardId: boardId,
    //     userId: userId,
    //     boardName: event.target.boardTitle.value,
    //   })
    //   .then((response) => {
    //     console.log(response)
    //     dispatch(boardNameAction())
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    // event.target.boardTitle.value = ""
    // handleCloseModalCreateBoard()
    // navigate(`/board/${boardId}`)

    const boards = localStorage.getItem("boards")
      ? JSON.parse(localStorage.getItem("boards"))
      : []

    localStorage.setItem(
      "boards",
      JSON.stringify([
        ...boards,
        {
          boardId: boardId,
          boardName: event.target.boardTitle.value,
          userId: userId,
        },
      ])
    )

    dispatch(boardNameAction())
    event.target.boardTitle.value = ""
    handleCloseModalCreateBoard()
    navigate(`/board/${boardId}`)
  }

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

  const onWheelScrollCanvas = (evt) => {
    evt.preventDefault();
    evt.target.scrollLeft += evt.deltaY;
  }


  const addListHandle = (event) => {
    event.preventDefault()

    // axios
    //   .post(`https://trello-d791c-default-rtdb.firebaseio.com/listsName.json`, {
    //     boardId: id,
    //     list: event.target.listTitle.value,
    //     listId: uuid(),
    //     userId: userId,
    //   })
    //   .then((response) => {
    //     // console.log(response)
    //     dispatch(listsNameAction())
    //     setAddAListBtnClicked(false)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })

    const lists = localStorage.getItem("lists")
      ? JSON.parse(localStorage.getItem("lists"))
      : []

    localStorage.setItem(
      "lists",
      JSON.stringify([
        ...lists,
        {
          boardId: id,
          list: event.target.listTitle.value,
          listId: uuid(),
          userId: userId,
        },
      ])
    )
    dispatch(listsNameAction())
    setAddAListBtnClicked(false)
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

  const setCopiedValue = (event) => {
    event.preventDefault()
    try {
      navigator.clipboard.writeText(event.target.pathName.value)
      alert("link copied !")
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchList = (event) => {
    dispatch(listsNameAction(null, event.target.value.trim().toLowerCase()))
  }

  return (
    <div className="board">
      <div className="board__background">
        <img src="/images/pexels-pixabay-164175.jpg" alt="" />
      </div>
      <div className="board__containner">
        <header>
          <nav className="board__navbar">
            <ul>
              <li className="board__navbar-li board__navbar-li-hover">
                <Link to="">
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
              <li
                className="board__navbar-li board__navbar-li-hover one-li-background create-dropdown"
                onClick={() => setCreateBoardBtnClicked(true)}
                style={{ position: "relative" }}
              >
                <Link to="" className="text-link">
                  Create
                </Link>
                <Link to="" className="icon-link">
                  <i className="fa fa-plus"></i>
                </Link>
              </li>

              <ReactModal
                isOpen={createBoardBtnClicked}
                onRequestClose={handleCloseModalCreateBoard}
                style={customStyles}
              >
                <form
                  action=""
                  onSubmit={(event) => handleBoardTitle(event)}
                  className="board__create-board-form"
                >
                  <input
                    type="text"
                    name="boardTitle"
                    className="board__create-board-input"
                  />
                  <button type="submit" className="board__create-board-submit">
                    Create
                  </button>
                </form>
              </ReactModal>
            </ul>

            <ul>
              <li className="board__navbar-li board__Search-input-container">
                <div className="board__Search-input-box">
                  
                {/* <input
                    autoComplete="none"
                    type="text"
                    placeholder="Search"
                    name="search"
                    className="board__input"
                    // value={listsFoundBySearch}
                    onChange={handleSearchList}
                  /> */}
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
                    {/* {firstLetterUserName} */}
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
                    <h1 style={{ color: "#fff" }}>
                      {currentBoard.map((item) => {
                        return <div>{item.boardName}</div>
                      })}
                    </h1>
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
                    <Dropdown
                      buttonText={
                        <div>
                          <i className="fa fa-user-plus"> </i>
                          <span>Share</span>
                        </div>
                      }
                    >
                      <div>
                        <form
                          className="dropdown__form"
                          onSubmit={setCopiedValue}
                        >
                          <input
                            type="text"
                            name="pathName"
                            value={location.pathname}
                          />

                          <button>Copy Link</button>
                        </form>
                      </div>
                    </Dropdown>
                  </li>
                  <li className="board__header-li board__header-li-hover">
                    <i className="fa fa-ellipsis-h"></i>
                  </li>
                </ul>
              </div>
              <div className="board-canvas" onWheel={onWheelScrollCanvas}>
                {listtt.map((item) => {
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

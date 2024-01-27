import React, { useMemo, useRef, useState, useEffect } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import "./Board.css"
import { useDispatch, useSelector } from "react-redux"
import List from "../../components/List/List"
import SidebarItems from "../../components/SidebarItems/SidebarItems"
import { listsNameAction } from "../../action/listsNameAction"
import uuid from "react-uuid"
import { cardsNameAction } from "../../action/cardsNameAction"
import { commentAction } from "../../action/commentAction"
import { accountsAction } from "../../action/accountsAction"
import { boardNameAction } from "../../action/boardNameAction"
import Popup from "../../components/Popup/Popup"
import backgroundImage from "../../assets/images/pexels-vincent-rivaud-2471172.jpg"
import Dropdown from "../../components/Dropdown/Dropdown"
import InternetChecker from "../../components/InternetChecker/InternetChecker"

const Board = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const debounceRef = useRef(null)

  const boardId = useParams()
  const { id } = boardId

  const [showSidebar, setShowSidebar] = useState(false)
  const [starClicked, setStarClicked] = useState(false)
  const [addAListBtnClicked, setAddAListBtnClicked] = useState(false)

  const userId = JSON.parse(localStorage.getItem("user"))

  const boardNameState = useSelector((state) => state.boardName)
  const { boardName } = boardNameState

  const listsNameState = useSelector((state) => state.listsName)
  const { listsName, searchItem } = listsNameState

  const cardsState = useSelector((state) => state.cardsName)
  const { cardsName } = cardsState

  const accountState = useSelector((state) => state.accountsList)
  const { accountsList } = accountState

  const search = useSelector((state) => state.searchLists)

  useEffect(() => {
    dispatch(listsNameAction(null, undefined, true, false, null))
    dispatch(cardsNameAction(null, true, false, null, null))
    dispatch(commentAction())
    dispatch(boardNameAction(true, false, null))
    dispatch(accountsAction())
  }, [dispatch])

  const currentBoard = useMemo(() => {
    const currentBoard = boardName.filter((item) => item.boardId === id)

    localStorage.setItem("currentBoard", JSON.stringify(currentBoard))

    return currentBoard
  }, [boardName, dispatch, id])

  const user = accountsList.filter((item) => item.boardId === id)

  const listt = listsName.filter((item) => item.userId === userId)

  const listtt = listt.filter((item) => item.boardId === id)

  listtt.sort((firstList, secondList) => {
    if (firstList.creationTime > secondList.creationTime) {
      return 1
    } else if (firstList.creationTime < secondList.creationTime) {
      return -1
    } else {
      return 0
    }
  })

  const handleAddBoard = (event) => {
    event.preventDefault()

    localStorage.setItem("boardId", JSON.stringify(uuid()))
    const boardId = JSON.parse(localStorage.getItem("boardId"))

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
          creationTime: new Date().getTime(),
        },
      ])
    )

    dispatch(boardNameAction(true, false, null))
    event.target.boardTitle.value = ""
    navigate(`/board/${boardId}`)
  }

  const onWheelScrollCanvas = (evt) => {
    // evt.preventDefault()
    evt.target.scrollLeft += evt.deltaY
  }

  const handleAddList = (event) => {
    event.preventDefault()

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
          creationTime: new Date().getTime(),
        },
      ])
    )
    dispatch(listsNameAction(null, undefined, true, false, null))
    setAddAListBtnClicked(false)
  }

  const handleCopiedValue = (event) => {
    event.preventDefault()
    try {
      navigator.clipboard.writeText(event.target.pathName.value)
      alert("link copied !")
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearchList = (event) => {
    dispatch(
      listsNameAction(
        null,
        event.target.value.trim().toLowerCase(),
        true,
        false,
        null
      )
    )
  }

  let addAListBtn = boardName.length ? (
    <button
      className="board__add-new-list"
      onClick={() => setAddAListBtnClicked(true)}
    >
      <span>
        <i className="fa fa-plus fa-plus-add-list"></i>
      </span>
      <span>Add a list</span>
    </button>
  ) : null

  if (addAListBtnClicked) {
    addAListBtn = (
      <form
        className="board__add-new-list-form"
        onSubmit={(event) => handleAddList(event)}
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

  const handleDebounceRenameBoard = (fn, wait) => {
    let inDebounce = null

    return (event) => {
      fn(boardNameAction(false, true, event))

      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => {
        fn(boardNameAction(true, false, null))
      }, wait)
    }
  }

  // if (!debounceRef.current) {
  // debounceRef.current = debounce(dispatch)
  // }

  useMemo(() => {
    debounceRef.current = handleDebounceRenameBoard(dispatch, 5000)
  }, [debounceRef])

  const handleLogOut = () => {
    localStorage.clear()

    navigate("/")
  }

  return (
    <div
      className="board"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <InternetChecker />
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
              style={{ position: "relative" }}
            >
              <Popup
                btnTitle={
                  <div>
                    <Link to="" className="text-link">
                      Create
                    </Link>
                    <Link to="" className="icon-link">
                      <i className="fa fa-plus"></i>
                    </Link>
                  </div>
                }
              >
                <h2 className="board__create-board-title">
                  Please write the title of the new board
                </h2>
                <form
                  action=""
                  onSubmit={(event) => handleAddBoard(event)}
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
              </Popup>
            </li>
          </ul>

          <ul>
            <li className="board__navbar-li board__Search-input-container">
              <div className="board__Search-input-box">
                <input
                  autoComplete="none"
                  type="search"
                  placeholder="Search"
                  name="search"
                  className="board__input"
                  value={searchItem}
                  onChange={handleSearchList}
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
            <li className="board__navbar-li ">
              <Dropdown btnTitle={<i className="fa fa-cog"></i>}>
                <ul>
                  <li onClick={handleLogOut}>log out</li>
                </ul>
              </Dropdown>
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

          {boardName.length ? (
            <div className="borad__main-content">
              <div className="board__header">
                <ul>
                  <li className="board__header-li">
                    <h1 style={{ color: "#fff" }}>
                      {currentBoard.map((item, index) => {
                        return (
                          <input
                            key={index}
                            type="text"
                            className="board__board-name-input"
                            value={currentBoard[0].boardName}
                            onChange={debounceRef.current}
                          />
                        )
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
                    <Popup
                      btnTitle={
                        <div>
                          <i className="fa fa-user-plus"> </i>
                          <span>Share</span>
                        </div>
                      }
                    >
                      <div>
                        <form
                          className="popup__form"
                          onSubmit={handleCopiedValue}
                        >
                          <input
                            type="text"
                            name="pathName"
                            value={location.pathname}
                          />

                          <button>Copy Link</button>
                        </form>
                      </div>
                    </Popup>
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
          ) : (
            <div className="borad__main-content"></div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Board

import React, { useMemo, useRef, useState, useEffect } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import ListItem from "../../components/ListItem/ListItem"
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
import "./Board.css"

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
      className="flex items-center text-center group h-4 mx-2 my-4 px-4 bg-slate-100 py-5 min-w-64 rounded-md shadow-md shadow-black hover:bg-rose-600/30 hover:text-white *:mx-1"
      onClick={() => setAddAListBtnClicked(true)}
    >
      <span>
        <i className="fa fa-plus text-sm text-fa-color group-hover:!text-white"></i>
      </span>
      <span>Add a list</span>
    </button>
  ) : null

  if (addAListBtnClicked) {
    addAListBtn = (
      <form
        className="flex items-start flex-col justify-center h-auto min-w-64 bg-slate-100 m-4 py-0.5 px-2 text-sm rounded-md shadow-md shadow-black"
        onSubmit={(event) => handleAddList(event)}
      >
        <input
          type="text"
          name="listTitle"
          placeholder="Enter list title..."
          className="w-full bg-transparent py-2 pl-2 border-none rounded font-bold my-2 outline-outline"
          style={{
            border: addAListBtnClicked ? "2px solid #0c66e4" : "none",
          }}
        />
        <div
          style={{
            marginBottom: "0.5rem",
          }}
        >
          <button className="py-1.5 px-4 text-sm bg-bg-btn rounded text-white hover:bg-btn-hover">
            Add list
          </button>
          <button
            className="border-none py-1.5 px-3 rounded ml-2 text-sm bg-gray-300 hover:bg-gray-400"
            onClick={() => setAddAListBtnClicked(false)}
          >
            <i className="fa fa-times text-fa-color"></i>
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

  const handleDebounceMoveList = () => {
    let inDebounce = null

    return (draggedList, hoveredList) => {
      clearTimeout(inDebounce)
      inDebounce = setTimeout(() => {
        dispatch(
          listsNameAction(
            null,
            undefined,
            true,
            false,
            null,
            undefined,
            true,
            hoveredList,
            draggedList
          )
        )
      }, 500)
    }
  }

  const ref = useRef()

  useMemo(() => {
    ref.current = handleDebounceMoveList()
  }, [])

  return (
    <div
      className="bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <InternetChecker />
      <header>
        <nav className="flex justify-between w-full h-6vh p-0 bg-black/30 sticky">
          <ul className="flex items-center">
            <li className="flex items-center justify-center min-w-4 text-white px-2 text-sm h-full hover:bg-rose-600/30">
              <Link to="">
                <i className="fa fa-th "></i>
              </Link>
            </li>
            <li className="group flex items-center justify-center min-w-4 text-white px-2 text-sm h-full hover:bg-slate-100/20">
              <Link to="">
                <div className="flex items-baseline flex-row-reverse peer">
                  <h1 className="ml-1 text-pink-800 font-bold text-2xl">
                    Trello
                  </h1>
                  <section className="group flex justify-center bg-white w-5 h-5 rounded relative">
                    <span className="group-hover:animate-[rectangleOne_0.25s_ease-in_0s_infinite_alternate-reverse] bg-sky-700 w-1 h-3.5 absolute top-0.5 left-1/4 rounded-sm"></span>
                    <span className="group-hover:animate-[rectangleTwo_0.25s_ease-in_0s_infinite_alternate-reverse] bg-pink-900 w-1 h-1.5 absolute top-0.5 right-1/4 rounded-sm"></span>
                  </section>
                </div>
              </Link>
            </li>
            <li className="items-center justify-center min-w-4 text-white px-2 text-sm h-full hover:bg-rose-600/30 hidden sm:flex">
              <Link to="">
                <div className="flex">
                  <h3 className="mr-1">Workspaces</h3>
                  <span>
                    <i className="fa fa-chevron-down text-xs"></i>
                  </span>
                </div>
              </Link>
            </li>
            <li className="items-center justify-center min-w-4 text-white px-2 text-sm h-full hover:bg-rose-600/30 hidden md:flex">
              <Link to="">
                <div className="flex">
                  <h3 className="mr-1">Recent</h3>
                  <span>
                    <i className="fa fa-chevron-down text-xs"></i>
                  </span>
                </div>
              </Link>
            </li>
            <li className="items-center justify-center min-w-4 text-white px-2 text-sm h-full hover:bg-rose-600/30 hidden lg:flex">
              <Link to="">
                <div className="flex">
                  <h3 className="mr-1">Starred</h3>
                  <span>
                    <i className="fa fa-chevron-down text-xs"></i>
                  </span>
                </div>
              </Link>
            </li>
            <li className="items-center justify-center min-w-4 text-white px-2 text-sm h-full hover:bg-rose-600/30 hidden xl:flex">
              <Link to="">
                <div className="flex">
                  <h3 className="mr-1">Templates</h3>
                  <span>
                    <i className="fa fa-chevron-down text-xs"></i>
                  </span>
                </div>
              </Link>
            </li>
            <li className="flex items-center justify-center min-w-4 text-white px-2 text-sm h-full hover:bg-rose-600/30 one-li-background  xl:hidden">
              <Link to="">
                <div className="flex">
                  <h3 className="mr-1">More</h3>
                  <span>
                    <i className="fa fa-chevron-down text-xs"></i>
                  </span>
                </div>
              </Link>
            </li>
            <li
              className="flex items-center justify-center min-w-8 text-white px-2 text-sm h-full hover:bg-rose-600/30 bg-white/30"
              style={{ position: "relative" }}
            >
              <Popup
                btnTitle={
                  <div>
                    <Link to="" className="text-link hidden xl:block">
                      Create
                    </Link>
                    <Link to="" className="icon-link block xl:hidden">
                      <i className="fa fa-plus text-white"></i>
                    </Link>
                  </div>
                }
              >
                <h2 className="text-fa-color mb-8 font-[Shabnam-Thin] font-bold text-start">
                  Please write the title of the new board
                </h2>
                <form
                  action=""
                  onSubmit={(event) => handleAddBoard(event)}
                  className="flex justify-center items-center text-fa-color"
                >
                  <input
                    type="text"
                    name="boardTitle"
                    placeholder="Enter board title..."
                    className="p-1 border-2 border-gray-300 outline-none font-[Shabnam-Thin] font-bold rounded"
                  />
                  <button
                    type="submit"
                    className="py-1.5 px-4 text-sm bg-bg-btn rounded text-white hover:bg-btn-hover ml-2"
                  >
                    Create
                  </button>
                </form>
              </Popup>
            </li>
          </ul>

          <ul className="flex items-center">
            <li className="items-center justify-center min-w-1 px-2 text-sm h-full relative hidden sm:flex">
              <div className="board__Search-input-box ">
                <input
                  autoComplete="none"
                  type="search"
                  placeholder="Search"
                  name="search"
                  className="rounded outline-none border-none border-slate-500 pl-6 py-0.5 font-[Shabnam-Thin] font-bold"
                  value={searchItem}
                  onChange={handleSearchList}
                />
              </div>
              <div className="absolute top-3/6 left-4">
                <i className="fa fa-search text-slate-400"></i>
              </div>
            </li>
            <li className="flex items-center justify-center min-w-4 text-white px-2 text-sm h-full hover:bg-rose-600/30">
              <Link to="">
                <i className="fa fa-bell rotate-45 "></i>
              </Link>
            </li>
            <li className="items-center justify-center min-w-4 text-white px-2 text-sm h-full hover:bg-rose-600/30 hidden md:flex">
              <Link to="">
                <i className="fa fa-question-circle-o text-lg"></i>
              </Link>
            </li>
            <li className="flex items-center justify-center min-w-4 text-white mr-2 text-sm h-full">
              <Dropdown btnTitle={<i className="fa fa-cog text-lg"></i>}>
                <ul className="flex flex-col">
                  <li onClick={handleLogOut} className="py-2 px-4">
                    log out
                  </li>
                </ul>
              </Dropdown>
            </li>
          </ul>
        </nav>
      </header>
      <article className="h-94vh">
        <div className="flex h-94vh">
          <aside
            className="bg-black/50 h-full text-white relative transition-all border-r-2 border-r-white border-solid overflow-hidden z-0"
            style={{
              transform: showSidebar ? "translateX(0)" : "translateX(-1%)",
              width: showSidebar ? "21rem" : "1.3rem",
            }}
          >
            <div
              className="absolute top-2.5 right-0 px-1 text-center hover:bg-rose-600/30"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              {showSidebar ? (
                <i className="fa fa-chevron-left text-xs"></i>
              ) : (
                <i className="fa fa-chevron-right text-xs"></i>
              )}
            </div>
            <section>
              <SidebarItems showSidebar={showSidebar} />
            </section>
          </aside>

          {boardName.length ? (
            <div className="w-full overflow-hidden flex flex-col h-full">
              <nav className="flex flex-wrap items-center justify-between h-auto py-2 w-full bg-white/15 md:flex-nowrap">
                <ul className="flex items-center px-4">
                  <li className="flex mx-1 rounded p-2">
                    <h1 style={{ color: "#fff" }}>
                      {currentBoard.map((item, index) => {
                        return (
                          <input
                            key={index}
                            type="text"
                            className="flex bg-transparent text-white  py-1 px-2 w-40 text-xl border-none outline-none hover:bg-rose-600/50 rounded shadow-md hover:shadow-white"
                            value={currentBoard[0].boardName}
                            onChange={debounceRef.current}
                          />
                        )
                      })}
                    </h1>
                  </li>
                  <li
                    className="flex mx-1 rounded p-2 group hover:bg-rose-600/30"
                    onClick={() => setStarClicked(!starClicked)}
                  >
                    {starClicked ? (
                      <i className="fa fa-star text-yellow-400 hover:scale-110"></i>
                    ) : (
                      <i className="fa fa-star-o group-hover:text-yellow-400"></i>
                    )}
                  </li>
                  <li className="flex mx-1 rounded p-2 hover:bg-rose-600/30">
                    <i className="fa fa-user-o"></i>
                  </li>
                  <li className="flex mx-1 rounded p-2">
                    <button className="font-['Shabnam-Thin'] font-bold text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded *:mx-0.5">
                      <i className="fa fa-window-maximize text-fa-color"></i>
                      <span>Board</span>
                    </button>
                  </li>
                </ul>
                <ul className="flex items-center px-4">
                  <li className="flex mx-1 rounded p-2 hover:bg-rose-600/30">
                    <i className="fa fa-rocket"></i>
                  </li>
                  <li className="flex mx-1 rounded p-2 hover:bg-rose-600/30">
                    <i className="fa fa-bolt"></i>
                  </li>
                  <li className="mx-1 rounded p-2 hover:bg-rose-600/30 hidden md:flex">
                    <div className="flex text-white text-sm *:mx-1">
                      <div>
                        <i className="fa fa-filter"></i>
                      </div>
                      <h3>Filters</h3>
                    </div>
                  </li>
                  <li className="flex mx-1 rounded p-2">
                    <Popup
                      btnTitle={
                        <div className="font-['Shabnam-Thin'] font-bold text-sm px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded *:mx-0.5">
                          <i className="fa fa-user-plus text-fa-color"></i>
                          <span>Share</span>
                        </div>
                      }
                    >
                      <div>
                        <form className="*:mx-3" onSubmit={handleCopiedValue}>
                          <input
                            type="text"
                            name="pathName"
                            className="flex max-w-72 p-1 border-2 border-red-300 outline-none rounded font-['Shabnam-Thin'] font-bold text-sm"
                            value={location.pathname}
                          />
                          <button className="text-white bg-bg-btn font-['Shabnam-Thin'] font-bold text-sm px-3 py-1 rounded mt-2">
                            Copy Link
                          </button>
                        </form>
                      </div>
                    </Popup>
                  </li>
                  <li className="flex mx-1 rounded p-2 hover:bg-rose-600/30">
                    <i className="fa fa-ellipsis-h"></i>
                  </li>
                </ul>
              </nav>

              <div
                className="flex overflow-x-auto items-start h-full pl-2 board-canvas"
                onWheel={onWheelScrollCanvas}
              >
                {listtt.map((item) => {
                  return (
                    <ListItem key={item} list={item} moveList={ref.current} />
                  )
                })}

                {addAListBtn}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </article>
    </div>
  )
}

export default Board

import React from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import BoardItem from "../BoardItem/BoardItem"

const SidebatItems = ({ showSidebar }) => {
  const boardNameState = useSelector((state) => state.boardName)
  const { boardName } = boardNameState

  const userId = JSON.parse(localStorage.getItem("user"))

  const boards = boardName.filter((item) => {
    return item.userId === userId
  })

  boards.sort((firtsBoard, secondBoard) => {
    if (firtsBoard.creationTime > secondBoard.creationTime) {
      return 1
    } else if (firtsBoard.creationTime < secondBoard.creationTime) {
      return -1
    } else {
      return 0
    }
  })

  return (
    <div
      className="font-['Shabnam-Thin'] font-bold"
      style={{ display: showSidebar ? "block" : "none" }}
    >
      <ul>
        <li className="sidebar-items__navbar-li">
          <Link to="">
            <div className="flex flex-row *:mx-2 px-4 py-2 hover:bg-black/30 transition-all">
              <span>
                <i className="fa fa-trello"></i>
              </span>
              <h3>Boards</h3>
            </div>
          </Link>
        </li>
        <li className="sidebar-items__navbar-li">
          <Link to="">
            <div className="flex flex-row *:mx-2 px-4 py-2 hover:bg-black/30 transition-all">
              <span>
                <i className="fa fa-user-o"></i>
              </span>
              <h3>Members</h3>
            </div>
          </Link>
        </li>
        <li className="sidebar-items__navbar-li">
          <Link to="">
            <div className="flex flex-row *:mx-2 px-4 py-2 hover:bg-black/30 transition-all">
              <span>
                <i className="fa fa-cog"></i>
              </span>
              <h3>Workspace Settings</h3>
            </div>
          </Link>
        </li>
      </ul>
      <h2 className="mx-4 mb-2 mt-6 text-lg">Workspace views</h2>
      <ul>
        <li className="sidebar-items__navbar-li">
          <Link to="">
            <div className="flex flex-row *:mx-2 px-4 py-2 hover:bg-black/30 transition-all">
              <span>
                <i className="fa fa-table"></i>
              </span>
              <h3>Table</h3>
            </div>
          </Link>
        </li>
        <li className="sidebar-items__navbar-li">
          <Link to="">
            <div className="flex flex-row *:mx-2 px-4 py-2 hover:bg-black/30 transition-all">
              <span>
                <i className="fa fa-calendar"></i>
              </span>
              <h3>Calender</h3>
            </div>
          </Link>
        </li>
      </ul>

      <h2 className="mx-4 mb-2 mt-6 text-lg">Your Boards</h2>
      {boards.map((item, index) => {
        return <BoardItem board={item} key={index} />
      })}
      {boards.length ? null : (
        <div className="text-center text-red-600 text-sm underline">
          You dont have any boards !
        </div>
      )}
    </div>
  )
}

export default SidebatItems

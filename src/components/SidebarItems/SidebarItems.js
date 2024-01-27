import React, { useState } from "react"
import { Link } from "react-router-dom"
import "./SidebarItems.css"
import { useSelector } from "react-redux"
import BoardIcon from "../BoardIcon/BoardIcon"

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

  // const [massege, setMassege] = useState(() => {
  //   if (boards.length) {
  //     return ""
  //   } else {
  //     return <div className="sidebar-massage">You dont have any boards</div>
  //   }
  // })

  return (
    <div
      className="sidebar-items"
      style={{ display: showSidebar ? "block" : "none" }}
    >
      <ul>
        <li
          className={`sidebar-items__navbar-li ${
            showSidebar ? "sidebar-items__navbar-li-hover" : "1"
          }`}
        >
          <Link to="">
            <div>
              <h3>Boards</h3>
              <span>
                <i className="fa fa-trello"></i>
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`sidebar-items__navbar-li ${
            showSidebar ? "sidebar-items__navbar-li-hover" : "1"
          }`}
        >
          <Link to="">
            <div>
              <h3>Members</h3>
              <span>
                <i className="fa fa-user-o"></i>
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`sidebar-items__navbar-li ${
            showSidebar ? "sidebar-items__navbar-li-hover" : "1"
          }`}
        >
          <Link to="">
            <div>
              <h3>Workspace Settings</h3>
              <span>
                <i className="fa fa-cog"></i>
              </span>
            </div>
          </Link>
        </li>
      </ul>
      <h2>Workspace views</h2>
      <ul>
        <li
          className={`sidebar-items__navbar-li ${
            showSidebar ? "sidebar-items__navbar-li-hover" : "1"
          }`}
        >
          <Link to="">
            <div>
              <h3>Table</h3>
              <span>
                <i className="fa fa-table"></i>
              </span>
            </div>
          </Link>
        </li>
        <li
          className={`sidebar-items__navbar-li ${
            showSidebar ? "sidebar-items__navbar-li-hover" : "1"
          }`}
        >
          <Link to="">
            <div>
              <h3>Calender</h3>
              <span>
                <i className="fa fa-calendar"></i>
              </span>
            </div>
          </Link>
        </li>
      </ul>

      <h2>Your Boards</h2>
      {boards.map((item, index) => {
        return <BoardIcon board={item} key={index} />
      })}
      {boards.length ? null : (
        <div className="sidebar-massage">You dont have any boards!</div>
      )}
    </div>
  )
}

export default SidebatItems

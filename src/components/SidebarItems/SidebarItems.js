import React from "react"
import { Link } from "react-router-dom"
import "./SidebarItems.css"

const SidebatItems = ({ showSidebar }) => {
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
    </div>
  )
}

export default SidebatItems

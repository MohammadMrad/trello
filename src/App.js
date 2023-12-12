import React from "react"
import { Routes, Route } from "react-router-dom"
import LogIn from "./page/LogIn/LogIn"
import SignUp from "./page/SignUp/SignUp"
import Home from "./page/Home/Home"
import Welcome from "./page/Welcome/Welcome"
import BoardName from "./page/BoardName/BoardName"
import ListsName from "./page/ListsName/ListsName"
import CartName from "./page/CartName/CartName"
import Board from "./page/Board/Board"

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/signUp/welcome" element={<Welcome />} />
        <Route path="/signUp/boardName" element={<BoardName />} />
        <Route path="/signUp/listsName" element={<ListsName />} />
        <Route path="/signUp/CartName" element={<CartName />} />
        <Route path="/board/:id?" element={<Board />} />
      </Routes>
    </div>
  )
}

export default App

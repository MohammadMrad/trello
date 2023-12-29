import React from "react"
import { useNavigate } from "react-router-dom"
import "./BoardIcon.css"

const BoardIcon = ({ board }) => {
  const navigate = useNavigate()

  const handleChangeBoard = (boardId) => {
    navigate(`/board/${boardId}`)
  }

  return (
    <div
      className="board-icon"
      onClick={() => handleChangeBoard(board.boardId)}
    >
      {board.boardName}
    </div>
  )
}

export default BoardIcon

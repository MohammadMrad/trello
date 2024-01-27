import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./BoardIcon.css"
import { useSelector, useDispatch } from "react-redux"
import { boardNameAction } from "../../action/boardNameAction"

const BoardIcon = ({ board }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const boardNameState = useSelector((state) => state.boardName)
  const { boardName } = boardNameState

  const userId = JSON.parse(localStorage.getItem("user"))

  const boards = boardName.filter((item) => {
    return item.userId === userId
  })

  const handleChangeBoard = (boardId) => {
    navigate(`/board/${boardId}`)
  }

  const handleRemoveBoard = async (board) => {
    const updatedBoards = boards.filter((item) => {
      return item.boardId !== board.boardId
    })

    localStorage.setItem("boards", JSON.stringify(updatedBoards))

    const uppdatedBoards = await JSON.parse(localStorage.getItem("boards"))

    if (uppdatedBoards.length > 0) {
      navigate(`/board/${uppdatedBoards[0].boardId}`)
    } else {
      navigate(`/board`)
    }

    dispatch(boardNameAction(true, false, null))
  }

  return (
    <div
      className="board-icon"
      onClick={() => handleChangeBoard(board.boardId)}
    >
      {board.boardName}
      <div className="trash-box" onClick={() => handleRemoveBoard(board)}>
        <i className="fa fa-trash-o"></i>
      </div>
    </div>
  )
}

export default BoardIcon

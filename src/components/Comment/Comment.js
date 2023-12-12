import React from "react"
import "./Comment.css"

const Comment = ({ comment }) => {
  return <div className="one-comment">{comment.comment}</div>
}

export default Comment

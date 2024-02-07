const Comment = ({ comment }) => {
  return (
    <div className="flex text-slate-800 bg-white m-1 py-1 px-2 rounded font-['Shabnam-Thin'] font-bold text-sm shadow-md">
      {comment.comment}
    </div>
  )
}

export default Comment

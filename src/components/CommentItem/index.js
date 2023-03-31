// Write your code here
import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {eachComment, deleteFunction, onClickLike} = props
  const {userName, comment, date, id, bgClass, isLiked} = eachComment
  const firstLetter = userName.slice(0, 1).toUpperCase()

  const updatedDate = formatDistanceToNow(date)

  const onClickDelete = () => {
    deleteFunction(id)
  }

  const onClickLikeButton = () => {
    onClickLike(id)
  }

  const likedImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  return (
    <>
      <li className="commentContainer">
        <div className="personContainer">
          <div className={`${bgClass} firstLetter`}>
            <p>{firstLetter}</p>
          </div>
          <div className="nameAndComment">
            <div className="nameAndDate">
              <h1 className="personName">{userName}</h1>
              <p className="commentDate">{updatedDate}</p>
            </div>
            <p className="personComment">{comment}</p>
          </div>
        </div>
      </li>
      <div className="deleteContainer">
        <div className="likeContainer">
          <img src={likedImage} className="likedImage" alt="like" />
          <button onClick={onClickLikeButton} type="button" className="like">
            Like
          </button>
        </div>
        <button
          onClick={onClickDelete}
          className="deleteButton"
          type="button"
          data-testid="delete"
        >
          <img
            className="deleteImage"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>
      <hr className="hr-line" />
    </>
  )
}

export default CommentItem

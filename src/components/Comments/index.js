import {Component} from 'react'
import {v4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    userName: '',
    comment: '',
    commentList: [],
    count: 0,
  }

  onChangeUserName = event => {
    this.setState({userName: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  onClickAddComment = event => {
    event.preventDefault()
    const {userName, comment, commentList} = this.state

    const backgroundClass =
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    const newComment = {
      id: v4(),
      userName,
      comment,
      date: new Date(),
      isLiked: false,
      bgClass: backgroundClass,
    }

    const updatedCommentList = [...commentList, newComment]

    this.setState(prevState => ({
      commentList: updatedCommentList,
      count: prevState.count + 1,
      userName: '',
      comment: '',
    }))
  }

  onDelete = id => {
    const {commentList} = this.state

    const updatedComment = commentList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState(prevState => ({
      commentList: [...updatedComment],
      count: prevState.count - 1,
    }))
  }

  onClickLike = id => {
    const {commentList} = this.state

    const filteredComment = commentList.filter(eachComment => {
      if (eachComment.id === id) {
        return {...eachComment, isLiked: !eachComment.isLiked}
      }
      return {eachComment}
    })
    this.setState({commentList: [...filteredComment]})
  }

  render() {
    const {userName, comment, commentList, count} = this.state

    return (
      <div className="appContainer">
        <div className="container">
          <h1 className="commentHeading">Comments</h1>
          <div className="mainContainer">
            <form onSubmit={this.onClickAddComment} className="inputContainer">
              <p className="label" htmlFor="name">
                Say something about 4.0 Technologies
              </p>
              <input
                value={userName}
                onChange={this.onChangeUserName}
                className="inputName"
                id="name"
                type="text"
                placeholder="Your Name"
              />
              <textarea
                value={comment}
                onChange={this.onChangeComment}
                rows="8"
                className="inputComment"
                type="text"
                placeholder="Your Comment"
              />
              <button type="submit" className="button">
                Add Comment
              </button>
            </form>
            <img
              className="commentImage"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
        </div>
        <hr className="hr-line" />
        <div className="countContainer">
          <div className="count">
            <p>{count}</p>
          </div>
          <p className="commentsCount">Comments</p>
        </div>

        <ul className="listContainer">
          {commentList.map(eachComment => (
            <CommentItem
              onClickLike={this.onClickLike}
              deleteFunction={this.onDelete}
              eachComment={eachComment}
              key={eachComment.id}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Comments

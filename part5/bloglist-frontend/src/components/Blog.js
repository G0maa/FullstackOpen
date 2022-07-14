import PropTypes from 'prop-types'
import { useState } from 'react'

const Blog = ({ blog, handleLike, handleDelete, userName }) => {
  const [isFull, setIsFull] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButtonStyle = {
    display: userName === blog.user.username ? '' : 'none'
  }
  // A Problem:
  // My implementation in the backend differs from examples solution,
  // not because it's wrong but because I solved the optional excercises (?I think?)
  // A solution:
  // Have a dedicated like function in the backend :)

  const incrementLike = () => {
    const newBlog = { ...blog }
    newBlog.likes += 1
    handleLike(newBlog)
  }

  const confirmDelete = () => {
    const ans = window.confirm(`Sure about deleting "${blog.title}?"`)
    if(ans === true) {
      handleDelete(blog.id)
    }
  }

  if(!isFull) {
    return (
      <div className='blogs' style={blogStyle}>
        {blog.title} {blog.author}
        <button type="button" onClick={() => setIsFull(!isFull)}>Show</button>
      </div>
    )
  }

  return (
    <div className='blogs' style={blogStyle}>
      <ul>
        <li>Title: {blog.title}</li>
        <li>URL: <a href={blog.url}>{blog.url}</a></li>
        <li>Likes: {blog.likes} <button className='like-button' type='button' onClick={incrementLike}>like</button></li>
        <li>Author: {blog.author}</li>
      </ul>
      <button type="button" onClick={() => setIsFull(!isFull)}>Hide</button>
      <button type="button" onClick={confirmDelete} style={deleteButtonStyle}>Delete</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
}

export default Blog
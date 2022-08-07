import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteBlog,
  putLike,
  fetchBlogDetails,
  postComment,
} from '../reducers/blogsReducer'
import { useParams, useNavigate } from 'react-router-dom'
import { Header, Segment, Button, Label, Icon } from 'semantic-ui-react'

const Blog = () => {
  const dispatch = useDispatch()
  const blogId = useParams().id
  const user = useSelector((state) => state.user)
  const blog = useSelector((state) =>
    state.blogs.find((blogT) => blogT.id === blogId)
  )
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  useEffect(() => {
    dispatch(fetchBlogDetails(blogId))
  }, [])

  if (!blog || !blog.user) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  const handleLike = () => {
    const likedBlog = { ...blog, likes: blog.likes + 1 }
    dispatch(putLike(likedBlog))
  }

  const handleDelete = () => {
    const ans = window.confirm(`Sure about deleting "${blog.title}?"`)
    if (ans === true) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const handleCommment = (event) => {
    event.preventDefault()
    const newBlog = { ...blog, comments: [...blog.comments, comment] }
    dispatch(postComment(newBlog))
    setComment('')
  }

  const deleteButtonStyle = {
    display: user && user.username === blog.user.username ? '' : 'none',
  }

  return (
    <>
      <Segment className="blogs">
        <Header as="h2" dividing>
          {blog.title} by {blog.author}
        </Header>
        <Segment basic>
          <a href={blog.url} target="_blank" rel="noreferrer">
            {blog.url}
          </a>
        </Segment>
        <Button
          as="div"
          id="like-btn"
          labelPosition="right"
          className="like-button"
          type="button"
          onClick={() => handleLike()}
        >
          <Button icon>
            <Icon name="heart" />
            Like
          </Button>
          <Label id="likes-count-label">{blog.likes}</Label>
        </Button>

        <Button
          as="div"
          id="delete-btn"
          labelPosition="right"
          type="button"
          onClick={() => handleDelete()}
          style={deleteButtonStyle}
        >
          <Button icon>
            <Icon name="delete" />
          </Button>
          <Label>Delete</Label>
        </Button>
        <Header size="small">Added by {blog.user.username}</Header>
      </Segment>
      <Segment>
        <h3>Comments </h3>
        <form onSubmit={handleCommment}>
          <input
            type="text"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment, idx) => (
            <li key={idx}>{comment}</li>
          ))}
        </ul>
      </Segment>
    </>
  )
}

export default Blog

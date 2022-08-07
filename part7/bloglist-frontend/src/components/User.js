import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserBlogs } from '../reducers/usersReducer'
import { useParams } from 'react-router-dom'
import { Segment } from 'semantic-ui-react'

const User = () => {
  const dispatch = useDispatch()
  const userId = useParams().id

  useEffect(() => {
    dispatch(fetchUserBlogs(userId))
  }, [])

  const user = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  )

  if (!user) {
    return <p>Loading...</p>
  }

  return (
    <>
      <Segment>
        <h2>{user.name}</h2>
        <h3>Added Blogs: </h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </Segment>
    </>
  )
}

export default User

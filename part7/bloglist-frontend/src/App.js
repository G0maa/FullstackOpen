import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchAllBlogs } from './reducers/blogsReducer'
import { initalizeUser } from './reducers/userReducer'
import LoginFrom from './components/LoginForm'
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Navbar from './components/Navbar'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import { fetchAllUsers } from './reducers/usersReducer'
import { Segment } from 'semantic-ui-react'

const App = () => {
  const dispatch = useDispatch()

  // useEffect gets executed in the order they're defined in.
  useEffect(() => {
    console.log('User initialization...')
    dispatch(initalizeUser())
  }, [])

  useEffect(() => {
    dispatch(fetchAllBlogs())
    dispatch(fetchAllUsers())
  }, [])

  return (
    <div>
      <Notification />
      <Navbar />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/login" element={<LoginFrom />} />
      </Routes>
      <Segment>
        <em>FullstackOpen 2022 - Bloglist App - HTI Egypt</em>
      </Segment>
    </div>
  )
}

export default App

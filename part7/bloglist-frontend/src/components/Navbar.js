import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../reducers/userReducer'
import { Menu, Message, Button } from 'semantic-ui-react'
import { useState } from 'react'

const Navbar = () => {
  const navigate = useNavigate()
  const [msgVisible, setMsgVisible] = useState(true)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    navigate(0)
  }

  if (!user) {
    return (
      <>
        {msgVisible && (
          <Message
            info
            onDismiss={() => setMsgVisible(false)}
            header="You are not logged in"
            content="You will have some limited functionalitiy :)"
          />
        )}
        <Menu stackable>
          <Menu.Item header>BlogList App</Menu.Item>
          <Menu.Item as={Link} to="/">
            Blogs
          </Menu.Item>
          <Menu.Item as={Link} to="/users">
            Users
          </Menu.Item>
          <Menu.Item as={Link} to="/login">
            Login
          </Menu.Item>
        </Menu>
      </>
    )
  }

  return (
    <>
      <Menu stackable>
        <Menu.Item header>BlogList App</Menu.Item>
        <Menu.Item as={Link} to="/">
          Blogs
        </Menu.Item>
        <Menu.Item as={Link} to="/users">
          Users
        </Menu.Item>
        <Menu.Item>
          <Message size="mini">
            <Message.Header>
              Welcome back &apos;{user.name}&apos;!
            </Message.Header>
          </Message>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <Button onClick={() => handleLogout()}>Logout</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  )
}

export default Navbar

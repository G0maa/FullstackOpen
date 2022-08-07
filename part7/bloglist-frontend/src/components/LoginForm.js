import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { loginUser } from '../reducers/userReducer'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'

const LoginFrom = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(loginUser(username, password))
    setUsername('')
    setPassword('')
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <Segment>
        <h2>Login to Bloglist App</h2>
        <Grid>
          <Grid.Column style={{ maxWidth: 300 }}>
            <Form onSubmit={handleLogin}>
              <Form.Field
                label="Username"
                control="input"
                type="text"
                value={username}
                name="Username"
                id="username"
                onChange={({ target }) => setUsername(target.value)}
              />
              <Form.Field
                label="Pasword"
                type="password"
                value={password}
                control="input"
                name="Password"
                id="password"
                onChange={({ target }) => setPassword(target.value)}
              />

              <Button id="login-button" type="submit" color="blue">
                Login
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  )
}

export default LoginFrom

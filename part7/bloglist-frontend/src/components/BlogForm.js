import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { Header, Grid, Form, Segment, Button } from 'semantic-ui-react'

const BlogForm = () => {
  const dispatch = useDispatch()

  // Optional: Group these in a single hook.
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [isVisible, setIsVisible] = useState(false)

  const handleNewBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
    dispatch(createBlog(newBlog))
    setIsVisible(false)
  }

  if (isVisible)
    return (
      <Segment>
        <Grid>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h3">Create new</Header>
            <Form onSubmit={handleNewBlog}>
              <Form.Input
                label="Blog title"
                type="text"
                value={blogTitle}
                name="BlogTitle"
                placeholder="Enter blog title here..."
                id="blogTitle"
                onChange={({ target }) => setBlogTitle(target.value)}
              />
              <Form.Input
                label="Blog author"
                type="text"
                value={blogAuthor}
                name="BlogAuthor"
                placeholder="Enter blog author here..."
                id="blogAuthor"
                onChange={({ target }) => setBlogAuthor(target.value)}
              />
              <Form.Input
                label="Blog URL"
                type="text"
                value={blogUrl}
                name="BlogUrl"
                placeholder="Enter blog URL here..."
                id="blogUrl"
                onChange={({ target }) => setBlogUrl(target.value)}
              />
              <Button primary id="create-blog-button" type="submit">
                Create
              </Button>
              <Button
                secondary
                type="button"
                onClick={() => setIsVisible(!isVisible)}
              >
                Hide Form
              </Button>
            </Form>
          </Grid.Column>
        </Grid>
      </Segment>
    )

  return (
    <Button
      color="green"
      type="button"
      onClick={() => setIsVisible(!isVisible)}
    >
      Submit Blog
    </Button>
  )
}

export default BlogForm

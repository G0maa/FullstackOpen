import { Header, Segment } from 'semantic-ui-react'
import BlogList from './BlogList'
import BlogForm from './BlogForm'

const Blogs = () => {
  return (
    <>
      <Segment>
        <Header as="h2">Blogs list</Header>
        <BlogList />
        <BlogForm />
      </Segment>
    </>
  )
}

export default Blogs

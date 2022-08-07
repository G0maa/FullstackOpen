import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Label, Icon } from 'semantic-ui-react'

const BlogList = () => {
  const blogList = useSelector((state) => state.blogs)

  return (
    <>
      <Menu vertical id="blogList-Menu">
        {blogList.map((blog) => (
          <Menu.Item key={blog.id} link>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            <Label>
              <Icon name="heart" /> {blog.likes}
            </Label>
          </Menu.Item>
        ))}
      </Menu>
    </>
  )
}

export default BlogList

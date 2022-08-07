const dummy = () => 1

const totalLikes = (blogs) => {
  const reduceFunc = (sum, item) => sum + item.likes

  return blogs.reduce(reduceFunc, 0)
}

const favoriteBlog = (blogs) => {
  const favBlog = {
    title: 'N/A',
    author: 'N/A',
    likes: 0,
  }

  blogs.forEach((blog) => {
    if (blog.likes > favBlog.likes) {
      favBlog.title = blog.title
      favBlog.author = blog.author
      favBlog.likes = blog.likes
    }
  })

  // Better than this?
  // const { title, author, likes } = blogs
  //     .reduce(
  //         (mostLiked, element) => (element.likes > mostLiked.likes ? element : mostLiked),
  //         { likes: 0 },
  //     )
  return favBlog
}

// {authorName, {likes: 3, blgs: 3,}}, now single function, more DRY,
// but what about comlpexity?
const getAuthorsMap = (blogs) => {
  const authorsMap = new Map()

  blogs.forEach((blog) => {
    if (authorsMap.has(blog.author)) {
      const entery = authorsMap.get(blog.author)
      entery.likes += blog.likes
      entery.blogs += 1
      authorsMap.set(blog.author, entery)
    } else {
      authorsMap.set(blog.author, { likes: blog.likes, blogs: 1 })
    }
  })

  return authorsMap
}

// I think O(nlogn)
const mostBlogs = (blogs) => {
  const authorsMap = getAuthorsMap(blogs)

  const authorWithMostBlogs = {
    name: 'N/A',
    blogs: 0,
  }

  authorsMap.forEach((dataObj, authorName) => {
    if (dataObj.blogs > authorWithMostBlogs.blogs) {
      authorWithMostBlogs.name = authorName
      authorWithMostBlogs.blogs = dataObj.blogs
    }
  })

  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  const authorsMap = getAuthorsMap(blogs)

  const authorWithMostLikes = {
    name: 'N/A',
    likes: 0,
  }

  authorsMap.forEach((dataObj, authorName) => {
    if (dataObj.likes > authorWithMostLikes.likes) {
      authorWithMostLikes.name = authorName
      authorWithMostLikes.likes = dataObj.likes
    }
  })

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

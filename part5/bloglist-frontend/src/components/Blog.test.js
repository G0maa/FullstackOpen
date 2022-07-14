import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Testing <Blog />', () => {
  let container
  const dummyLike = jest.fn()
  const dummyDelete = jest.fn()
  beforeEach(() => {

    const sampleBlog = {
      title: 'Testing title',
      author: 'Testing author',
      url: '/testing_url',
      likes: 1,
      user: {
        username: 'test'
      }
    }

    container = render(
      <Blog
        blog={sampleBlog}
        handleLike={dummyLike}
        handleDelete={dummyDelete}
        userName='test'
      />
    ).container
  })

  test('By default renders blog title and author only', () => {
    const titleAndAuthor = screen.getByText('Testing title Testing author')
    expect(titleAndAuthor).toBeDefined()

    const url = container.querySelector('a')
    // I have a different implementation so I am not sure
    // how will it be implemenetd in differnt scinarios.
    const likes = screen.queryByText('Likes: 1')
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('When clicking show button, url and likes show up', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show')
    await user.click(button)

    screen.getByRole('link')
    screen.getByText('Likes: 1')
  })

  test('If like button is clicked twice, then callback shows so', async () => {
    const user = userEvent.setup()

    const buttonShow = screen.getByText('Show')
    await user.click(buttonShow)

    const buttonLike = screen.getByText('like')
    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(dummyLike.mock.calls).toHaveLength(2)
  })
})
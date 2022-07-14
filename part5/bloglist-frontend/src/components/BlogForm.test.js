import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogFrom'

test('Checking correct info are provided to props function', async () => {
  const testBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test url'
  }

  const dummySubmit = jest.fn()
  render(<BlogForm submitBlog={dummySubmit} />)

  const user = userEvent.setup()

  const titleInput = screen.getByPlaceholderText('Enter blog title here...')
  const authorInput = screen.getByPlaceholderText('Enter blog author here...')
  const urlInput = screen.getByPlaceholderText('Enter blog URL here...')

  const createButton = screen.getByText('Create')

  await user.type(titleInput, 'test title')
  await user.type(authorInput, 'test author')
  await user.type(urlInput, 'test url')

  await user.click(createButton)

  console.log(dummySubmit.mock.calls[0][0])
  expect(dummySubmit.mock.calls[0][0]).toEqual(testBlog)
})
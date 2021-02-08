import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import { Messages } from '../example/App'
import { MessagesProvider } from '../src/contexts/messages-provider'

export function renderComponent(children, props = {}) {
  return {
    ...render(
      <MessagesProvider {...props}>{children}</MessagesProvider>
    ),
  }
}

it('renders an Add Message Button', async () => {
  const { findByText } = renderComponent(<Messages />)
  await findByText(/Add Message/)
})

it('adds a message when clicking the Add Message Button', async () => {
  const { findByText, queryByText } = renderComponent(<Messages />)
  const removeMessages = queryByText(/Remove Message/)
  expect(removeMessages).not.toBeInTheDocument()
  const button = await findByText(/Add Message/)
  button.click()
  await findByText(/Remove Message/)
})

it('removes a message when clicking the Remove Message Button', async () => {
  const { findByText, queryByText } = renderComponent(<Messages />)
  let button = await findByText(/Add Message/)
  button.click()
  button = await findByText(/Remove Message/)
  button.click()
  const removeMessages = queryByText(/Remove Message/)
  expect(removeMessages).not.toBeInTheDocument()
})

it('alerts screenReader on Add Message', async () => {
  const screenReaderAlert = jest.fn()
  const { findByText } = renderComponent(<Messages />, {
    screenReaderAlert,
  })
  const button = await findByText(/Add Message/)
  button.click()
  expect(screenReaderAlert).toHaveBeenCalled()
})

it('alerts screenReader on Remove Message', async () => {
  const removeScreenReaderAlert = jest.fn()
  const { findByText } = renderComponent(<Messages />, {
    removeScreenReaderAlert,
  })
  let button = await findByText(/Add Message/)
  button.click()
  button = await findByText(/Remove Message/)
  button.click()
  expect(removeScreenReaderAlert).toHaveBeenCalled()
})

it('renders messages provided', async () => {
  const { findByText } = renderComponent(<Messages />, {
    initialMessages: ['message1', 'message2'],
  })
  await findByText(/message1/)
  await findByText(/message2/)
})

it('renders messages provided and does the provided transform', async () => {
  const { findByText } = renderComponent(<Messages />, {
    initialMessages: [
      { customStatus: 'status1', message: 'message1' },
    ],
    initialMessageTransform: (m) => ({
      message: m.message,
      status: m.customStatus,
    }),
  })
  await findByText(/message1/)
  await findByText(/status1/)
})

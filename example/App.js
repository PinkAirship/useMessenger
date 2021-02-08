import React from 'react'

import { MessagesProvider, useMessenger } from '../src'
import { nanoid } from 'nanoid'

export default function App() {
  return (
    <MessagesProvider
      initialMessages={[
        {
          message: nanoid(),
          customStatus: 'mine',
          id: 'will be ignored',
        },
      ]}
      initialMessageTransform={(m) => ({
        message: m.message,
        status: m.customStatus,
        id: m.id,
      })}
    >
      <div>
        <MakeMessage />
        <MakeDismissableMessage />
        <MessageDisplay />
      </div>
    </MessagesProvider>
  )
}

export function Messages() {
  return (
    <div>
      <MakeMessage />
      <MessageDisplay />
    </div>
  )
}

function MakeMessage() {
  const { addMessage } = useMessenger()
  return (
    <input
      type="button"
      onClick={() => addMessage(nanoid(), 'err')}
      value="Add Message"
    />
  )
}

function MakeDismissableMessage() {
  const { addMessage, removeMessage } = useMessenger()

  const dismissableAddMessage = () => {
    const messageId = addMessage('my message')
    // Will be removed in two seconds
    setTimeout(() => removeMessage(messageId), 2000)
  }
  return (
    <input
      type="button"
      onClick={() => dismissableAddMessage(nanoid())}
      value="Add Dismissable Message"
    />
  )
}

function MessageDisplay() {
  const { messages } = useMessenger()

  return (
    <div>
      {Object.values(messages).map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  )
}

function Message({ message }) {
  const { removeMessage } = useMessenger()
  return (
    <div>
      {message.message} | {message.status}
      <input
        type="button"
        onClick={() => removeMessage(message.id)}
        value="Remove Message"
      />
    </div>
  )
}

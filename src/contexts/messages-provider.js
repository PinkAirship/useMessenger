import React, { useState } from 'react'
import { nanoid } from 'nanoid'

export const MessageContext = React.createContext({
  messages: {},
  addMessage: () => {},
  removeMessage: () => {},
})

export function MessagesProvider({
  children,
  screenReaderAlert = () => {},
  removeScreenReaderAlert = () => {},
  initialMessages = [],
  initialMessageTransform = (message) => ({ message, status: '' }),
}) {
  const startMessages = {}
  initialMessages.forEach((message) => {
    const id = nanoid()
    startMessages[id] = {
      ...initialMessageTransform(message),
      ...{ id },
    }
  })

  const [messages, setMessages] = useState(startMessages)

  const removeMessage = (messageId) => {
    const newMessages = { ...messages }
    delete newMessages[messageId]
    setMessages(newMessages)
    removeScreenReaderAlert(messageId)
  }

  const addMessage = (message, status) => {
    const newMessages = { ...messages }
    const id = nanoid()
    newMessages[id] = { id, message, status }
    setMessages(newMessages)
    screenReaderAlert(id, message, status)
    return id
  }

  const contextValue = {
    messages,
    addMessage: (message, status) => addMessage(message, status),
    removeMessage: (messageId) => removeMessage(messageId),
  }

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  )
}

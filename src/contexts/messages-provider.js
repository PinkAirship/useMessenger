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
  initialMessageTransform = (message) => ({ message, options: {} }),
}) {
  const startMessages = {}
  initialMessages.forEach((message) => {
    const id = nanoid()
    startMessages[id] = {
      ...initialMessageTransform(message),
      ...{ id },
      ...(options.status
        ? { status: options.status }
        : { status: '' }),
    }
  })

  const [messages, setMessages] = useState(startMessages)

  const removeMessage = (messageId) => {
    const newMessages = { ...messages }
    delete newMessages[messageId]
    setMessages(newMessages)
    removeScreenReaderAlert(messageId)
  }

  const addMessage = (message, options) => {
    const newMessages = { ...messages }
    const id = nanoid()
    newMessages[id] = { id, message, options }
    if (!options.status) {
      options.status = ''
    }
    setMessages(newMessages)
    screenReaderAlert(id, message, options.status)
    return id
  }

  const contextValue = {
    messages,
    addMessage: (message, options) => addMessage(message, options),
    removeMessage: (messageId) => removeMessage(messageId),
  }

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  )
}

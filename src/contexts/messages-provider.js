import React, { useState } from "react";
import { nanoid } from 'nanoid'

export const MessageContext = React.createContext({
  messages: {},
  addMessage: () => {},
  removeMessage: () => {}
});

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState({});
  const [count, setCount] = useState(0)

  const removeMessage = (messageId) => {
    const newMessages = {...messages}
    delete newMessages[messageId]
    setMessages(newMessages);
    setCount(count - 1)
  }

  const addMessage = (message, status) => {
    setCount(count + 1)
    const newMessages = {...messages}
    const id = nanoid()
    newMessages[id] = {id, message, status}
    setMessages(newMessages);
  }

  const contextValue = {
    messages,
    addMessage: (message, status) => addMessage(message, status),
    removeMessage: (messageId) => removeMessage(messageId)
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
}

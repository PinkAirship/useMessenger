import { useContext } from 'react'
import { MessageContext } from './messages-provider'

export function useMessenger() {
  const { messages, addMessage, removeMessage } = useContext(
    MessageContext
  )
  return { messages, addMessage, removeMessage }
}

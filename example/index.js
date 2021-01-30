import React from 'react'
import ReactDOM from 'react-dom'

import { MessagesProvider, useMessenger } from '../src'
import { nanoid } from 'nanoid'

function App () {
  return (
    <MessagesProvider>
      <div>
        <MakeMessage />
        <MessageDisplay />
      </div>
    </MessagesProvider>
  )
}

function MakeMessage () {
  const { addMessage } = useMessenger()
  return (
    <input type="button" onClick={() => addMessage(nanoid(), 'err')} value="Add Message" />
  )
}

function MessageDisplay () {
  const { messages } = useMessenger()

  return (
    <div>
      {
        Object.values(messages).map(m => <Message message={m} key={m.id}/>)
      }
    </div>
  )
}

function Message ({ message }) {
  const { removeMessage } = useMessenger()
  return (
    <div>
      {message.message}
      {message.status}
      <input type="button" onClick={() => removeMessage(message.id)} value="Remove Message" />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

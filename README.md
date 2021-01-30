# useMessenger
A react library that provides a context and hook to add and remove messages from your application.

Create a simple hook to add toast notifications, screenreadernotifications, or whatever app notifications
you need with a simple, easy to use api.

## Install

With npm
```bash
npm install @pinkairship/useMessenger
```
With yarn
```bash
yarn add @pinkairship/useMessenger
```

## Usage

```jsx
import React from 'react'

import { MessagesProvider, useMessenger } from '@pinkairship/useMessenger'
import { nanoid } from 'nanoid'

export default function App () {
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
```

To add screen reader alerts (which you should - [read more here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)) pass in a function that will provide a reference to the aria-live region.

```jsx
//index.html
<div role="region" id="screenReaderAlert" aria-live="polite">
</div>

// App.js
export default function App () {
  return (
    <MessagesProvider
      screenReaderAlert={() => document.getElementById('screenReaderAlert')}
    >
      <div>
        <MakeMessage />
        <MessageDisplay />
      </div>
    </MessagesProvider>
  )
}
```

You can also set the politeness level of an alert by providing a `politeLevel` attribute when adding a message (defaults to `polite`).

```jsx
function MakeMessage () {
  const { addMessage } = useMessenger()
  return (
    <input
      type="button"
      onClick={() => addMessage(nanoid(), 'err', 'assertive')}
      value="Add Message"
    />
  )
}
```

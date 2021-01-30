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
        Object.values(messages).map((m) => <Message message={m} key={m.id} />)
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

## Development

To run a development environment:

```
npm run start
```

You can then navigate to `http://localhost:8080` and see the example app running. Using webpack serve, any changes you make to the `src/` files will automatically be reflected.

### Testing

Tests should be included in the `__test__` file. To help in writing tests, a wrapper
function has been provided in `__tests__/index.js`. See `__tests__/index.js` for examples on how to write tests.
#### Running Tests

To run tests:

```
npm run test
```

## Troubleshooting

1. If you install into another project locally (using `npm install <folder>`) be sure to follow the advice found here [https://stackoverflow.com/questions/56021112/react-hooks-in-react-library-giving-invalid-hook-call-error](https://stackoverflow.com/questions/56021112/react-hooks-in-react-library-giving-invalid-hook-call-error)

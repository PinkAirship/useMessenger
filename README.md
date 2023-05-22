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
Wrap the tree you wish to add and remove messages with a MessagesProvider:

```jsx
function App () {
  return (
    <MessagesProvider>
      // children here
    </MessagesProvider>
  )
}
```
Then create a component that will hook into adding a message:

```jsx
function MakeMessage () {
  const { addMessage } = useMessenger()
  return (
    <input type="button" onClick={() => addMessage(nanoid(), 'err')} value="Add Message" />
  )
}
```

Then create a component that will display the message and hook into removing the message:

```jsx
function Message ({ message }) {
  const { removeMessage } = useMessenger()
  return (
    <div>
      {message.message} |  {message.options.status}
      <input type="button" onClick={() => removeMessage(message.id)} value="Remove Message" />
    </div>
  )
}
```

Then put them altogether (full example below):

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
      {message.message} |  {message.options.status}
      <input type="button" onClick={() => removeMessage(message.id)} value="Remove Message" />
    </div>
  )
}
```

### Dismissable Alerts

If you want to use dismissable alerts, use the following function when creating an alert:

```js
(message) => {
  const messageId = addMessage('my message')
  // Will be removed in five seconds
  setTimeout(() => removeMessage(messageId), 5000)
}
```

Add this to your addMessage component:

```jsx
function MakeMessage () {
  const { addMessage, removeMessage } = useMessenger()

  const dismissableAddMessage = (message) => {
    const messageId = addMessage('my message')
    // Will be removed in five seconds
    setTimeout(() => removeMessage(messageId), 5000)
  }
  return (
    <input type="button" onClick={() => dismissableAddMessage(nanoid())} value="Add Message" />
  )
}
```

### Screen Reader Alerts

To add screen reader alerts (which you should - [read more here](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)) pass in a function that accepts the message id, message, and the options of the message (i.e. 'status': 'error').

Also, to remove the message, pass in a `removeScreenReaderAlert` function that accepts the id of the function. You can use the id of the message to remove the alert when the message is removed.

```jsx
//index.html
<div role="region" id="screenReaderAlert" aria-live="polite">
</div>

// App.js
export default function App () {
  return (
    <MessagesProvider
      screenReaderAlert={(id, message, options) => myScreenReaderAlertFunction(id, message, options)}
      removeScreenReaderAlert={(id) => myScreenReaderAlertRemovalFunction(messageId)}
    >
      <div>
        <MakeMessage />
        <MessageDisplay />
      </div>
    </MessagesProvider>
  )
}
```

** Note that you may have components that automatically hook into your screen reader alert when they are created, so be sure to not add a function to add and remove alerts for screen readers if this is the case.

### Initial Messages

Initial messages can be set to the MessagesProvider on initial mount.

```jsx
const intialMessages = ['message1', 'message2']

function App () {
  return (
    <MessagesProvider initialMessages={intialMessages}>
      ...
    </MessagesProvider>
  )
}
```

`initialMessages` assumes that the messages being passed are an array of strings, but if they are not you can pass a transform function called `initialMessageTransform` that will format the messages into a way that MessagesProvider can understand. This format is `{message: string, options: object}`.


```jsx
const intialMessages = [{message: nanoid(), customStatus: 'mine', id: 'will be ignored'}]
const transformer = m => ({message: m.message, options:{status: m.customStatus}, id: m.id})

function App () {
  return (
    <MessagesProvider initialMessages={intialMessages} initialMessageTransform={transformer}>
      ...
    </MessagesProvider>
  )
}
```

Note that the id property will be overwritten by any transforms as it is used internally to track messages in state. If you have a message that has an id, transform it.

** Note that messages set in this manner will not alert screen readers and it is up to the application to still alert screen readers of these messages.
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

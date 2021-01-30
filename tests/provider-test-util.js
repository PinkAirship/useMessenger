import React from "react";
import { render } from "@testing-library/react";

import { MessageContext } from "./messages-provider";

// Mocks
const messagesMock = [];

export default function renderComponent(
  children,
  {
    // ... other props
    messages = messagesMock
  } = {}
) {
  const addMessageSpy = jest.fn();
  const removeMessageSpy = jest.fn();

  return {
    ...render(
      // add other providers such as AuthContext
      <MessageContext.Provider
        value={{
          messages,
          addError: addMessageSpy,
          removeError: removeMessageSpy
        }}
      >
        {children}
      </MessageContext.Provider>
    ),
    addMessageSpy,
    removeMessageSpy
  };
}

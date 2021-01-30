import React from 'react';
import { render } from '@testing-library/react';

import { Messages } from '../example/App'
import { MessagesProvider } from "../src/contexts/messages-provider";

export function renderComponent(children) {
  return {
    ...render(
      <MessagesProvider>
        {children}
      </MessagesProvider>
    )
  };
}

it('renders an Add Message Button', async () => {
  const { findByText } = renderComponent(<Messages />);
  await findByText(/Add Message/);
});

it('adds a message when clicking the Add Message Button', async () => {
  const { findByText, queryAllByText } = renderComponent(<Messages />);
  const removeMessages = await queryAllByText(/Remove Message/)
  expect(removeMessages).toHaveLength(0)
  const button = await findByText(/Add Message/);
  button.click()
  await findByText(/Remove Message/)
});

it('removes a message when clicking the Remove Message Button', async () => {
  const { findByText, queryAllByText } = renderComponent(<Messages />);
  let button = await findByText(/Add Message/);
  button.click()
  button = await findByText(/Remove Message/)
  button.click()
  const removeMessages = await queryAllByText(/Remove Message/)
  expect(removeMessages).toHaveLength(0)
});

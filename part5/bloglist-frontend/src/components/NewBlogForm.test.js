import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewBlogForm from './NewBlogForm';

test('<NewBlogForm /> updates parent state and calls onSubmit', () => {
  const saveBlog = jest.fn();

  const component = render(
    <NewBlogForm saveBlog={saveBlog} />,
  );

  const author = component.container.querySelector('input[name="author"]');
  const title = component.container.querySelector('input[name="title"]');
  const url = component.container.querySelector('input[name="url"]');

  fireEvent.change(author, {
    target: { value: 'author entered' },
  });
  fireEvent.change(title, {
    target: { value: 'title entered' },
  });
  fireEvent.change(url, {
    target: { value: 'url entered' },
  });

  const form = component.container.querySelector('form');
  fireEvent.submit(form);

  expect(saveBlog.mock.calls).toHaveLength(1);
  expect(saveBlog.mock.calls[0][0]).toMatchObject({
    author: 'author entered',
    title: 'title entered',
    url: 'url entered',
  });
});

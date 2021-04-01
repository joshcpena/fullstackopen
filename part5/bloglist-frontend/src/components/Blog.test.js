import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let blog;
  beforeEach(() => {
    blog = {
      title: 'Component testing with react-testing-library',
      author: 'react-devs',
      url: 'www.react.com',
      likes: 43,
      user: {
        username: 'react-user',
      },
    };
  });

  test('component renders content', () => {
    const deleteHandler = jest.fn();

    const component = render(
      <Blog blog={blog} deleteBlog={deleteHandler} username="react-user" addLike={() => 0} />,
    );

    let button = component.getByText('view');
    fireEvent.click(button);

    button = component.getByText('remove');
    fireEvent.click(button);
    expect(deleteHandler.mock.calls).toHaveLength(1);

    expect(component.container).toHaveTextContent(
      'Component testing with react-testing-library',
      'react-devs',
      'www.react.com',
      'react-user',
      43,
    );
  });

  test('component does not display likes or url by default', () => {
    const component = render(
      <Blog blog={blog} deleteBlog={() => 0} username="react-user" addLike={() => 0} />,
    );

    expect(component.container).not.toHaveTextContent('www.react.com', 43);
  });

  test('component displays likes and url after click event on view button', () => {
    const component = render(
      <Blog blog={blog} deleteBlog={() => 0} username="react-user" addLike={() => 0} />,
    );

    const button = component.getByText('view');
    fireEvent.click(button);

    expect(component.container).toHaveTextContent(
      'Component testing with react-testing-library',
      'react-devs',
      'www.react.com',
      'react-user',
      43,
    );
  });

  test('component calls addLike appropriate number of times', () => {
    const addLike = jest.fn();
    const component = render(
      <Blog blog={blog} deleteBlog={() => 0} username="react-user" addLike={addLike} />,
    );

    let button = component.getByText('view');
    fireEvent.click(button);

    button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(addLike.mock.calls).toHaveLength(2);

    for (let i = 0; i < 40; i += 1) {
      fireEvent.click(button);
    }
    expect(addLike.mock.calls).toHaveLength(42);
  });
});

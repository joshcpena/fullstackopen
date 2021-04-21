import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const Users = () => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs);

  let userList = new Map(blogs.reduce((acc, e) => acc.set(e.user.username,
    (acc.get(e.user.username) || 0) + 1), new Map()));
  userList = [...userList.entries()];

  // individual user view if (id) and found blog where that user id exists
  if (id && blogs.filter((item) => item.user.id === id).length > 0) {
    const userBlogs = blogs.filter((item) => item.user.id === id);
    return (
      <div>
        <h2>{userBlogs[0].user.name}</h2>
        <h3>added blogs:</h3>
        {userBlogs.map((blog) => <li key={blog.id}>{blog.title}</li>)}
      </div>
    );
  }

  // Else all user view
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th>{' '}</th>
            <th>blogs added</th>
          </tr>
          {userList.length ? userList.map((user) => (
            <tr key={user[0]}>
              <td>{user[0]}</td>
              <td>{user[1]}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

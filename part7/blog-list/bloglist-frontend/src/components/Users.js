import React from 'react';
import { useSelector } from 'react-redux';

const Users = () => {
  const blogs = useSelector((state) => state.blogs);
  let userList = new Map(blogs.reduce((acc, e) => acc.set(e.user.username,
    (acc.get(e.user.username) || 0) + 1), new Map()));
  userList = [...userList.entries()];

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

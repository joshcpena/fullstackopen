import React from 'react';
import { useSelector } from 'react-redux';

// import PropTypes from 'prop-types';

const Users = () => {
  const blogs = useSelector((state) => state.blogs);
  // const userList = blogs.reduce((map, obj) => {
  //   // eslint-disable-next-line no-param-reassign
  //   map[obj.user.username] = obj.author;
  //   // map[obj.user.username] ? map[obj.user.username] += 1 : 1;
  //   return map;
  // }, {});
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

// <h3>added blogs</h3>
// {blogs.map((blog) => (
//   <li key={blog.id}>
//     {blog.title}
//   </li>
// ))}
export default Users;

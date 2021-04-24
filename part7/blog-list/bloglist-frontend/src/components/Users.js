import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const Users = () => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs);

  let userList = new Map(blogs.reduce((acc, e) => acc.set(e.user.username,
    (acc.get(e.user.username) || 0) + 1), new Map()));
  userList = [...userList.entries()];

  const userIds = new Map(blogs.reduce((acc, e) => acc.set(e.user.username,
    e.user.id), new Map()));

  // individual user view if (id) and found blog where that user id exists
  if (id && blogs.filter((item) => item.user.id === id).length > 0) {
    const userBlogs = blogs.filter((item) => item.user.id === id);
    return (
      <div>
        <h2>{userBlogs[0].user.name}</h2>
        <h3>added blogs:</h3>
        {userBlogs.map((blog) => <li key={blog.id}>{`${blog.title} by ${blog.author}`}</li>)}
      </div>
    );
  }

  // Else all user view
  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <th>{' '}</th>
            <th>blogs added</th>
          </tr>
          {userList.length ? userList.map((user) => (
            <tr key={user[0]}>
              <td>
                <Link to={`/users/${userIds.get(user[0])}`}>{user[0]}</Link>
              </td>
              <td>{user[1]}</td>
            </tr>
          )) : null}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;

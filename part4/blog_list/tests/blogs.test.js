const mongoose = require('mongoose');
const supertest = require('supertest');
const listHelper = require('../utils/list_helper');
const app = require('../app');
const Blog = require('../models/blog');

const api = supertest(app);
test('dummy returns one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
  ];

  const listWithLotsBlogs = [
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0,
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    },
    {
      _id: '5a422b891b54a676234d17fa',
      title: 'First class tests',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
      likes: 10,
      __v: 0,
    },
    {
      _id: '5a422ba71b54a676234d17fb',
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
      __v: 0,
    },
    {
      _id: '5a422bc61b54a676234d17fc',
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      __v: 0,
    },
  ];

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test('when list has many blogs, return sum of all likes', () => {
    expect(listHelper.totalLikes(listWithLotsBlogs)).toBe(36);
  });

  test('given blog list return title, author, likes or most liked blog', () => {
    const result = listHelper.favoriteBlog(listWithLotsBlogs);
    expect(result).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    });
  });

  test('given blog list, return author & num blogs of author with most blogs', () => {
    expect(listHelper.mostBlogs(listWithLotsBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });

  test('given blog list, return author & num blogs of author with most blogs', () => {
    expect(listHelper.mostLikes(listWithLotsBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});

const intialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = intialBlogs.map((blog) => new Blog(blog));
  const promises = blogObjects.map((blog) => blog.save());
  await Promise.all(promises);
});

test('blog returned as josn', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(intialBlogs.length);
});

test('list hase a blog about react', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body.map((r) => r.title)).toContain('React patterns');
});

test('validate id property exits', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body.map((r) => r.id)).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = { author: 'johan', title: 'This was a succesful addition', url: 'www.url.com' };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/blogs');
  const contents = response.body.map((res) => res.title);
  expect(response.body).toHaveLength(intialBlogs.length + 1);
  expect(contents).toContain('This was a succesful addition');
});

test('likes will default to 0 if missing from post', async () => {
  const newBlog = { author: 'johan', title: 'This was a succesful addition', url: 'www.url.com' };
  await api
    .post('/api/blogs')
    .send(newBlog);

  const response = await api.get('/api/blogs');
  const likes = response.body.reduce(((acc, res) => {
    if (res.author === 'johan') {
      return acc + res.likes;
    }
    return acc;
  }), 0);

  expect(likes).toEqual(0);
});

test('validated title and url are required', async () => {
  let newBlog = { author: 'johan', title: 'This was a succesful addition' };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  newBlog = { author: 'johan', url: 'www.urlexample.com/index.html' };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
  newBlog = {};
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);
});

test('successed with code 204 if id is valid', async () => {
  let notes = await api.get('/api/blogs');
  await api
    // eslint-disable-next-line no-underscore-dangle
    .delete(`/api/blogs/${intialBlogs[1]._id}`)
    .expect(204);
  notes = await api.get('/api/blogs');

  expect(notes.body.map((blog) => blog.title)).not.toContain(intialBlogs[1].title);
});

afterAll(() => mongoose.connection.close());

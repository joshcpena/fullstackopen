const totalLikes = (blogs) => {
  const likesArr = blogs.map((blog) => blog.likes);
  return likesArr.reduce((acc, cur) => acc + cur, 0);
};

const favoriteBlog = (blogs) => {
  const blog = blogs.reduce((acc, cur) => (acc.likes > cur.likes ? acc : cur));
  return {
    title: blog.title,
    author: blog.author,
    likes: blog.likes,
  };
};

const mostBlogs = (blogs) => {
  const map = blogs.reduce(
    (acc, cur) => acc.set(cur.author, (acc.get(cur.author) || 0) + 1), new Map(),
  );
  const result = [...map.entries()].reduce((acc, cur) => (acc[1] > cur[1] ? acc : cur));

  return { author: result[0], blogs: result[1] };
};

const mostLikes = (blogs) => {
  const map = blogs.reduce(
    (acc, cur) => acc.set(cur.author, (acc.get(cur.author) || 0) + cur.likes), new Map(),
  );
  const result = [...map.entries()].reduce((acc, cur) => (acc[1] > cur[1] ? acc : cur));
  return { author: result[0], likes: result[1] };
};
const dummy = () => 1;

module.exports = {
  totalLikes, favoriteBlog, mostBlogs, mostLikes, dummy,
};

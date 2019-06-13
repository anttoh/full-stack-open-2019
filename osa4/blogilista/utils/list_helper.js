const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0;
  }

  return blogs.map(blog => blog.likes).reduce((total, cur) => (total += cur));
};

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return {
      error: "no blogs"
    };
  }
  const mostLikedBlog = blogs.sort((b1, b2) => b2.likes - b1.likes)[0];

  return {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  };
};

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return {
      error: "no blogs"
    };
  }
  const map = new Map();
  blogs.forEach(blog => {
    let author = blog.author;
    if (map.get(author) === undefined) {
      map.set(author, 0);
    }
    map.set(author, map.get(author) + 1);
  });

  let authorWithMostBlogs = null;
  for (let [author, blogs] of map.entries()) {
    if (authorWithMostBlogs === null) {
      authorWithMostBlogs = author;
    }

    if (blogs > map.get(authorWithMostBlogs)) {
      authorWithMostBlogs = author;
    }
  }

  return {
    author: authorWithMostBlogs,
    blogs: map.get(authorWithMostBlogs)
  };
};

const mostLikes = blogs => {
  if (blogs.length === 0) {
    return {
      error: "no blogs"
    };
  }
  const map = new Map();
  blogs.forEach(blog => {
    let author = blog.author;
    if (map.get(author) === undefined) {
      map.set(author, 0);
    }
    map.set(author, map.get(author) + blog.likes);
  });

  let authorWithMostLikes = null;
  for (let [author, likes] of map.entries()) {
    if (authorWithMostLikes === null) {
      authorWithMostLikes = author;
    }

    if (likes > map.get(authorWithMostLikes)) {
      authorWithMostLikes = author;
    }
  }

  return {
    author: authorWithMostLikes,
    likes: map.get(authorWithMostLikes)
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};

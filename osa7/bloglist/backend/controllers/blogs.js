const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({})
    .populate("user", { username: 1, name: 1 })
    .populate("comments", {
      content: 1
    });
  res.json(blogs.map(blog => blog.toJSON()));
});

blogsRouter.post("/", async (req, res) => {
  const body = req.body;

  const token = req.token;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: "token missing or invalid" });
    }

    const user = await User.findById(decodedToken.id);

    let blog;

    if (typeof body.title === typeof body.url) {
      blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
      });
    } else {
      blog = new Blog({
        title: body.title === undefined ? "title missing" : body.title,
        author: body.author,
        url: body.url === undefined ? "url missing" : body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
      });
    }

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
    res.status(201).json(savedBlog.toJSON());
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

blogsRouter.delete("/:id", async (req, res) => {
  const token = req.token;
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);

    const curUser = await User.findById(decodedToken.id);

    const curUserId = curUser.id;

    const blog = await Blog.findById(req.params.id);

    const blogsUserId = blog.user.toString();

    console.log("curUser", typeof curUserId);
    console.log("blogsUser", typeof blogsUserId);

    if (curUserId !== blogsUserId) {
      return res
        .status(400)
        .json({ err: "Users can only delete their own blogs" });
    }

    await Blog.findByIdAndRemove(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
      new: true
    });
    res.json(updatedBlog.toJSON());
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

module.exports = blogsRouter;

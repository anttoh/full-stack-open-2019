const commentRouter = require("express").Router();
const Comment = require("../models/comment");
const Blog = require("../models/blog");

commentRouter.get("/", async (req, res) => {
  const comments = await Comment.find({}).populate("blog", { id: 1 });
  res.json(comments.map(comment => comment.toJSON()));
});

commentRouter.post("/", async (req, res) => {
  const body = req.body;
  try {
    const comment = new Comment({
      content: body.content,
      blog: body.blog_id
    });
    const savedComment = await comment.save();
    const blog = await Blog.findById(body.blog_id);
    blog.comments = blog.comments.concat(savedComment._id);
    await blog.save();
    res.json(savedComment.toJSON());
  } catch (err) {
    res.status(400).json({ error: "failed to creaate comment" });
  }
});

module.exports = commentRouter;

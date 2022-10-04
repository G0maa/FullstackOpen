const router = require("express").Router();

const { Blog } = require("../models");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll();
  res.json(blogs);
});

router.post("/", async (req, res) => {
  const blog = await Blog.create(req.body);
  res.json(blog);
  // res.status(400).json(error);
});

const findBlogById = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.put("/:id", findBlogById, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

router.delete("/:id", findBlogById, async (req, res) => {
  await req.blog.destroy();
  res.status(204).send();
});

module.exports = router;

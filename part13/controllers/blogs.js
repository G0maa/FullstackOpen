const router = require("express").Router();

const { Blog, User } = require("../models");
const { tokenExtractor, userExtractor } = require("../util/middleware");

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: { exclude: ["id", "passwordHash", "createdAt", "updatedAt"] },
    },
  });
  res.json(blogs);
});

// make this verify token & make sure user exists & add his user_id to the blog.
router.post("/", tokenExtractor, userExtractor, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id });
  res.json(blog);
  // res.status(400).json(error);
});

const findBlogById = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);

  // Make this work... /api/blogs/nonexistent results in bad error
  if (!req.blog)
    return res.status(400).json({ error: "blog not found or non existent" });

  next();
};

router.put("/:id", findBlogById, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

router.delete(
  "/:id",
  tokenExtractor,
  userExtractor,
  findBlogById,
  async (req, res) => {
    if (req.blog.userId !== req.user.id) {
      res.status(401).json({ error: "Blog was not made by user" });
      return;
    }

    await req.blog.destroy();
    res.status(204).send();
  }
);

module.exports = router;

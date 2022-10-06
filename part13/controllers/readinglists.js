const router = require("express").Router();

const ReadingList = require("../models/readingList");
const {
  tokenExtractor,
  userExtractor,
  isTokenValid,
} = require("../util/middleware");

router.post("/", async (req, res) => {
  const entry = await ReadingList.create(req.body);
  res.status(200).json(entry);
});

// Mark a blog as read
router.put(
  "/:id",
  tokenExtractor,
  userExtractor,
  isTokenValid,
  async (req, res) => {
    // I wonder if that's an optimized query... need that DB course :c
    const blog = await ReadingList.findOne({
      where: {
        userId: req.user.id,
        blogId: req.params.id,
      },
    });

    if (!blog) {
      res.status(401).json({ error: "Blog-id not on your readinglist" });
      return;
    }

    blog.isRead = req.body.isRead;
    await blog.save();

    res.status(200).json(blog);
  }
);

module.exports = router;

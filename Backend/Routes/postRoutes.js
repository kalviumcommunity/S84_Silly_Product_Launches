const express = require("express");
const router = express.Router();
const Post = require("../Models/postModel");
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in fetching data",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, content, image_url, likes_count, tags } = req.body;
    const postId = req.params.id;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        title,
        content,
        image_url,
        likes_count: likes_count || 0,
        tags
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Post updated successfully!",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update post.",
    });
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url, likes_count, tags } = req.body;

  try {
    const updatedPost = await users.findByIdAndUpdate(
      id,
      {
      title,
      content,
      image_url,
      likes_count: likes_count || 0,
      tags
      },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({
      success: true,
      user: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
        success: false,
        message: 'Erorr in updating data'
    })
  }
});

module.exports = router;

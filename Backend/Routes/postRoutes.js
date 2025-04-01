const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
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

router.post("/", async (req, res) => {
  const { title, content, image_url, likes_count, tags } = req.body;
  if (!title || !content || !image_url || !tags) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }
  try {
    const newPost = new Post({ title, content, image_url, likes_count, tags });
    await newPost.save();
    res.json({
      message: "New Post saved",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in posting data",
    });
  }
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, image_url, tags } = req.body;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  if (!title || !content || !image_url || !tags) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, image_url, tags },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

module.exports = router;

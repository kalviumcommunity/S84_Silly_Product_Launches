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
  const { title, content, image_url, likes_count, tags } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
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

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Post.findByIdAndDelete(id)
    if(!deletedUser){
        return res.status(404).json({
            success: false,
            message: 'User not found'
        })
    }
    res.json({
      success: true,
      message: `User with ${id} deleted`,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Error in deleting data",
    });
  }
});

module.exports = router;

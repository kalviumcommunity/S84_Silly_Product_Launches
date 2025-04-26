const express = require("express");
const app = express();
const router = express.Router();
const users = require("../Models/userModel");
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");


const { connectToMySql } = require("../src/Config/mysqlDb");
const connectToMongoDb = require("../src/Config/mongoDb");


const blacklist = new Set();

router.use(express.json());

const checkBlacklist = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    if (blacklist.has(token)) {
      return res.status(401).json({ success: false, message: "Token is invalidated" });
    }
  }
  next();
};

router.use(checkBlacklist);

router.get("/", async (req, res) => {
  try {
    const user = await users.find();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in fetching data",
    });
  }
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password, userName, age } = req.body;
  if (!firstName || !lastName || !email || !password || !userName || !age) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new users({ firstName, lastName, email, password: hashedPassword, userName, age });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, userName: newUser.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      success: true,
      message: "New user registered successfully",
      user: newUser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in registering user",
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, userName, age } = req.body;

  try {
    const updatedUser = await users.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        userName,
        age,
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      success: true,
      user: updatedUser,
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
    const deletedUser = await users.findByIdAndDelete(id)
    if (!deletedUser) {
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

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    const user = await users.findOne({ email });  
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",  
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, userName: user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set the username in a cookie
    res.cookie("username", user.userName, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("username");

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ success: false, message: "Token is required" });
  }

  const token = authHeader.split(" ")[1];
  blacklist.add(token);

  res.status(200).json({ success: true, message: "Logged out successfully" });
});

router.get("/all-users", async (req, res) => {
  try {
    const allUsers = await users.find({}, "_id userName");
    res.status(200).json({
      success: true,
      users: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching users",
    });
  }
});

module.exports = router;
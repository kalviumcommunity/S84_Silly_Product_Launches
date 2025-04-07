const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const connectToDb = require("./src/Config/db");
const users = require('./Routes/userRoutes')
const Posts = require('./Routes/postRoutes')
const cors = require('cors');
const rolerouter = require("./Routes/rolesRoute");
const validateUser = require("./Middlewares/authMiddleware");
require("dotenv").config();

app.use(cors())

app.use(express.json())

app.use('/users', users);
app.use('/posts', validateUser, Posts);
app.use('/api', validateUser, rolerouter);

// Public routes (no validation required)
app.get('/', (req, res) => {
  res.send('This is Home Route');
});

app.get("/ping", (req, res) => {
  try {
    res.status(200).send("You are inside Ping Route");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});


app.get('/', (req, res) => {
  res.send('This is Home Route')
})

app.get("/ping", (req, res) => {
  try {
    res.status(200).send("You are inside Ping Route");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

const db = process.env.DB_URI;


app.listen(PORT, async () => {
  try {
    await connectToDb(db);
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
});

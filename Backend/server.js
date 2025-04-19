const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const connectToDatabases = require("./src/Config/db");
const users = require('./Routes/userRoutes');
const Posts = require('./Routes/postRoutes');
const cors = require('cors');
const rolerouter = require("./Routes/rolesRoute");
const validateUser = require("./Middlewares/authMiddleware");
require("dotenv").config();
const { connectToMySql, insertData } = require("./src/Config/mysqlDb");


app.use(cors());
app.use(express.json());

app.use('/users', users);
app.use('/posts', Posts);
app.use('/api', validateUser, rolerouter);

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


app.post("/add-user", async (req, res) => {
  const { first_name, last_name, email, password, user_name, age } = req.body;

  const mysqlConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  };

  try {
    const connection = await connectToMySql(mysqlConfig);

    const userData = {
      first_name,
      last_name,
      email,
      password,
      user_name,
      age,
    };

    const result = await insertData(connection, "users", userData);
    res.status(201).json({ message: "User added successfully", result });
  } catch (error) {
    res.status(500).json({ message: "Error adding user", error });
  }
});



app.listen(PORT, async () => {
  try {
    await connectToDatabases();
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
});
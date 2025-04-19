const connectToMongoDb = require("./mongoDb");
const { connectToMySql } = require("./mysqlDb");

const connectToDatabases = async () => {
  try {
    const mongoDbUrl = process.env.DB_URI;
    await connectToMongoDb(mongoDbUrl);

    const mysqlConfig = {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    };
    await connectToMySql(mysqlConfig);

    console.log("Connected to all databases successfully!");
  } catch (error) {
    console.error("Error connecting to databases:", error);
    process.exit(1);
  }
};

module.exports = connectToDatabases;
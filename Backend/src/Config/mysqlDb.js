const mysql = require("mysql2/promise");

const connectToMySql = async (config) => {
  try {
    const connection = await mysql.createConnection(config);
    console.log("Connected to MySQL database!");
    return connection;
  } catch (error) {
    console.error("Error connecting to MySQL:", error);
    throw error;
  }
};

  
  module.exports = { connectToMySql};
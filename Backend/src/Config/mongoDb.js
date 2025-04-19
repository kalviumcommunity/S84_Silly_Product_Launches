const { connect } = require("mongoose");

const connectToMongoDb = async (url) => {
  try {
    await connect(url);
    console.log("Connected to MongoDB database!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

module.exports = connectToMongoDb;
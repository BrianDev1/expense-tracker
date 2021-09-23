const mongoose = require("mongoose");

const DatabaseConnection = async (MONGODB_URI) => {
  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to: ${connection.connection.host}`);
  } catch (error) {
    console.error("Unable to connect to database!");
    process.exit();
  }
};

module.exports = DatabaseConnection;

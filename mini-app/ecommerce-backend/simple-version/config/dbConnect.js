const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    const db = mongoose.connect(process.env.MONGODB_URL);
    console.log("Connect db successful");
    return db;
  } catch (err) {
    console.error("Db connect fail");
  }
};

module.exports = { dbConnect };

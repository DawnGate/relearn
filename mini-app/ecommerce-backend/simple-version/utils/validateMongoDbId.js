const mongoose = require("mongoose");

const validateMongDbbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error("this id is not valid");
  }
};

module.exports = {
  validateMongDbbId,
};

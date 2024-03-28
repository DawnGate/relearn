const User = require("../models/user");

class UserRepository {
  async createUser(user) {
    const newUser = await User.create(user);
    return newUser;
  }

  async getUserByUsername(username) {
    const foundUser = await User.findOne({ username });
    return foundUser;
  }

  async getUserById(userId) {
    const foundUser = await User.findById(userId);
    return foundUser;
  }

  async deleteTestUsers() {
    return await User.delete({
      username: /^test/,
    });
  }
}

module.exports = UserRepository;

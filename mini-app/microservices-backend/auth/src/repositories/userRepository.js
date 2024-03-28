const User = require("../modals/user");

class UserRepository {
  async createUser(user) {
    const newUser = await User.create(user);
    return newUser;
  }

  async getUserByUsername(username) {
    const foundUser = await User.findOne({ username });
    return foundUser;
  }
}

module.exports = UserRepository;

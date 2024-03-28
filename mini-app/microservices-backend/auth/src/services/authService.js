const User = require("../models/user");
const UserRepository = require("../repositories/userRepository");

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async findUserByUsername(username) {
    return await this.userRepository.getUserByUsername(username);
  }

  async deleteTestUsers() {
    await User.deleteMany({
      username: /^test/,
    });
  }
}

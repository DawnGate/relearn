const UserRepository = require("../repositories/userRepository");

const bcryptjs = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const config = require("../config");

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async findUserByUsername(username) {
    return await this.userRepository.getUserByUsername(username);
  }

  async findUserById(userId) {
    return await this.userRepository.getUserById(userId);
  }

  async login(username, password) {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user) {
      return { success: false, message: "Invalid username or password" };
    }

    const isMatch = await bcryptjs.compare(password, user.password);

    if (!isMatch) {
      return { success: false, message: "Invalid username or password" };
    }

    const token = jsonwebtoken.sign(
      {
        id: user._id,
      },
      config.jwtSecret
    );

    return { success: true, token };
  }

  async register({ username, password }) {
    const user = await this.userRepository.getUserByUsername(username);

    if (user) {
      return { success: false, message: "User already exist" };
    }

    const salt = await bcryptjs.genSalt(Number(config.bcryptSalt) || 10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = await this.userRepository.createUser({
      username,
      password: hashPassword,
    });

    return {
      success: true,
      user: newUser,
    };
  }

  async deleteTestUsers() {
    await this.userRepository.deleteTestUsers();
  }
}

module.exports = AuthService;

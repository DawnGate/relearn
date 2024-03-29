const AuthService = require("../services/authService");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  async login(req, res) {
    const { username, password } = req.body;

    const result = await this.authService.login(username, password);

    if (result.success) {
      res.json({ token: result.token });
    } else {
      res.status(400).json({ message: result.message });
    }
  }

  async register(req, res) {
    const user = req.body;

    const result = await this.authService.register(user);

    if (result.success) {
      res.json(result.user);
    } else {
      res.status(400).json({ message: result.message });
    }
  }

  async getProfile(req, res) {
    const userId = req.user.id;

    try {
      const user = await this.authService.findUserById(userId);
      res.json(user);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
}

module.exports = AuthController;

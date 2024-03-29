const chai = require("chai");
const chaiHttp = require("chai-http");

const App = require("../app");

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../../.env") });

chai.use(chaiHttp);
const { expect } = chai;

describe("User authentication", () => {
  let app;

  before(async () => {
    app = new App();
    // ! Ensure that db already connect
    await app.connectDB();
    app.start();
  });

  after(async () => {
    await app.authController.authService.deleteTestUsers();
    await app.disconnectDB();
    app.stop();
  });

  describe("POST /register", () => {
    it("should register a new user", async () => {
      const res = await chai.request(app.app).post("/register").send({
        username: "testuser",
        password: "password",
      });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("_id");
      expect(res.body).to.have.property("username", "testuser");
    });
  });
});

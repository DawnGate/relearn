const chai = require("chai");
const chaiHttp = require("chai-http");

const App = require("../app");

chai.use(chaiHttp);
const { expect } = chai;

describe("User authentication", () => {
  let app;

  before(async () => {
    app = new App();
    await app.start();
  });

  after(async () => {
    await app.authController.authService.deleteTestUsers();
    await app.stop();
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

    it("it should return error for username already taken", async () => {
      const res = await chai.request(app.app).post("/register").send({
        username: "testuser",
        password: "password",
      });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property("message", "User already exist");
    });
  });

  describe("POST /login", () => {
    it("should return a JWT for a valid user", async () => {
      const res = await chai.request(app.app).post("/login").send({
        username: "testuser",
        password: "password",
      });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("token");
    });

    it("should return error for invalid user", async () => {
      const res = await chai.request(app.app).post("/login").send({
        username: "invalidUser",
        password: "password",
      });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property(
        "message",
        "Invalid username or password"
      );
    });

    it("should return error for incorrect password user", async () => {
      const res = await chai.request(app.app).post("/login").send({
        username: "testuser",
        password: "invalidPassword",
      });

      expect(res).to.have.status(400);
      expect(res.body).to.have.property(
        "message",
        "Invalid username or password"
      );
    });
  });
});

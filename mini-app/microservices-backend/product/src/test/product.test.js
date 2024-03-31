const chai = require("chai");
const chaiHttp = require("chai-http");

const App = require("../app");

const AuthApp = require("../../../auth/src/app");

const ProductController = require("../controllers/productController");

chai.use(chaiHttp);
const { expect } = chai;

describe("Product api", () => {
  let app;
  let authApp;
  let authToken;
  let productController = new ProductController();

  before(async () => {
    app = new App();
    authApp = new AuthApp();

    await authApp.start();
    await app.start();

    const testUser = {
      username: "testuser",
      password: "password",
    };

    await chai.request(authApp.app).post("/register").send(testUser);

    const authRes = await chai
      .request(authApp.app)
      .post("/login")
      .send(testUser);

    authToken = authRes.body.token;
  });

  after(async () => {
    await authApp.authController.authService.deleteTestUsers();
    await productController.deleteTestProducts();
    await app.stop();
  });

  describe("/POST products", () => {
    it("should create a new product", async () => {
      const testProduct = {
        name: "testProduct",
        description: "This is test product",
        price: 20,
      };

      const res = await chai
        .request(app.app)
        .post("/api/product")
        .set("Authorization", `Bearer ${authToken}`)
        .send(testProduct);

      expect(res).to.have.status(201);
      expect(res.body).to.have.property("_id");
      expect(res.body).to.have.property("name", testProduct.name);
      expect(res.body).to.have.property("price", testProduct.price);
      expect(res.body).to.have.property("description", testProduct.description);
    });

    it("error when product name already exist", async () => {
      const testProduct = {
        name: "testProduct",
        description: "This is test product",
        price: 20,
      };

      const res = await chai
        .request(app.app)
        .post("/api/product")
        .set("Authorization", `Bearer ${authToken}`)
        .send(testProduct);

      expect(res).to.have.status(400);
    });
  });
});

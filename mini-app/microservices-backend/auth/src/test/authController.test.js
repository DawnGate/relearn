const chai = require("chai");
const chaiHttp = require("chai-http");

const App = require("../app");
require("dotenv").config();

chai.use(chaiHttp);
const { expect } = chai;

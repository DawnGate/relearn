const express = require("express");
const httpProxy = require("http-proxy");

console.log(process.env);

const proxy = httpProxy.createProxyServer();
const app = express();

app.use("/auth", (req, res) => {
  proxy.web(req, res, { target: process.env.AUTH_URL });
});

app.use("/product", (req, res) => {
  proxy.web(req, res, { target: process.env.PRODUCT_URL });
});

app.use("/order", (req, res) => {
  proxy.web(req, res, { target: process.env.ORDER_URL });
});

const port = process.env.PORT || 3003;

app.listen(port, () => {
  console.log(`api gate way listening on port ${port}`);
});

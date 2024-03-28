const express = require("express");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer();
const app = express();

app.use("/auth", (req, res) => {
  proxy.web(req, res, { target: "http://auth:3000" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`api gate way listening on port ${port}`);
});

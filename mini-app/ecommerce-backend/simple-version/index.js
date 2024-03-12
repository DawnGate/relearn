require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const { dbConnect } = require("./config/dbConnect");

const authRouter = require("./routes/authRoute");

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const port = process.env.PORT || 3001;

const app = express();

dbConnect();

app.use(bodyParser.json());

app.use("/api/user", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});

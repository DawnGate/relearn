require("dotenv").config();

const express = require("express");

const cookieParser = require("cookie-parser");

const morgan = require("morgan");

const { dbConnect } = require("./config/dbConnect");

const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute");

const { notFound, errorHandler } = require("./middlewares/errorHandler");

const port = process.env.PORT || 3001;

const app = express();

dbConnect();

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/user", authRouter);
app.use("/api/product", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`app listen on port ${port}`);
});

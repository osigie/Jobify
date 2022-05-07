import express from "express";
import dotenv from "dotenv"
dotenv.config()
import { notFoundMiddleware } from "./middlewares/notFound.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.js";
const app = express();

app.get("/", (req, res) => {
  res.send("i am here");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

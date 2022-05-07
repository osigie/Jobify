import express from "express";
import { notFoundMiddleware } from "./middlewares/NotFound.js";
const app = express();

app.get("/", (req, res) => {
  res.send("i am here");
});

app.use(notFoundMiddleware);
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

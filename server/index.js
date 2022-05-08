import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

//db and authentication
import connectDb from "./database/connect.js";

//routers
import authRouter from "./routes/authRoute.js";
import jobRouter from "./routes/jobRoute.js";
//middleware
import { notFoundMiddleware } from "./middleware/notFound.js";
import { errorHandlerMiddleware } from "./middleware/errorMiddleware.js";

//body parser
app.use(express.json());

app.get("/", (req, res) => {
  res.send("i am here");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

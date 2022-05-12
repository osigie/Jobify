import express from "express";
import dotenv from "dotenv";
import "express-async-errors";
import morgan from "morgan";
// import cors from "cors";
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


if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

//body parser
app.use(express.json());

// app.use(cors());

app.get("/api/v1", (req, res) => {
  res.json({ msg: "i am here" });
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

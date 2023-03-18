import cookieParser from "cookie-parser";
import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import dotenv from "dotenv";
import { errorHandler, notFound } from "./middleware/errorHandler";
import usersRouter from "./routes/users.router";
import imagesRouter from "./routes/images.router";
import mongoose from "mongoose";
import cors from "cors";

const app: Express = express();
dotenv.config();

/* cors for cross origin */
/* const allowedOrigins = ["http://localhost:3000", "http://walltribute.com"];
app.use(
  cors({
    origin(origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
); */
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/images", express.static("public/images"));

/* Connect to DB */
const MONGO_URI = process.env.MONGO_URI!;

const retryStart = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => console.log("⚡️[database]: Database is running now"))
    .catch((err) => {
      console.log(err);
      setTimeout(() => {
        retryStart();
      }, 5000);
    });
};

retryStart();
app.enable("trust proxy");

app.use("/api", [usersRouter, imagesRouter]);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

/* Error handler */
app.use(notFound);
app.use(errorHandler);

export default app;

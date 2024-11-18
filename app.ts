import dotenv from "dotenv";
import "express-async-errors";

dotenv.config();

// express
import express from "express";
const app = express();

// rest of the packages
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

// database
import connectDB from "./db/connect";

// routers
import userAuthRouter from "./routes/userAuthRoutes";
import adminAuthRouter from "./routes/adminAuthRoutes";
import userRouter from "./routes/userRoutes";
import mediaRouter from "./routes/mediaRoutes";
import policyRouter from "./routes/policyRoutes";
import ebookRouter from "./routes/ebookRoutes";

// middleware
import notFoundMiddleware from "./middleware/not-found";
import errorHanlderMiddleware from "./middleware/error-handler";

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

app.get("/", (req, res) => {
  console.log(req.signedCookies);
  res.send("GKCC api");
});

app.use("/api/v1/auth", userAuthRouter);
app.use("/api/v1/admin/auth", adminAuthRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/media", mediaRouter);
app.use("/api/v1/policy", policyRouter);
app.use("/api/v1/ebooks", ebookRouter);

app.use(notFoundMiddleware);
app.use(errorHanlderMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      throw new Error("Mongo URI must be defined in environment variables");
    }
    await connectDB(mongoURI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

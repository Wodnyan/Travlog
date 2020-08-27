import express from "express";
import cookieSession from "cookie-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import passportSetup from "./config/passport-config";
import auth from "./auth/auth";
import { notFoundHandler, errorHandler } from "./middlewares/middlewares";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;

passportSetup();

app.use(morgan("common"));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY!],
    httpOnly: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", auth);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

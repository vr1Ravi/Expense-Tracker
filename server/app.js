import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { router as transactions } from "./routes/transactions.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV !== "Production") {
  dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });
}

const app = express();

// middlewares
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/v1", transactions);

export { app };

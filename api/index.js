import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import todoRoute from "./routes/todo.route.js";
import cors from "cors";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';

const app = express();

app.use(express.json());
dotenv.config();
app.use(cors({origin:"http://localhost:3000"}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/images", express.static(path.join(__dirname, "/images")));

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDB!");
  } catch (error) {
    console.log(error);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/todos/upload", upload.single("file"), (req, res) => {
  res.status(200).json("file has been uploaded");
});

app.use("/api/todos", todoRoute);

app.listen(5002, () => {
  connect();
  console.log("backend server is running on 5002!");
});

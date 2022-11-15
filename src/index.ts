import express, { Request, Response, NextFunction } from "express";
import connection from "./db/config";
import cors from "cors";
import fileRoute from "./route/fileRoute";
import { json, urlencoded } from "body-parser";
import multer from "multer";

const app = express();
const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(json());

app.use(urlencoded({ extended: true }));

app.use("/api", fileRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong",
  });
});

connection
  .sync()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },

  filename: function (req: any, file: any, cb: any) {
    cb(null, file.originalname);
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file) {
    cb(null, true);
  } else {
    cb(new Error("File Does not exiest"), false);
  }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

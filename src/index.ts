import express, { Request, Response, NextFunction } from "express";
import connection from "./db/config";
import cors from "cors";
import fileRoute from "./route/fileRoute";
import { json, urlencoded } from "body-parser";

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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

import { Router } from "express";

import {
  saveFile,
  deleteFile,
  getFiles,
  upload,
} from "../controller/fileController";

const router = Router();

router.get("/getFiles", getFiles);
router.post("/uploadFile", upload, saveFile);
router.delete("/deleteFile/:id", deleteFile);

export default router;

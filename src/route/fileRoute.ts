import { Router } from "express";

import {
  saveFile,
  deleteFile,
  getFiles,
  upload,
} from "../controller/fileController";

const router = Router();

router.get("/allFiles", getFiles);
router.post("/saveFile", upload, saveFile);
router.delete("/removeFile/:id", deleteFile);

export default router;

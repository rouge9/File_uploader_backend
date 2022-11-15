import { Router } from "express";

import { saveFile, deleteFile, getFiles } from "../controller/fileController";

const router = Router();

router.get("/allFiles", getFiles);
router.post("/saveFile", saveFile);
router.delete("/removeFile/:id", deleteFile);

export default router;

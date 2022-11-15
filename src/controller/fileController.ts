import { RequestHandler, Request, Response } from "express";
import multer from "multer";
import { Files } from "../model/filesModel";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },

  filename: function (req, file: any, cb: any) {
    cb(null, String(file.originalname));
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (file) {
    cb(null, true);
  } else {
    cb(new Error("File Does not exiest"), false);
  }
};

const multerUpload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: fileFilter,
}).single("file");

export const upload: RequestHandler = (req, res, next) => {
  multerUpload(req, res, function (err) {
    if (err) {
      res.status(400).json({
        message: err.message,
      });
    } else {
      next();
    }
  });
};

export const saveFile: RequestHandler = async (
  req: Request,
  res: Response,
  next
) => {
  if (req.file) {
    // @ts-ignore
    const newFile: Files = {
      name: req.file?.originalname,
      path: req.file?.path,
      size: req.file?.size.toString(),
      date: new Date().toLocaleString(),
    };
    await Files.create(newFile);
  }
  console.log(req.file);
  return res.status(200).json({
    data: req.file,
    message: "File created",
  });
};

export const getFiles: RequestHandler = async (
  req: Request,
  res: Response,
  next
) => {
  const allFiles: Files[] = await Files.findAll();

  return res.status(200).json({
    data: allFiles,
    message: "All files",
  });
};

export const deleteFile: RequestHandler = async (
  req: Request,
  res: Response,
  next
) => {
  const { id } = req.params;
  const deletedFile: Files | null = await Files.findByPk(id);

  await Files.destroy({
    where: { id },
  });
  return res.status(200).json({
    data: deletedFile,
    message: "File deleted",
  });
};

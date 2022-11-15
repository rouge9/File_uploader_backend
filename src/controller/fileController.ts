import { RequestHandler, Request, Response } from "express";

import { Files } from "../model/filesModel";

export const saveFile: RequestHandler = async (
  req: Request,
  res: Response,
  next
) => {
  const file = await Files.create({ ...req.body });
  return res.status(200).json({
    data: file,
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

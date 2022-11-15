import { Sequelize } from "sequelize-typescript";
import { Files } from "../model/filesModel";

const connection = new Sequelize({
  database: "files",
  dialect: "mysql",
  username: "root",
  password: "",
  host: "localhost",
  logging: false,
  models: [Files],
});

export default connection;

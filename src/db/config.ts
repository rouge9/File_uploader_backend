import { Sequelize } from "sequelize-typescript";
import { Files } from "../model/filesModel";

const connection = new Sequelize({
  database: "file",
  dialect: "mysql",
  username: "root",
  password: "12345678",
  host: "localhost",
  logging: false,
  models: [Files],
});

export default connection;

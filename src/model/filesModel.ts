import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  tableName: "files",
  timestamps: true,
})
export class Files extends Model<Files> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  path: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  size: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  date: string;
}

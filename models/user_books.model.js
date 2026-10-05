import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const user_bksModel = sequelize.define("user_books", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  eml: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  book_payment_sttus: {
    type: DataTypes.TEXT,
    defaultValue: "Unpaid",
  },
  book_delivered_sttus: {
    type: DataTypes.TEXT,
    defaultValue: "Not Delivered",
  },
});

export default user_bksModel;

import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const txtModel = sequelize.define("txt", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  usr_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rvw_sggtn_issrprt_nm: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default txtModel;

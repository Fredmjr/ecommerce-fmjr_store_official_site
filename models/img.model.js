import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const imgModel = sequelize.define("img", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  site_sec: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  site_sub_sec: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  site_sub_sec_group: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  img_filepath: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default imgModel;

import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const versionModel = sequelize.define("version", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  app_nm_v: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  app_path: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  app_size: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  version_date: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  fix_1: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fix_2: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fix_3: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fix_4: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fix_5: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

export default versionModel;

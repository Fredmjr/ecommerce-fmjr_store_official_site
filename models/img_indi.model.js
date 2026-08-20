import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const img_indiModel = sequelize.define("img_indi", {
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
  site_sub_sec_group_tag: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  img_group_branding_nm: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  img_filepath: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.TEXT,
    defaultValue: "0",
  },
  comments: {
    type: DataTypes.TEXT,
    defaultValue: "0",
  },
  share: {
    type: DataTypes.TEXT,
    defaultValue: "0",
  },
});

export default img_indiModel;

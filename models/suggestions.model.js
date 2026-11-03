import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const sggtn_box_model = sequelize.define("sggtn_box", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  eml: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  reported_issue_count: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

export default sggtn_box_model;

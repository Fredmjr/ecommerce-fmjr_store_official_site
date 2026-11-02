import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const sggtn_issue_model = sequelize.define("sggtn_issue", {
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

export default sggtn_issue_model;

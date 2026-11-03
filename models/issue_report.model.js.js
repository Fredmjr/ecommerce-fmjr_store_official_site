import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const issue_report_model = sequelize.define("issue_report", {
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

export default issue_report_model;

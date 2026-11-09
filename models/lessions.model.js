import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const lessions_model = sequelize.define("lessions", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  eml: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phn: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[+]?[\d\s\-().]{7,20}$/i,
    },
  },
  graphics_design_crash_course: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "false",
  },
  full_stack_web_dev: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "false",
  },
  desktop_dev: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "false",
  },
  rust_course: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "false",
  },
  claude_course: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "false",
  },
  css_course: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "false",
  },
  go_lang: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "false",
  },
});

export default lessions_model;

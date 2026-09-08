import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const usrModel = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  usr_nm: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phn: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^[+]?[\d\s\-().]{7,20}$/i,
    },
  },
  eml: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  pwd: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default usrModel;

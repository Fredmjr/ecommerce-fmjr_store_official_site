import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const str_mngmnt_usrModel = sequelize.define("str_mngmnt_usr", {
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
  phrase_q1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phrase_q2: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  phrase_q3: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ans_1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ans_2: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ans_3: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default str_mngmnt_usrModel;

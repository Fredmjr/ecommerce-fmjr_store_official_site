import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const nwslttr_usrModel = sequelize.define("nwslttr_usr", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  eml: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  subscribed_sttus: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "True",
  },
});

export default nwslttr_usrModel;

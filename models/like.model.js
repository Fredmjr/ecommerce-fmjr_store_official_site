import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const likeModel = sequelize.define("like", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  usr_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  like_num: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default likeModel;

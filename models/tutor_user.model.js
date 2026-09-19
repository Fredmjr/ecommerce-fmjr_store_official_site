import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const ttr_usrModel = sequelize.define("tutor", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  ttr_usr_nm: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ttr_usr_eml: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ttr_usr_website: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "unlisted",
  },
  ttr_usr_fb_hndl: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "unlisted",
  },
  ttr_usr_instrm_hndl: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "unlisted",
  },
  ttr_usr_tiktok_hndl: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "unlisted",
  },
  ttr_usr_bhnc_hndl: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "unlisted",
  },
  ttr_usr_cntct_1: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ttr_usr_cntct_2: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "unlisted",
  },
  ttr_usr_mblsrvcs_nm: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ttr_usr_mblsrvcs_phn: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  mbl_oprtr: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  accunt_status: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: "Pending",
  },
  ttr_usr_prflimg_path: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ttr_usr_dscrptn_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default ttr_usrModel;

//left phone numbers srings instead of digits coz they were cozing issues fix u get the chanace
/*   ttr_usr_cntct_2: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^[+]?[\d\s\-().]{7,20}$/i,
    },
    defaultValue: null,
  }, */

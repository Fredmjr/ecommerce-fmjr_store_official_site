import str_mngmnt_usrModel from "../../../models/store_management_user.model.js";

const drp_table_fuc = async () => {
  await str_mngmnt_usrModel.drop();
};

drp_table_fuc();

import { accntscrdlets } from "../inventory_assets/data/data_components/store_management.js";
import usrModel from "../models/user.model.js";

//user features cards
export const accntscrdletsUrl = async (req, res) => {
  try {
    return res.status(200).json({
      accnt_crdlets: accntscrdlets,
    });
  } catch (error) {
    console.log(error);
    const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
    return res.status(400).json({
      erMgs: erMgs_div,
    });
  }
};
//all user accounts
export const allaccntsUrl = async (req, res) => {
  try {
    const all_accnts = await usrModel.findAll();
    const all_accnts_fltrd = all_accnts.map((e) => ({
      eml: e.dataValues.eml,
      id: e.dataValues.id,
      usr_nm: e.dataValues.usr_nm,
      created_at: e.dataValues.createdAt,
      accunt_otp_status: e.dataValues.accunt_otp_status,
    }));

    //inactive
    const inactive_accnts = [
      ...new Set(
        all_accnts_fltrd.filter((obj) => obj.accunt_otp_status === "Inactive"),
      ),
    ];

    //active
    const active_accnts = [
      ...new Set(
        all_accnts_fltrd.filter((obj) => obj.accunt_otp_status === "Active"),
      ),
    ];

    console.log(all_accnts_fltrd);

    return res.status(200).json({
      active_accnts: active_accnts,
      inactive_accnts: inactive_accnts,
    });
  } catch (error) {
    console.log(error);
    const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
    return res.status(400).json({
      erMgs: erMgs_div,
    });
  }
};
//all user accounts
export const dltaccntUrl = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    //delete account
    const accnt = await usrModel.findByPk(id);
    if (!accnt) {
      return res.status(400).json({
        erMgs: "Unable to retrieve & perform action on account.",
      });
    }
    await accnt.destroy();
    //retrieve refreshed inactive accounts
    const all_accnts = await usrModel.findAll({
      where: {
        accunt_otp_status: "Inactive",
      },
    });
    const all_inactive_fltrd_accnts = all_accnts.map((e) => ({
      eml: e.dataValues.eml,
      id: e.dataValues.id,
      usr_nm: e.dataValues.usr_nm,
      created_at: e.dataValues.createdAt,
      accunt_otp_status: e.dataValues.accunt_otp_status,
    }));

    console.log(
      "all_accntsssssssssssssssssssssssssssssss: ",
      all_inactive_fltrd_accnts,
    );
    return res.status(200).json({
      all_inactive_fltrd_accnts: all_inactive_fltrd_accnts,
    });
  } catch (error) {
    console.log(error);
    const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
    return res.status(400).json({
      erMgs: erMgs_div,
    });
  }
};

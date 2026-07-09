import { month_date_data } from "../inventory_assets/data/data_components/month_date_data.js";

//events_schedules
export const dtmtndataapiUrl = async (req, res) => {
  try {
    return res.status(200).json({
      month_date_data,
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

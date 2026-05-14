import { services } from "../data/data.js";

export const hdrdtUrl = async (req, res) => {
  try {
    return res.status(200).json({
      data_sttus: true,
      data: services,
    });
  } catch (error) {
    res.status(400).json({
      erMgs: "Unable to process request!",
    });
  }
};

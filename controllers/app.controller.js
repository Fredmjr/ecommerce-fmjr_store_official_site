import { services } from "../inventory_assets/data/data.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

export const portflpgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/portfolio");
  } catch (error) {
    const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
    res.status(400).json({
      erMgs: erMgs_div,
    });
  }
};

export const wlcmimgUrl = async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../public/dist/imgs/welcome.webp");
    console.log(filePath);
    res.sendFile(filePath);
  } catch (error) {
    console.log(error);
    const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
    res.status(400).json({
      erMgs: erMgs_div,
    });
  }
};

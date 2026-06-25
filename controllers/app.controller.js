import { services } from "../inventory_assets/data/data.js";
import { cacahed_services } from "../inventory_assets/data/data.cache.js";
import path from "path";
import fs from "fs";
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
    /*welcome , Portfolio, Graphics Design, Web Dev, Desktop Dev, Courses & Classes, Author-Books, Show room, Social channels, Ads-workspace, fmjr-Graphics, Cliental */
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
export const onetimemgsUrl = async (req, res) => {
  const img_nm = req.params.id;
  try {
    /*  const filePath = path.join(__dirname, `../public/dist/imgs/${img_nm}`); */
    const filePath = path.join(
      __dirname,
      "..",
      "public",
      "dist",
      "imgs",
      `${img_nm}`,
    );
    console.log(filePath);
    //retur nothing but handle err in tyrcatch err on client
    if (!fs.existsSync(filePath)) {
      console.error(`img_not_found: ${img_nm}`);
      return res.status(204).end();
    }

    return res.sendFile(filePath, (err) => {
      if (err) {
        console.log(`Process interrupted or aborted img for: ${img_nm}`, err);
      }
    });
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
export const cachdsrvcsUrl = async (req, res) => {
  try {
    return res.status(200).json({
      cacahed_services,
    });
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

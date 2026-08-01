import {
  fmjr_clndr_evnt_data,
  month_date_data,
  usr_clndr_evnt_data,
} from "../inventory_assets/data/data_components/month_date_data.js";
import { conversation } from "../inventory_assets/data/data_components/data.conversation.js";
import { faqs_data } from "../inventory_assets/data/data_components/data.faqs.js";
import imgModel from "../models/img.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadJsonlfile_fuc } from "../inventory_assets/data/jsonl/blog.functions.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//events_schedules
export const dtmtndataapiUrl = async (req, res) => {
  try {
    return res.status(200).json({
      month_date_data,
      fmjr_clndr_evnt_data,
      usr_clndr_evnt_data,
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

//conversation
export const cnrsatnsapiUrl = async (req, res) => {
  try {
    return res.status(200).json({
      conversation,
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

//portoflio
export const prtfloimgsnamesapiUrl = async (req, res) => {
  const erMgs_div = `
    <p>err_code: 001</p>
    <p>Unable to process request!</p>
    <p>Contact customer support, if issue persists</p>
    `;
  try {
    const result = await imgModel.findAll({
      where: {
        site_sub_sec_group: "graphics_design",
      },
    });
    if (!result) {
      return res.status(400).json({
        erMgs: erMgs_div,
      });
    }
    const fltrd_results = result.map((e) => ({
      id: e.dataValues.id,
      cache_nm: `prtflo_graphics_design_${
        e.dataValues.img_filepath.match(/\/([^/]+)\.webp$/)?.[1]
      }`,
      img_filepath: e.dataValues.img_filepath,
    }));
    /*  console.log(fltrd_results); */
    return res.status(200).json({
      fltrd_results,
    });
  } catch (error) {
    console.log(error);

    return res.status(400).json({
      erMgs: erMgs_div,
    });
  }
};

//portfolio images - graphics design images dowload for cache
export const prtfloimgsapiUrl = async (req, res) => {
  const img_nm = req.params.id;
  try {
    const filePath = path.join(
      __dirname,
      `../public/dist/imgs/ctgry/portfolio/${img_nm}`,
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

//all blog data
export const blogdataapiUrl = async (req, res) => {
  try {
    const items = loadJsonlfile_fuc();
    return res.status(200).json({
      data_success: true,
      blog_data: items,
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

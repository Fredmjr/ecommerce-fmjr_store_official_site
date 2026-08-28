import {
  fmjr_clndr_evnt_data,
  month_date_data,
  usr_clndr_evnt_data,
} from "../inventory_assets/data/data_components/month_date_data.js";
import { conversation } from "../inventory_assets/data/data_components/data.conversation.js";
import { faqs_data } from "../inventory_assets/data/data_components/data.faqs.js";
import imgModel from "../models/img.model.js";
import img_indiModel from "../models/img_indi.model.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { loadJsonlfile_fuc } from "../inventory_assets/data/jsonl/blog.functions.js";
import { graphics_design_categories_type } from "../inventory_assets/data/data_components/category.varaibles.data.js";
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
    const raw_results = result.map((e) => ({
      id: e.dataValues.id,
      cache_nm: `prtflo_graphics_design_${
        e.dataValues.img_filepath.match(/\/([^/]+)\.webp$/)?.[1]
      }`,
      img_filepath: e.dataValues.img_filepath,
    }));

    //organise
    const order = [
      "prtflo_graphics_design_cover_page",
      "prtflo_graphics_design_sub_cover",
      "prtflo_graphics_design_intro_page",
      "prtflo_graphics_design_page_1",
      "prtflo_graphics_design_page_2",
      "prtflo_graphics_design_page_3",
      "prtflo_graphics_design_page_4",
      "prtflo_graphics_design_end_page",
    ];
    const sorted = raw_results.sort(
      (x, y) => order.indexOf(x.cache_nm) - order.indexOf(y.cache_nm),
    );
    const fltrd_results = sorted;

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
//searched blog data
export const srchddataapiUrl = async (req, res) => {
  const { srchd_ttl } = req.body;
  try {
    const items = loadJsonlfile_fuc();
    const result = items.filter((item) =>
      item.data?.title?.toLowerCase().includes(srchd_ttl.trim().toLowerCase()),
    );
    console.log(result.length);
    if (!result || result.length === 0) {
      return res.status(404).json({
        erMgs: "No blog found with such title.",
      });
    } else {
    }
    return res.status(200).json({
      blog_data: result,
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
//salll graphics design data
export const grphcsdsgndataapiUrl = async (req, res) => {
  try {
    if (
      !graphics_design_categories_type ||
      graphics_design_categories_type.length === 0
    ) {
      return res.status(404).json({
        erMgs: "Unalbe to retrive data",
      });
    }
    console.log(graphics_design_categories_type);
    return res.status(200).json({
      grphc_dsgn_type: graphics_design_categories_type,
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
//graphics desgin section
//general
export const gnrlflyrsdataapiUrl = async (req, res) => {
  try {
    const results = await img_indiModel.findAll({
      where: {
        site_sub_sec_group_tag: "general",
      },
    });
    if (!results || results.length === 0) {
      return res.status(404).json({
        erMgs: "Unable to retrive content",
      });
    }
    console.log(results);
    const raw_results = results.map((e) => ({
      img_id: e.dataValues.id,
      img_cache_nm: e.dataValues.img_filepath.match(/\/([^/]+)\.webp$/)?.[1],
      img_filepath: e.dataValues.img_filepath,
    }));
    return res.status(200).json({
      raw_results,
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

//church
export const chrchflyrsdataapiUrl = async (req, res) => {
  try {
    const results = await img_indiModel.findAll({
      where: {
        site_sub_sec_group_tag: "church",
      },
    });
    if (!results || results.length === 0) {
      return res.status(404).json({
        erMgs: "Unable to retrive content",
      });
    }
    console.log(results);
    const raw_results = results.map((e) => ({
      img_id: e.dataValues.id,
      img_cache_nm: e.dataValues.img_filepath.match(/\/([^/]+)\.webp$/)?.[1],
      img_filepath: e.dataValues.img_filepath,
    }));
    return res.status(200).json({
      raw_results,
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
//club & restaurant
export const clbrstrntflyrsdataapiUrl = async (req, res) => {
  try {
    const results = await img_indiModel.findAll({
      where: {
        site_sub_sec_group_tag: "club_restaurant",
      },
    });
    if (!results || results.length === 0) {
      return res.status(404).json({
        erMgs: "Unable to retrive content",
      });
    }
    console.log(results);
    const raw_results = results.map((e) => ({
      img_id: e.dataValues.id,
      img_cache_nm: e.dataValues.img_filepath.match(/\/([^/]+)\.webp$/)?.[1],
      img_filepath: e.dataValues.img_filepath,
    }));
    return res.status(200).json({
      raw_results,
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
//sports
export const sprtsflyrsdataapiUrl = async (req, res) => {
  try {
    const results = await img_indiModel.findAll({
      where: {
        site_sub_sec_group_tag: "sports",
      },
    });
    if (!results || results.length === 0) {
      return res.status(404).json({
        erMgs: "Unable to retrive content",
      });
    }
    console.log(results);
    const raw_results = results.map((e) => ({
      img_id: e.dataValues.id,
      img_cache_nm: e.dataValues.img_filepath.match(/\/([^/]+)\.webp$/)?.[1],
      img_filepath: e.dataValues.img_filepath,
    }));
    return res.status(200).json({
      raw_results,
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
//branding
export const brndngflyrsdataapiUrl = async (req, res) => {
  try {
    const results = await img_indiModel.findAll({
      where: {
        site_sub_sec_group_tag: "branding",
      },
    });
    if (!results || results.length === 0) {
      return res.status(404).json({
        erMgs: "Unable to retrive content",
      });
    }
    console.log(results);
    const raw_results = results.map((e) => ({
      img_id: e.dataValues.id,
      img_cache_nm: e.dataValues.img_filepath.match(/\/([^/]+)\.webp$/)?.[1],
      img_filepath: e.dataValues.img_filepath,
    }));
    return res.status(200).json({
      raw_results,
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
//thumbnail
export const thmbnlsflyrsdataapiUrl = async (req, res) => {
  try {
    const results = await img_indiModel.findAll({
      where: {
        site_sub_sec_group_tag: "thumbnail",
      },
    });
    if (!results || results.length === 0) {
      return res.status(404).json({
        erMgs: "Unable to retrive content",
      });
    }
    console.log(results);
    const raw_results = results.map((e) => ({
      img_id: e.dataValues.id,
      img_cache_nm: e.dataValues.img_filepath.match(/\/([^/]+)\.webp$/)?.[1],
      img_filepath: e.dataValues.img_filepath,
    }));
    return res.status(200).json({
      raw_results,
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

//
export const grphcsdsgndatasctnapiUrl = async (req, res) => {
  try {
    //1. total poster flyers
    const results = await img_indiModel.findAll({
      where: {
        site_sub_sec_group: "posters_flyers",
      },
    });
    if (!results || results.length === 0) {
      return res.status(404).json({
        erMgs: "Unable to retrive content",
      });
    }
    //reusbale datavalues filter function
    const fltr_datavalues_fuc = (arr_obj, properties) => {
      const data = arr_obj.map((obj) =>
        Object.fromEntries(
          Object.entries(obj.dataValues).filter(([key]) =>
            properties.includes(key),
          ),
        ),
      );
      return data;
    };
    //all images array
    const all_results = await img_indiModel.findAll({
      where: {
        site_sub_sec_group: "posters_flyers",
      },
    });
    const universal_props = ["id", "site_sub_sec_group_tag", "img_filepath"];
    const incorrected_file_nm_results = fltr_datavalues_fuc(
      all_results,
      universal_props,
    );
    const fltrd_all_results = incorrected_file_nm_results.map((obj) => {
      const match = obj.img_filepath.match(/([^\/]+)(?=\.[^.]+$)/);
      return {
        ...obj,
        img_filepath: match ? match[1] : obj.img_filepath,
      };
    });
    //1. general
    const gnrl_flyrs = [
      ...new Set(
        fltrd_all_results
          .filter((obj) => obj.site_sub_sec_group_tag === "general")
          .map((obj) => obj.img_filepath),
      ),
    ];

    //2. church
    const church_flyrs = [
      ...new Set(
        fltrd_all_results
          .filter((obj) => obj.site_sub_sec_group_tag === "church")
          .map((obj) => obj.img_filepath),
      ),
    ];
    //3. Club Restaurant
    const clb_rstrnt_flyrs = [
      ...new Set(
        fltrd_all_results
          .filter((obj) => obj.site_sub_sec_group_tag === "club_restaurant")
          .map((obj) => obj.img_filepath),
      ),
    ];
    //4. sports
    const sprts_flyrs = [
      ...new Set(
        fltrd_all_results
          .filter((obj) => obj.site_sub_sec_group_tag === "sports")
          .map((obj) => obj.img_filepath),
      ),
    ];
    //5. branding
    const branding_flyrs = [
      ...new Set(
        fltrd_all_results
          .filter((obj) => obj.site_sub_sec_group_tag === "branding")
          .map((obj) => obj.img_filepath),
      ),
    ];

    //5. thumbnail
    const thumbnail_flyrs = [
      ...new Set(
        fltrd_all_results
          .filter((obj) => obj.site_sub_sec_group_tag === "thumbnail")
          .map((obj) => obj.img_filepath),
      ),
    ];

    //final. recent images
    const src_dir =
      "./public/dist/imgs/ctgry/graphics_design/posters_flyers/recent";
    const recnt_flyers = fs
      .readdirSync(src_dir)
      .filter((file) => path.extname(file).toLowerCase() === ".webp")
      .map((file) => path.parse(file).name);

    return res.status(200).json({
      all_flyers_count: results.length,
      recnt_flyers: recnt_flyers,
      clb_rstrnt_flyrs: clb_rstrnt_flyrs,
      gnrl_flyrs: gnrl_flyrs,
      church_flyrs: church_flyrs,
      sprts_flyrs: sprts_flyrs,
      branding_flyrs: branding_flyrs,
      thumbnail_flyrs: thumbnail_flyrs,
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
//dowload individual recent poster or flyer for cache
export const rcntpstrflyrsindiimgapiUrl = async (req, res) => {
  const img_nm = req.params.id;
  try {
    const filePath = path.join(
      __dirname,
      `../public/dist/imgs/ctgry/graphics_design/posters_flyers/recent/${img_nm}`,
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
//dowload individual general poster or flyer for cache
export const gnrlpstrflyrsindiimgapiUrl = async (req, res) => {
  const img_nm = req.params.id;
  try {
    const filePath = path.join(
      __dirname,
      `../public/dist/imgs/ctgry/graphics_design/posters_flyers/general/${img_nm}`,
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
//dowload individual church poster or flyer for cache
export const chrchpstrflyrsindiimgapiUrl = async (req, res) => {
  const img_nm = req.params.id;
  try {
    const filePath = path.join(
      __dirname,
      `../public/dist/imgs/ctgry/graphics_design/posters_flyers/church/${img_nm}`,
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
//dowload individual sports poster or flyer for cache
export const sprtspstrflyrsindiimgapiUrl = async (req, res) => {
  const img_nm = req.params.id;
  try {
    const filePath = path.join(
      __dirname,
      `../public/dist/imgs/ctgry/graphics_design/posters_flyers/sports/${img_nm}`,
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
//dowload individual sports poster or flyer for cache
export const brndngpstrflyrsindiimgapiUrl = async (req, res) => {
  const img_nm = req.params.id;
  try {
    const filePath = path.join(
      __dirname,
      `../public/dist/imgs/ctgry/graphics_design/posters_flyers/branding/${img_nm}`,
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
//dowload individual sports poster or flyer for cache
export const thmbnlpstrflyrsindiimgapiUrl = async (req, res) => {
  const img_nm = req.params.id;
  try {
    const filePath = path.join(
      __dirname,
      `../public/dist/imgs/ctgry/graphics_design/posters_flyers/thumbnail/${img_nm}`,
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
//dowload individual clubs & rwestaurant poster or flyer for cache
export const clbsrstrntpstrflyrsindiimgapiUrl = async (req, res) => {
  const img_nm = req.params.id;
  try {
    const filePath = path.join(
      __dirname,
      `../public/dist/imgs/ctgry/graphics_design/posters_flyers/club_restaurant/${img_nm}`,
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
//dowload individual clubs & rwestaurant poster or flyer for cache
export const auhtrbksdatasctnapiUrl = async (req, res) => {
  const offcl_rlssd_bks = [
    {
      bk_ttl: "Encoded Truth (TTS, The Scripture is Key Uncut Edition)",
      bk_id: "3e629840-c548-418d-9f72-591eec68a6gu",
      bk_price: "K100",
      bk_img_nm: "through_the_scripture_the_scripture_is_key_book_cover",
      bk_img_path:
        "public/dist/imgs/ctgry/author_books/official_released_books",
      bk_dscrptn:
        "Welcome to Encoded Truth (Also titled as Through The Scripture, The Scripture is Key Uncut Edition), a concise guide to understanding the significance and power of God's written word. This document is designed to provide a brief yet impactful exploration of the scriptures, offering guidance and insight to its readers. And also provide practical guidance for spiritual growth, inspire readers to engage with God's written word. And be inspired to live a life guided by the written word",
    },
    {
      bk_ttl: "Through The Scripture, The Scripture is Key",
      bk_id: "ye629840-c548-418d-9f32-591eec6a6hu",
      bk_price: "K75",
      bk_img_nm: "encoded_truth_book_coverthrough",
      bk_img_path:
        "public/dist/imgs/ctgry/author_books/official_released_books",
      bk_dscrptn:
        "The purpose of the Through The Scripture, The Scripture is Key is to explain how and why the scriptures where introduced and what was the main objective was to bring in the scriptures. nspiration is the building block of all great things, it is the backbone of creativity and production. Even God himself used the word, the spirit, and himself as inspiration to make man. It is the same inspiration that is in the scriptures.",
    },
  ];
  const up_cmng_bks = [];
  const bk_drfts_ids = [];
  const affltd_bks = [];
  try {
    return res.status(200).json({
      offcl_rlssd_bks,
      up_cmng_bks,
      bk_drfts_ids,
      affltd_bks,
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

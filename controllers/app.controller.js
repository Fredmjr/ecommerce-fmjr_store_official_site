import { services } from "../inventory_assets/data/data.js";
import { cacahed_services } from "../inventory_assets/data/data.cache.js";
import { prvcy_data } from "../inventory_assets/data/data.privacy.js";
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
    const filePath = path.join(__dirname, `../public/dist/imgs/${img_nm}`);
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

//NAVIGATION SECTION
//sign up
export const sgnuppgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/signup");
  } catch (error) {
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

//login page
export const lgnpgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/login");
  } catch (error) {
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
//forgot password page
export const frgotpwdpgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/forgotpassword");
  } catch (error) {
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
//accounts page
export const accntspgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/accounts");
  } catch (error) {
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

//review page
export const rvwpgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/review");
  } catch (error) {
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

//issue box page
export const issbxpgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/issue_box");
  } catch (error) {
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

//dowload page
export const dwnldpgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/dowload");
  } catch (error) {
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

//bustket page
export const bsktpgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/busket");
  } catch (error) {
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

//notification page
export const notfypgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/notifications");
  } catch (error) {
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

//privacy
export const prvcypgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/privacy");
  } catch (error) {
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

//privacy - data
export const prvcydataUrl = async (req, res) => {
  try {
    return res.status(200).json({ prvcy_data });
  } catch (error) {
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

//help
export const hlppgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/help");
  } catch (error) {
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

//feedback
export const fdbkpgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/feedback");
  } catch (error) {
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

//annoucement
export const anncmntpgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/annoucement");
  } catch (error) {
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

//chat
export const chtpgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/chat");
  } catch (error) {
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

//calendar
export const clndrpgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/calendar");
  } catch (error) {
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

//events_schedules
export const evntsschdlspgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/events_schedules");
  } catch (error) {
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

//faqs
export const faqspgUrl = async (req, res) => {
  try {
    return res.status(200).render("components/faqs");
  } catch (error) {
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

//CATEGORY SECTION
//portfolio
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

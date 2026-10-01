import sharp from "sharp";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import img_indiModel from "../../../models/img_indi.model.js";
import sequelize from "../../../config/db.js";
import { Op } from "sequelize";
import { all_black_white_webp_convert_savetodb_fuc } from "./inds/all_black_white.js";
import { all_color_webp_convert_savetodb_fuc } from "./inds/all_color.js";
import { twelve_patriarchs_webp_convert_savetodb_fuc } from "./inds/twelve_patriarchs.js";
import { leading_ladies_webp_convert_savetodb_fuc } from "./inds/leading_ladies.js";
import { outfits_gadgets_webp_convert_savetodb_fuc } from "./inds/outfits_gadgets.js";

//CONVERT & SAVE
const srcDir =
  "public/assets/imgs/ctgry/showroom/digital_art/seven_spirit_beasts";
const distDir =
  "public/dist/imgs/ctgry/showroom/digital_art/seven_spirit_beasts/normal_img";
const super_cmprssd_distdir =
  "public/dist/imgs/ctgry/showroom/digital_art/seven_spirit_beasts/compressed_img";

//2. save to db
const file_to_db = async (arg_name) => {
  await sequelize.sync();
  const result = await img_indiModel.create({
    site_sec: "ctgry",
    site_sub_sec: "show_room",
    site_sub_sec_group: "digital_art",
    site_sub_sec_group_tag: "seven_spirit_beasts",
    /* img_group_branding_nm */
    img_filepath: `public/dist/imgs/ctgry/showroom/digital_art/seven_spirit_beasts/normal_img/${arg_name}.webp`,
    comments: "0",
    likes: "0",
    share: "0",
  });
  if (result) {
    console.log(`saved to db: ${arg_name}.webp`);
  }
};
//1.1 file conversion & resize
export const webp_convert_savetodb_fuc = () => {
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  fs.readdirSync(srcDir).forEach(async (file) => {
    if (/\.(jpe?g|png)$/i.test(file)) {
      /* const name = path.parse(file).name; */ //og name
      const name = uuidv4(); //uuid name
      const task = await sharp(path.join(srcDir, file))
        .webp({ quality: 30, effort: 6 })
        .toFile(path.join(distDir, `${name}.webp`));
      if (task) {
        console.log(`conerted${name}.webp`);
        //1.2 super compression
        await sharp(path.join(srcDir, file))
          .resize({ width: 70, withoutEnlargement: true })
          .webp({ quality: 45, effort: 6, smartSubsample: true })
          .toFile(path.join(super_cmprssd_distdir, `${name}.webp`));
        //2. save to db
        await file_to_db(name);
      }
    }
  });
};

/* webp_convert_savetodb_fuc(); */

//DELETE ALL
export const delete_fromdb_fuc = async () => {
  const all_inactive_accunts = await img_indiModel.findAll({
    where: {
      site_sub_sec_group_tag: "seven_spirit_beasts",
    },
  });

  if (all_inactive_accunts.length > 0) {
    const accountIds = all_inactive_accunts.map((account) => account.id);
    await img_indiModel.destroy({
      where: {
        id: {
          [Op.in]: accountIds,
        },
      },
    });
  }
};
/* delete_fromdb_fuc();
 */

//ALL SCRIPTS
/* all_black_white_webp_convert_savetodb_fuc(); */
/* all_color_webp_convert_savetodb_fuc(); */
/* twelve_patriarchs_webp_convert_savetodb_fuc(); */
/* leading_ladies_webp_convert_savetodb_fuc(); */
/* outfits_gadgets_webp_convert_savetodb_fuc(); */

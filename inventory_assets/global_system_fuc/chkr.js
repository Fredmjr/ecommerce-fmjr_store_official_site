import imgModel from "../models/img.model.js";

const c = async () => {
  try {
    const result = await imgModel.findAll({
      where: {
        site_sub_sec_group: "graphics_design",
      },
    });
    console.log(result.length);
  } catch (error) {
    console.log(error);
  }
};
c();

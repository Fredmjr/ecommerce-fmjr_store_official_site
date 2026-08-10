import { dynamic_blog_data_page_fuc } from "../inventory_assets/data/data_components/blog.data.page.template.js";
import { loadJsonlfile_fuc } from "../inventory_assets/data/jsonl/blog.functions.js";
export const shareUrl = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    const items = loadJsonlfile_fuc();
    //find blog object by id from the array
    const blog = items.find((item) => item.id === id);

    //remove unnecessary data
    const filtered_blog_data = blog.data;
    const remove_properties = ["title", "blog_tags"];
    remove_properties.forEach((e) => delete filtered_blog_data[e]);

    //blog data variables
    const blog_ttl = loadJsonlfile_fuc().find((item) => item.id === id).data
      .title;
    const upldr_nm = blog.uploaded_by;
    const date_time = `${blog.date} - ${blog.time}`;
    const blog_img =
      "https://guest.alwaysdata.net/dist/imgs/fmjr_stores default thumbnail v7.webp";
    const actual_data_info = filtered_blog_data;

    const data_page_template = dynamic_blog_data_page_fuc(
      blog_ttl,
      upldr_nm,
      date_time,
      blog_img,
      actual_data_info,
    );

    return res.status(200).send(data_page_template);
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
/* export const sharetestUrl = async (req, res) => {
  try {
    return res.status(200).send("hi");
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
 */

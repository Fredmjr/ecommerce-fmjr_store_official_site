import { dynamic_blog_data_page_fuc } from "../inventory_assets/data/data_components/blog.data.page.template.js";

export const shareUrl = async (req, res) => {
  const id = req.params.id;
  try {
    console.log(id);
    const data_page_template = dynamic_blog_data_page_fuc();

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
export const sharetestUrl = async (req, res) => {
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

import usrModel from "../../models/user.model.js";

(async () => {
  const a = await usrModel.findOne({
    where: {
      eml: "fmjrstores@gmail.com",
    },
  });

  a.destroy();
  console.log(a);
})();

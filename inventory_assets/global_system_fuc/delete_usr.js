import nwslttr_usrModel from "../../models/nwslttr_usr.model.js";

(async () => {
  const a = await nwslttr_usrModel.findOne({
    where: {
      eml: "guestgmail01@gmail.com",
    },
  });

  a.destroy();
  console.log(a);
})();

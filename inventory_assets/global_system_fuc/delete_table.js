import ttr_usrModel from "../../models/tutor_user.model.js";
//delete table
(async () => {
  await ttr_usrModel.drop();
})();

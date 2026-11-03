import ttr_usrModel from "../../models/tutor_user.model.js";
import sggtn_box_model from "../../models/suggestions.model.js";

//delete table
(async () => {
  await sggtn_box_model.drop();
})();

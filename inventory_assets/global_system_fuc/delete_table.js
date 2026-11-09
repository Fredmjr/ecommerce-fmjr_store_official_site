import ttr_usrModel from "../../models/tutor_user.model.js";
import sggtn_box_model from "../../models/suggestions.model.js";
import lessions_model from "../../models/lessions.model.js";

//delete table
(async () => {
  await lessions_model.drop();
})();

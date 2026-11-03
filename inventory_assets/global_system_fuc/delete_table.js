import ttr_usrModel from "../../models/tutor_user.model.js";
import sggtn_issue_model from "../../models/suggestion_issues.model.js";
//delete table
(async () => {
  await sggtn_issue_model.drop();
})();

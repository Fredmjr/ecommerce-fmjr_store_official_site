//Reusabled fetch request
const store_manager_request = async (
  url,
  method,
  body = null,
  customHeaders = {},
) => {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
  };

  if (body) options.body = JSON.stringify(body);

  try {
    const response = await fetch(url, options);
    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (err) {
    console.error(`Error with ${method} request:`, err);
  }
};

//Mobile colapse contents
const mobileQuery = window.matchMedia("(max-width: 576px)");
const mobile_callapsable_contents_fuc = (e) => {
  if (e.matches) {
    //drop down menu
    const a = store_manager_getelem("store_hero_rght").innerHTML;
    store_manager_getelem("store_mngrnavbar_lft_drpdwnmenu_cntnts").innerHTML =
      a;
  } else {
    store_manager_getelem("store_mngrnavbar_lft_drpdwnmenu").style.display =
      "none";
  }
};

//reusable button function
const store_manager_getelem = (e) => {
  return document.getElementById(e) || document.querySelector(`.${e}`);
};
//open or close function
closeopenFunc = (a) => {
  if (window.getComputedStyle(a).display === "none") {
    a.style.display = "block";
  } else {
    a.style.display = "none";
  }
};
//navibar reload page - logo button
document.body.addEventListener("click", async (e) => {
  if (
    e.target.closest("#navbarlogo_full") ||
    e.target.closest("#navbarlogo_icon")
  ) {
    window.location.reload();
  }
});

//return to store
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest("#vst_store_bnnr_btn");
  if (el) {
    window.location.href = "/";
  }
});

//based on chnage
mobileQuery.addEventListener("change", mobile_callapsable_contents_fuc);
mobile_callapsable_contents_fuc(mobileQuery);

//menu swap
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest("#store_mngrnavbar_rghtmenubtn");
  if (el) {
    if (mobileQuery.matches) {
      console.log("hi");

      closeopenFunc(store_manager_getelem("store_mngrnavbar_lft_drpdwnmenu"));
    }
  }
});

//accounts cardlets
document.body.addEventListener("click", async (e) => {
  if (e.target.closest("#store_hero_rght_generic_txt_ttl_accnts_id")) {
    const data = await store_manager_request(
      "/apstore_manager/accntscrdlets",
      "GET",
    );

    if (data) {
      console.log(data);
      store_manager_getelem("store_hero_lft").innerHTML = data.accnt_crdlets;
    }
  }
});
//accounts cardlets
let glbal_accnts;
let global_act;
let global_inact;
reuable_accnts_render_fuc = (arg_data, prnt_elem, clr, delete_btn_arg) => {
  let delete_btn = "";
  if (delete_btn_arg) {
    delete_btn = `<p class="strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu_btncls" id="strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu_btncls_dltaccntbtn">Delete Account</p>`;
  }

  if (arg_data[0].accunt_otp_status === "Inactive") {
    global_inact = arg_data.length;
  } else if (arg_data[0].accunt_otp_status === "Active") {
    global_act = arg_data.length;
  }
  prnt_elem.innerHTML = "";
  prnt_elem.innerHTML = `
    <div id="strmgmntaccnts_section_crdtyps_pnl">
    <div id="strmgmntaccnts_section_crdtyps_actv">Active Accounts(${global_act})</div>
    <div id="strmgmntaccnts_section_crdtyps_inctv">Inactive Accounts(${global_inact})</div>
    </div>
    `;

  for (let i = 0; i < arg_data.length; i++) {
    console.log(arg_data[i].eml);
    const p_child = document.createElement("div");
    p_child.className = "strmgmntaccnts_section_crdcl_crdcl";
    p_child.id = `strmgmntaccnts_section_crdcl_crdid_${i}`;
    p_child.dataset.accnt_id = arg_data[i].id;

    const tmp = `
      <div class="strmgmntaccnts_section_crdcl_crdcl_thumg"><img class="strmgmntaccnts_section_crdcl_crdcl_thumg_img" src="dist/imgs/fmjr_stores_courses_classes_thumbnail_img.webp" alt=""></div>
       <div class="strmgmntaccnts_section_crdcl_crdcl_info">
       <div class="strmgmntaccnts_section_crdcl_crdcl_info_lft">
        <p class="strmgmntaccnts_section_crdcl_crdcl_info_lft_eml">${arg_data[i].eml}</p>
        <p class="strmgmntaccnts_section_crdcl_crdcl_info_lft_foot">Username: ${arg_data[i].usr_nm}
       <p class="strmgmntaccnts_section_crdcl_crdcl_info_lft_foot">createdAt: ${arg_data[i].created_at}</p>
        <p class="strmgmntaccnts_section_crdcl_crdcl_info_lft_foot_stts" style="background-color: ${clr};">${arg_data[i].accunt_otp_status}</p>
       </p>
        </div>
       <div class="strmgmntaccnts_section_crdcl_crdcl_info_rght">
       <div class="strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu" style="display: none;">
       <p class="strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu_btncls_close">Close Menu</p>
        ${delete_btn}
        <p class="strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu_btncls">Update Account</p>
       </div>
       <div class="strmgmntaccnts_section_crdcl_crdcl_info_rght_btn">Actions</div></div>
       </div>
      `;

    p_child.innerHTML = tmp;

    prnt_elem.appendChild(p_child);
  }
};
document.body.addEventListener("click", async (e) => {
  if (e.target.closest(".strmgmntaccnts_section_crdcl")) {
    console.log("hhh");
    const data = await store_manager_request(
      "/apstore_manager/allaccnts",
      "GET",
    );

    if (data) {
      console.log(data);
      glbal_accnts = data;
      global_act = data.active_accnts.length;
      global_inact = data.inactive_accnts.length;
      store_manager_getelem("strmgmntaccnts_section_main").innerHTML =
        data.accnt_crdlets;
      store_manager_getelem("strmgmntaccnts_section_ttl").innerHTML =
        "All User Accounts";
      const prnt = store_manager_getelem("strmgmntaccnts_section_main");
      //active_accnts
      reuable_accnts_render_fuc(data.active_accnts, prnt, "#b3324f");
    }
  }
});

//active accounts
document.body.addEventListener("click", async (e) => {
  if (e.target.closest("#strmgmntaccnts_section_crdtyps_actv")) {
    if (glbal_accnts) {
      reuable_accnts_render_fuc(
        glbal_accnts.active_accnts,
        store_manager_getelem("strmgmntaccnts_section_main"),
        "#b3324f",
      );
    }
  }
});

//inactive accounts
document.body.addEventListener("click", async (e) => {
  if (e.target.closest("#strmgmntaccnts_section_crdtyps_inctv")) {
    if (glbal_accnts) {
      const delete_btn_arg = true;
      reuable_accnts_render_fuc(
        glbal_accnts.inactive_accnts,
        store_manager_getelem("strmgmntaccnts_section_main"),
        "#380a86",
        delete_btn_arg,
      );
    }
  }
});
//accounts drop down menu - open
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest(
    ".strmgmntaccnts_section_crdcl_crdcl_info_rght_btn",
  );
  if (el) {
    const el_prnt = el.closest(".strmgmntaccnts_section_crdcl_crdcl_info_rght");

    closeopenFunc(
      el_prnt.querySelector(
        ".strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu",
      ),
    );
  }
});
//accounts drop down menu - close
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest(
    ".strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu_btncls_close",
  );
  if (el) {
    const el_prnt = el.closest(
      ".strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu",
    );

    closeopenFunc(el_prnt);
  }
});

//accounts drop down menu - delete account
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest(
    ".strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu_btncls",
  );
  if (el) {
    const el_prnt = el.closest(
      ".strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu",
    );
    closeopenFunc(el_prnt);

    const accnt_cardlet = el.closest(".strmgmntaccnts_section_crdcl_crdcl");
    const accnt_id = accnt_cardlet.dataset.accnt_id;
    const dlt_data = await store_manager_request(
      `/apstore_manager/dltaccnt/${accnt_id}`,
      "DELETE",
    );
    if (dlt_data) {
      const delete_btn_arg = true;
      reuable_accnts_render_fuc(
        dlt_data.all_inactive_fltrd_accnts,
        store_manager_getelem("strmgmntaccnts_section_main"),
        "#380a86",
        delete_btn_arg,
      );
    }
  }
});

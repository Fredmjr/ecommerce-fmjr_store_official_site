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
  if (!e.matches) {
    const a = store_manager_getelem("store_mngrnavbar_lft_drpdwnmenu");
    if (a) {
      a.style.display = "none";
    }
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
mobile_callapsable_contents_fuc(mobileQuery);
mobileQuery.addEventListener("change", mobile_callapsable_contents_fuc);

//menu swap
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest("#store_mngrnavbar_rghtmenubtn");
  if (el) {
    if (mobileQuery.matches) {
      store_manager_getelem(
        "store_mngrnavbar_lft_drpdwnmenu_cntnts",
      ).innerHTML = a = store_manager_getelem("store_hero_rght").innerHTML;
      closeopenFunc(store_manager_getelem("store_mngrnavbar_lft_drpdwnmenu"));
    } else {
      const el = store_manager_getelem("store_mngrnavbar_lft_drpdwnmenu");
      if (el) {
        el.style.display = "none";
      }
    }
  }
});

//accounts cardlets
document.body.addEventListener("click", async (e) => {
  if (e.target.closest("#store_hero_rght_generic_txt_ttl_accnts_id")) {
    const data = await store_manager_request(
      "/store_manager/accntscrdlets",
      "GET",
    );

    if (data) {
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
  if (arg_data[0].accunt_otp_status === "Inactive") {
    global_inact = arg_data.length;
    delete_btn = `<div class="strmgmntaccnts_section_crdcl_crdcl_info_rght_btn" id="strmgmntaccnts_section_crdcl_crdcl_info_rght_dltselected_btn">Delete</div>`;
  } else if (arg_data[0].accunt_otp_status === "Active") {
    global_act = arg_data.length;
    delete_btn = `<div class="strmgmntaccnts_section_crdcl_crdcl_info_rght_btn" id="strmgmntaccnts_section_crdcl_crdcl_info_rght_actnsonselected_btn">Actions</div>`;
  }
  prnt_elem.innerHTML = "";
  prnt_elem.innerHTML = `
    <div id="strmgmntaccnts_section_crdtyps_pnl">
    <div id="strmgmntaccnts_section_crdtyps_actv">Active Accounts(${global_act})</div>
    <div id="strmgmntaccnts_section_crdtyps_inctv">Inactive Accounts(${global_inact})</div>
    </div>
    `;

  for (let i = 0; i < arg_data.length; i++) {
    /* console.log(arg_data[i].eml); */
    const p_child = document.createElement("div");
    p_child.className = "strmgmntaccnts_section_crdcl_crdcl";
    p_child.id = `strmgmntaccnts_section_crdcl_crdid_${i}`;
    p_child.dataset.accnt_id = arg_data[i].id;

    const tmp = `
      <div class="strmgmntaccnts_section_crdcl_crdcl_thumg"><img class="strmgmntaccnts_section_crdcl_crdcl_thumg_img" src="dist/imgs/fmjr_stores store management thumbnail.webp" alt=""></div>
       <div class="strmgmntaccnts_section_crdcl_crdcl_info">
       <div class="strmgmntaccnts_section_crdcl_crdcl_info_lft">
        <p class="strmgmntaccnts_section_crdcl_crdcl_info_lft_eml">${arg_data[i].eml}</p>
        <p class="strmgmntaccnts_section_crdcl_crdcl_info_lft_foot">Username: ${arg_data[i].usr_nm}
       <p class="strmgmntaccnts_section_crdcl_crdcl_info_lft_foot">createdAt: ${arg_data[i].created_at}</p>
        <p class="strmgmntaccnts_section_crdcl_crdcl_info_lft_foot_stts" style="background-color: ${clr};">${arg_data[i].accunt_otp_status}</p>
       </p>
        </div>
       <div class="strmgmntaccnts_section_crdcl_crdcl_info_rght">
       ${delete_btn}
       </div>
       </div>
      `;

    p_child.innerHTML = tmp;

    prnt_elem.appendChild(p_child);
  }
};

//remove dropdown menu
/*    <div class="strmgmntaccnts_section_crdcl_crdcl_info_rght">
       <div class="strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu" style="display: none;">
       <p class="strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu_btncls_close">Close Menu</p>
        ${delete_btn}
        <p class="strmgmntaccnts_section_crdcl_crdcl_info_rght_drpdwnmenu_btncls">Update Account</p>
       </div>
       <div class="strmgmntaccnts_section_crdcl_crdcl_info_rght_btn">Actions</div>
       </div>*/

document.body.addEventListener("click", async (e) => {
  if (e.target.closest(".strmgmntaccnts_section_crdcl")) {
    const data = await store_manager_request("/store_manager/allaccnts", "GET");
    // err
    if (data) {
      if (data.erMgs) {
        store_manager_getelem("strmgmntaccnts_section_main").innerHTML =
          data.erMgs;
      }
      //success
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

//accounts drop down menu - delete account
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest(
    "#strmgmntaccnts_section_crdcl_crdcl_info_rght_dltselected_btn",
  );
  if (el) {
    const accnt_cardlet = el.closest(".strmgmntaccnts_section_crdcl_crdcl");
    const accnt_id = accnt_cardlet.dataset.accnt_id;

    /* console.log(accnt_id); */
    const dlt_data = await store_manager_request(
      `/store_manager/dltaccnt/${accnt_id}`,
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

//oberserver
/* const store_manager_bsrvr = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      const el1 = node.matches?.("#store_mngrnavbar_mid")
        ? node
        : node.querySelector?.("#store_mngrnavbar_mid");
      if (el1) {
        console.log("cookie");
      }
    });
  });
});

store_manager_bsrvr.observe(document.body, {
  childList: true,
  subtree: true,
}); */

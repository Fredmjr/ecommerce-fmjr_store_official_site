//reusable button function
const app_btns_getelem = (e) => {
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

//resuable hide or show scroll bar
const scroll_bar_fuc = (e) => {
  const current_x = window.getComputedStyle(e).overflowX;
  const current_y = window.getComputedStyle(e).overflowY;
  if (current_x === "scroll" || current_y === "scroll") {
    e.style.overflowX = "hidden";
    e.style.overflowY = "hidden";
  } /*  else {
    e.style.overflowX = "auto";
    e.style.overflowY = "auto";
  } */
};

//reusable disbale scroll feature
let allowScroll = false;
const disable_scroll_ft_fuc = (e) => {
  allowScroll = false; // Reset to false when disabling
  document.body.style.overflow = "hidden";
  document.addEventListener(
    "touchmove",
    (event) => {
      if (!allowScroll && !e.contains(event.target)) {
        event.preventDefault();
      }
    },
    { passive: false },
  );
};

//reusable enable scroll feature
const enable_scroll_ft_fuc = () => {
  allowScroll = true;
  document.body.style.overflow = "auto";
  console.log("enabled");
};

//reusable secon spinner
const app_btns_spinner_fuc = (e) => {
  const spinner = `<div id="spnrpnl"><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span></div>`;
  e.innerHTML = "";
  e.innerHTML = spinner;
};

//resuable window height adjustmentdue to keyboard
const win_height_fuc2 = (e) => {
  window.visualViewport.addEventListener("resize", () => {
    const keyboardHeight = window.innerHeight - window.visualViewport.height;

    if (keyboardHeight > 0) {
      e.style.bottom = `${keyboardHeight}px`;
      app_btns_getelem("chtpg_mgspnl").style.paddingBottom =
        `${keyboardHeight}px`;
    } else {
      e.style.bottom = "20px";
    }
  });

  disable_scroll_ft_fuc(e);
};

//Reusabled fetch request
const app_btns_request = async (
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

//cache image template
const app_btn_cache_set_Img = async (imageUrl, img_tag) => {
  const cache = await caches.open(img_tag);
  await cache.add(imageUrl);
  /*   console.log("Image cached successfully for offline use!"); */
  return { set: true };
};

//reusable promise cached checker & if not cached download then cache & render/display img
//ALLOWWED eg exmaple
//DISALLOWED eg example.webp
//DISALLOWED eg /public/dist/imgs/example.webp
const app_btns_img_cache_checker_or_dwnld_cache_fuc = async (
  obj,
  arr,
  arg_endpoint,
  prnt_e,
  chld_e_classnm,
) => {
  prnt_e.innerHTML = "";
  const tasks_array_fuc = obj.map(async (ind_task) => {
    const img = ind_task + ".webp";
    const img_plain_nm = ind_task;
    console.log(img);
    const cachedResponse = await caches.match(`${arg_endpoint}/${img}`);

    if (cachedResponse) {
      const offline_img_blob = URL.createObjectURL(await cachedResponse.blob());
      console.log("cached", offline_img_blob);
      //render here v1.0.0.0
      const img_sclspnl = `
                <div class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl">
                <img class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl_icncl" src="dist/icons/semi menu.svg" width="10">FUllview
               `;
      const img_popuppnl = `
                <div class="grphcsflpgcntnts_ttm_main_crd_thumbnail_img_popuppnl">
                <img class="grphcsflpgcntnts_ttm_main_crd_thumbnail_img_popuppnll_icncl" src="dist/icons/like_2.svg" width="10">
               `;
      const chld_e_img = document.createElement("img");
      chld_e_img.style.width = "100%";
      chld_e_img.src = offline_img_blob;
      const chld_e = document.createElement("div");
      chld_e.className = chld_e_classnm;
      chld_e.innerHTML = img_popuppnl;
      chld_e.appendChild(chld_e_img);
      prnt_e.appendChild(chld_e);
    } else {
      try {
        set = await app_btn_cache_set_Img(
          `${arg_endpoint}/${img}`,
          img_plain_nm,
        );
        console.log("dwnld thencached img", img);
        //reuse later
        arr.push(img);
      } catch (err) {
        console.log(err);
      }
    }
  });

  await Promise.all(tasks_array_fuc);
  const tasks_done = true;
  return { tasks_done, arr, arg_endpoint, prnt_e, chld_e_classnm };
};

//default spinner
const spinner_fuc = () => {
  const spinner = `<div id="spnrpnl"><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span></div>`;
  app_btns_getelem("main").innerHTML = "";
  app_btns_getelem("main").innerHTML = spinner;
};

//reusable close next, current & previous page panel
const close_nxt_crrnt_prvs_pg_panel = () => {
  {
    app_api_getelem("grphcsflpgcntnts_ttm_lwstbttm").style.display = "none";
  }
};

//main menu
app_btns_getelem("navbrmenuBtn").addEventListener("click", () => {
  closeopenFunc(app_btns_getelem("navbrmenuBtn_drpdwnmenu"));
  app_btns_getelem("ctgry_ttl_drpdwnmenu").style.display = "none";
  app_btns_getelem("ctgry_menuBtn_drpdwnmenu").style.display = "none";
});

//category menu + small screen query reeesponsiveness
app_btns_getelem("ctgry_ttl").addEventListener("click", () => {
  const mobileQuery = window.matchMedia("(max-width: 576px)");
  if (mobileQuery.matches) {
    closeopenFunc(app_btns_getelem("ctgry_ttl_drpdwnmenu"));
    app_btns_getelem("navbrmenuBtn_drpdwnmenu").style.display = "none";
    app_btns_getelem("ctgry_menuBtn_drpdwnmenu").style.display = "none";
  }
});
//updates menu + small screen query reeesponsiveness
app_btns_getelem("ctgry_menuBtn").addEventListener("click", () => {
  const mobileQuery = window.matchMedia("(max-width: 576px)");
  if (mobileQuery.matches) {
    closeopenFunc(app_btns_getelem("ctgry_menuBtn_drpdwnmenu"));
    app_btns_getelem("ctgry_ttl_drpdwnmenu").style.display = "none";
    app_btns_getelem("navbrmenuBtn_drpdwnmenu").style.display = "none";
  }
});

//sign up
app_btns_getelem("navbrsgnupBtn").addEventListener("click", async () => {
  spinner_fuc();
  const data = await app_btns_request("/app/sgnuppg", "GET");
  if (data) {
    app_btns_getelem("main").innerHTML = data;
  }
});
//login
app_btns_getelem("navbrloginBtn").addEventListener("click", async () => {
  const data = await app_btns_request("/app/lgnpg", "GET");
  spinner_fuc();
  if (data) {
    app_btns_getelem("main").innerHTML = data;
  }
});
//see or hide universal passsword
home.addEventListener("click", async (e) => {
  //reusable
  const see_hide = (e, icon) => {
    //see
    app_btns_getelem(e).type =
      app_btns_getelem(e).type === "password" ? "text" : "password";
    //chnage icon
    app_btns_getelem(icon).src =
      app_btns_getelem(e).type === "password"
        ? "dist/icons/open-eye.svg"
        : "dist/icons/closed-eye.svg";
  };
  //sigup - password
  if (e.target.closest("#sgnup_pwd_seepwdicn")) {
    see_hide("sgnup_pwd", "sgnup_pwd_seepwdicnimg");
  }
  //sign up - confirm password
  if (e.target.closest("#sgnup_pwd_seecnfrmpwdicn")) {
    see_hide("sgnup_cnfrmpwd", "sgnup_pwd_seecnfrmpwdicnimg");
  }
  //login - password
  if (e.target.closest("#lgn_pwd_seecnfrmpwdicn")) {
    see_hide("lgn_pwd", "lgn_pwd_seecnfrmpwdicnimg");
  }
  //account management  - old password
  if (e.target.closest("#accntspgcntnts_oldpwdinpt_seepwdicn")) {
    see_hide(
      "accntspgcntnts_oldpwdinpt",
      "accntspgcntnts_oldpwdinpt_seepwdicnimg",
    );
  }
  //account management  - new password
  if (e.target.closest("#accntspgcntnts_newpwdinpt_seepwdicn")) {
    see_hide(
      "accntspgcntnts_newpwdinpt",
      "accntspgcntnts_newpwdinpt_seepwdicnimg",
    );
  }
  //account management  - confirm password
  if (e.target.closest("#accntspgcntnts_cnfrmpwdinpt_seepwdicn")) {
    see_hide(
      "accntspgcntnts_cnfrmpwdinpt",
      "accntspgcntnts_cnfrmpwdinpt_seepwdicnimg",
    );
  }
});

//switch from sign up to login page
home.addEventListener("click", async (e) => {
  if (e.target.closest("#rtntolgnpglnkBtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/lgnpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//switch from login to sign up page
home.addEventListener("click", async (e) => {
  if (e.target.closest("#lgn_sgnuptxtlink")) {
    const data = await app_btns_request("/app/sgnuppg", "GET");
    spinner_fuc();
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});
//forgot password
home.addEventListener("click", async (e) => {
  if (e.target.closest("#lgn_frgtpwdBtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/frgotpwdpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});
//accounts page
home.addEventListener("click", async (e) => {
  if (e.target.closest("#nvbr_accntsBtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/accntspg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//review page
home.addEventListener("click", async (e) => {
  if (e.target.closest("#navbrmenuBtn_drpdwnmenu_linksrvwBtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/rvwpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//Issue Box page
home.addEventListener("click", async (e) => {
  if (e.target.closest("#navbrmenuBtn_drpdwnmenu_linkissbxBtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/issbxpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//dowload page
home.addEventListener("click", async (e) => {
  if (e.target.closest("#navbrmenuBtn_drpdwnmenu_linkdwnldBtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/dwnldpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//busket page
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#navbrmenuBtn_drpdwnmenu_linkscartBtn") ||
    e.target.closest("#basketBtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/bsktpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//notify page
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#navbrmenuBtn_drpdwnmenu_linksnotfyBtn") ||
    e.target.closest("#notifyBtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/notfypg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//Privcy
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#navbrmenuBtn_drpdwnmenu_lwrslnkprvcyBtn") ||
    e.target.closest("#quklnksscls_crdlnks_prvcyplcybtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/prvcypg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
      const prvcy_data = await app_btns_request("/app/prvcydata", "GET");
      if (prvcy_data) {
        console.log(prvcy_data);
        //title
        const p = `<div class="prvcycrd">
                <p id="prvcypg_ttl">${prvcy_data.prvcy_data.ttl}</p> 
                <p id="prvcypg_dscrptn">${prvcy_data.prvcy_data.dscrptn}</p> 
                <div id="prvcycrd_subInfo"></div>                
            </div>   
            `;
        app_btns_getelem("prvcypgcntnts").innerHTML = p;
        //contents
        prvcy_data.prvcy_data.cntnts.forEach((e) => {
          const p_child = document.createElement("div");
          const p_child_subcntnts = e.sub_contents
            ? `
            ${e.sub_contents
              .map(
                (el) => `<p  class="prvcycrd_chldcrdcl_subcntntscl">${el}</p>`,
              )
              .join("")}
          `
            : "";
          p_child.innerHTML = `<img src="dist/imgs/privacy_thumb.webp" width="45"/>
              <div class="prvcycrd_chldinfo">
                <p class="prvcycrd_chldinfottl">${e.title}</p>
                <p>${e.content}</p> 
                ${p_child_subcntnts}          
            </div>             
        `;
          app_btns_getelem("prvcycrd_subInfo").appendChild(p_child);
          p_child.className = "prvcycrd_chldcrdcl";
        });
      }
    }
  }
});

//help
home.addEventListener("click", async (e) => {
  if (e.target.closest("#navbrmenuBtn_drpdwnmenu_lwrslnkhlpBtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/hlppg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//feedback
home.addEventListener("click", async (e) => {
  if (e.target.closest("#navbrmenuBtn_drpdwnmenu_lwrslnkfdbkBtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/fdbkpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//feedback
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#ctgryctgries_accmntsBtn") ||
    e.target.closest("#ctgry_menuBtn_drpdwnmenulnkanncmntsBtn") ||
    e.target.closest("#quklnksscls_crdlnks_accmntsbtn")
  ) {
    console.log("hoahoi");
    spinner_fuc();
    const data = await app_btns_request("/app/anncmntpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//chat & messages - large screen
home.addEventListener("click", async (e) => {
  if (e.target.closest("#ctgryctgries_chtmsgsBtn")) {
    const data = await app_btns_request("/app/chtpg", "GET");
    if (data) {
      app_btns_getelem("floatpop").innerHTML = "";
      app_btns_getelem("floatpop").innerHTML = data;
      closeopenFunc(app_btns_getelem("floatpop"));
      document.body.style.overflow = "hidden";
      scroll_bar_fuc(app_btns_getelem("floatpop"));
    }
  }
});
//chat & messages - small screen
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#ctgry_menuBtn_drpdwnmenuchtmgsBtn") ||
    e.target.closest("#quklnksscls_crdlnks_cntctusbtn")
  ) {
    const data = await app_btns_request("/app/chtpg", "GET");
    if (data) {
      app_btns_getelem("floatpop").innerHTML = "";
      app_btns_getelem("floatpop").innerHTML = data;
      closeopenFunc(app_btns_getelem("floatpop"));
      document.body.style.overflow = "hidden";
      scroll_bar_fuc(app_btns_getelem("floatpop"));
      win_height_fuc2(app_btns_getelem("chtpg_typngmgspnl"));
    }
  }
});

//close chat & messages float popup
home.addEventListener("click", async (e) => {
  if (e.target.closest("#chtpg_prflusrmgspnlrghtclschtmgspnlbtn")) {
    const data = await app_btns_request("/app/chtpg", "GET");
    if (data) {
      app_btns_getelem("floatpop").innerHTML = "";
      app_btns_getelem("floatpop").innerHTML = data;
      document.body.style.overflowY = "scroll";
      closeopenFunc(app_btns_getelem("floatpop"));
      enable_scroll_ft_fuc();
    }
  }
});

//account management + flip anima
let flip = false;
home.addEventListener("click", async (e) => {
  if (app_btns_getelem("accntspgcntnts_subbnnrrghtBtnicn")) {
    app_btns_getelem("accntspgcntnts_subbnnrrghtBtnicn").style.display =
      "inline-block";
    app_btns_getelem("accntspgcntnts_subbnnrrghtBtnicn").style.transition =
      "transform 0.4s ease";
  }

  if (e.target.closest("#accntspgcntnts_subbnnr")) {
    closeopenFunc(app_btns_getelem("accntspgcntnts_accntdtls"));

    flip = !flip;
    app_btns_getelem("accntspgcntnts_subbnnrrghtBtnicn").style.transform = flip
      ? "rotate(180deg)"
      : "rotate(0deg)";
  }
});
//passord management
let flip2 = false;
home.addEventListener("click", async (e) => {
  if (app_btns_getelem("accntspgcntnts_genericttlbnnricnid")) {
    app_btns_getelem("accntspgcntnts_genericttlbnnricnid").style.display =
      "inline-block";
    app_btns_getelem("accntspgcntnts_genericttlbnnricnid").style.transition =
      "transform 0.4s ease";
  }

  if (e.target.closest("#accntspgcntnts_bnnrpwsmngmnt")) {
    closeopenFunc(app_btns_getelem("accntspgcntnts_accntdtls2"));

    flip2 = !flip2;
    app_btns_getelem("accntspgcntnts_genericttlbnnricnid").style.transform =
      flip2 ? "rotate(180deg)" : "rotate(0deg)";
  }

  if (e.target.closest("#accntspgcntnts_subbnnrclndr")) {
    closeopenFunc(app_btns_getelem("accntspgcntnts_subbnnrclndrsec"));

    flip2 = !flip2;
    app_btns_getelem("accntspgcntnts_subbnnrclndrBtnicn").style.transform =
      flip2 ? "rotate(180deg)" : "rotate(0deg)";
  }
});

//feedback messages dropdown menu
home.addEventListener("click", async (e) => {
  const btn = e.target.closest(".fdbkpg_fdcarddrpwnmenuBtn");
  if (btn) {
    const specificMenu = btn.querySelector(".fdbkpg_fdcarddrpwnmenu");
    closeopenFunc(specificMenu);
  }
});

//calendar
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#ctgryctgries_clndrBtn") ||
    e.target.closest("#ctgry_menuBtn_drpdwnmenulnkclndrBtn") ||
    e.target.closest("#quklnksscls_crdlnks_eventsbtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/clndrpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//events_schedules
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#ctgryctgries_evntsschdlsBtn") ||
    e.target.closest("#ctgry_menuBtn_drpdwnmenulnkevntsschdlsBtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/evntsschdlspg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//faqs
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#ctgryctgries_faqsBtn") ||
    e.target.closest("#ctgry_menuBtn_drpdwnmenulnkfaqsBtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/faqspg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//Footr links
//promotions
home.addEventListener("click", async (e) => {
  if (e.target.closest("#quklnksscls_crdlnks_prmtnsbtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/qkprmtnspg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//Why fmjr_stores?
home.addEventListener("click", async (e) => {
  if (e.target.closest("#quklnksscls_crdlnks_whyfmjrstrsbtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/whyfmjrstrspg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});
//terms and condtions
home.addEventListener("click", async (e) => {
  if (e.target.closest("#quklnksscls_crdlnks_trmscndtnsbtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/trmscndtnspg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});
// cookies
home.addEventListener("click", async (e) => {
  if (e.target.closest("#quklnksscls_crdlnks_cookiesbtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/cookiespg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});

//CATEGORIES SECTION
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#sidemenuCtrycl_homebtn") ||
    e.target.closest("#ctgry_ttl_drpdwnmenu_hmBtn")
  ) {
    window.location.reload();
  }
});
//portfolio
let img_set_sttus = false;
let imgs_render_fuc;
let imgs_render_default_cover_fuc;
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#sidemenuCtrycl_prtflobtn") ||
    e.target.closest("#ctgry_ttl_drpdwnmenucl_prtflobtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/portflpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
      //1. get all image array
      const data_imgs_nms = await app_btns_request(
        "/api/prtfloimgsnamesapi",
        "GET",
      );
      console.log("data_imgs_nms: ", data_imgs_nms);

      //2. dowload each image & cache it
      let set;
      for (let i = 0; i < data_imgs_nms.fltrd_results.length; i++) {
        const plain_nm =
          data_imgs_nms.fltrd_results[i].img_filepath.match(
            /\/([^/]+)\.webp$/,
          )?.[1];
        plain_nm_ext = plain_nm + ".webp";
        try {
          set = await app_btn_cache_set_Img(
            `/api/prtfloimgsapi/${plain_nm_ext}`,
            /* `https://guest.alwaysdata.net/app/onetimemgs/${e}`, */
            plain_nm,
          );
          console.log("cached img", plain_nm_ext, set);
        } catch (error) {
          console.log(err);
        }
      }
      img_set_sttus = true;
      const grphics_pnl = app_api_getelem(
        "portflpgcntnts_archdsgn_prtflomain_crdhldr_gfrphcspnl",
      );
      grphics_pnl.innerHTML = "";
      grphics_pnl.innerHTML = `<div class="portflpgcntnts_archdsgn_prtflomain_crd">
            <div class="portflpgcntnts_archdsgn_prtflomain_crdthumgimg">
              <img src="dist/imgs/portifolio_1.webp" width="30" alt="" />
            </div>
            <div class="portflpgcntnts_archdsgn_prtflomain_crdinfo">
              <p class="portflpgcntnts_archdsgn_prtflomain_crdinfottl">Graphics
                Portifolio</p>
              <p class="portflpgcntnts_archdsgn_prtflomain_crdinfodate">22 Feb
                2025 - 22 Feb 2026</p>
            </div>
          </div>`;

      //3. contains panel
      /*       if (data_imgs_nms) {
        console.log(data_imgs_nms);
      } */
      /*       const p_el = app_api_getelem(
        "portflpgcntnts_archdsgn_prtflomain_lft_bttmpalete",
      );
      p_el.innerHTML = "";
      img_set_sttus = true; */

      //4. render page images
      const a_fuc = async () => {
        console.log("testing");
        //render images panel

        //...............LETS START HERE TODAY FRED, IM TIRED - YESTERNIGHT ME :)
        //INSTRUCTIONS: left rendser fmjr logo ->clcik portfolio btn-> render top (main imag preview) & btom pnls (imgs) //aim fmjr welcome log instead of hardcoded cards

        for (let i = 0; i < data_imgs_nms.fltrd_results.length; i++) {
          const plain_nm =
            data_imgs_nms.fltrd_results[i].img_filepath.match(
              /\/([^/]+)\.webp$/,
            )?.[1];
          plain_nm_ext = plain_nm + ".webp";
          console.log(plain_nm_ext);
          try {
            if (set) {
              const cachedResponse = await caches.match(
                `/api/prtfloimgsapi/${plain_nm_ext}`,
              );

              if (cachedResponse) {
                const offline_img_blob = URL.createObjectURL(
                  await cachedResponse.blob(),
                );
                console.log(offline_img_blob);
                const temp_el = document.createElement("div");

                temp_el.className =
                  "portflpgcntnts_archdsgn_prtflomain_lft_bttmpalete_crd";
                temp_el.dataset.prtflo_img = `${plain_nm_ext}`;
                temp_el.innerHTML = `
              <img class="portflpgcntnts_archdsgn_prtflomain_lft_bttmpalete_crd_thumbimg" src="${offline_img_blob}" width="30" alt="">
          `;
                //smooth natural append anima
                const smooth_append_anima = (parent, child) => {
                  child.style.opacity = 0;
                  child.style.transition = "opacity 3s ease";
                  parent.appendChild(child);
                  requestAnimationFrame(() => (child.style.opacity = 1));
                };
                smooth_append_anima(
                  app_api_getelem(
                    "portflpgcntnts_archdsgn_prtflomain_lft_bttmpalete",
                  ),
                  temp_el,
                );
                /*   app_api_getelem(
                  "portflpgcntnts_archdsgn_prtflomain_lft_bttmpalete",
                ).appendChild(temp_el); */
                console.log("adding");
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      };
      imgs_render_fuc = a_fuc;

      //
      const defult_img_cover_fuc = async () => {
        try {
          const plain_nm =
            data_imgs_nms.fltrd_results[0].img_filepath.match(
              /\/([^/]+)\.webp$/,
            )?.[1];
          plain_nm_ext = plain_nm + ".webp";
          console.log("wdadadadadad", plain_nm_ext);
          const cachedResponse = await caches.match(
            `/api/prtfloimgsapi/${plain_nm_ext}`,
          );

          if (cachedResponse) {
            const offline_img_blob = URL.createObjectURL(
              await cachedResponse.blob(),
            );
            console.log(offline_img_blob);
            const temp_img_el = document.createElement("img");
            temp_img_el.src = `${offline_img_blob}`;
            temp_img_el.id =
              "portflpgcntnts_archdsgn_prtflomain_lft_top_thumbimg";
            temp_img_el.dataset.prtflo_img = plain_nm_ext;
            const img_el = app_btns_getelem(
              "portflpgcntnts_archdsgn_prtflomain_lft_top",
            );
            img_el.innerHTML = "";
            /* img_el.appendChild(temp_img_el); */
            //smooth natural append anima
            const smooth_append_anima = (parent, child) => {
              child.style.opacity = 0;
              child.style.transition = "opacity 1s ease";
              parent.appendChild(child);
              requestAnimationFrame(() => (child.style.opacity = 1));
            };
            smooth_append_anima(img_el, temp_img_el);
          }
        } catch (err) {
          console.log(err);
        }
      };
      imgs_render_default_cover_fuc = defult_img_cover_fuc;
    }
  }
});

//preview graphics portfolio file by click - but get images first
home.addEventListener("click", async (e) => {
  if (e.target.closest(".portflpgcntnts_archdsgn_prtflomain_crd")) {
    if (img_set_sttus === true) {
      // add spinmr bar
      const spnr = `<div id="spnrpnl"><span><img class="ldngicn" width="15" src="dist/icons/loading.svg" alt=""></span></div>`;
      const elem_1 = `<div id="portflpgcntnts_archdsgn_prtflomain_lft_top">${spnr}</div>`;
      const elem_2 = ` <div id="portflpgcntnts_archdsgn_prtflomain_lft_bttmpalete_pnl"><div id="portflpgcntnts_archdsgn_prtflomain_lft_bttmpalete">${spnr}</div></div>`;
      const rndr_pnl = app_btns_getelem(
        "portflpgcntnts_archdsgn_prtflomain_lft",
      );
      rndr_pnl.innerHTML = "";
      rndr_pnl.innerHTML = `
        ${elem_1}
       ${elem_2}
        `;
      app_api_getelem(
        "portflpgcntnts_archdsgn_prtflomain_lft_bttmpalete",
      ).innerHTML = "";
      //render page images function
      await imgs_render_fuc();

      //default cover image function
      await imgs_render_default_cover_fuc();
    } else {
      console.log("Unable to preview Portfolio File");
    }
  }
});

//get cached image and preview
home.addEventListener("click", async (e) => {
  const el = e.target.closest(
    ".portflpgcntnts_archdsgn_prtflomain_lft_bttmpalete_crd",
  );
  if (el) {
    try {
      const cachedResponse = await caches.match(
        `/api/prtfloimgsapi/${el.dataset.prtflo_img}`,
      );

      if (cachedResponse) {
        const offline_img_blob = URL.createObjectURL(
          await cachedResponse.blob(),
        );
        console.log(offline_img_blob);
        const temp_img_el = document.createElement("img");
        temp_img_el.src = `${offline_img_blob}`;
        temp_img_el.id = "portflpgcntnts_archdsgn_prtflomain_lft_top_thumbimg";
        temp_img_el.dataset.prtflo_img = `${plain_nm_ext}`;
        const img_el = app_btns_getelem(
          "portflpgcntnts_archdsgn_prtflomain_lft_top",
        );
        img_el.innerHTML = "";
        /* img_el.appendChild(temp_img_el); */
        //smooth natural append anima
        const smooth_append_anima_3 = (parent, child) => {
          child.style.opacity = 0;
          child.style.transform = "translateY(20px)";
          child.style.transition = "opacity 1.5s ease, transform 1.5s ease";
          parent.appendChild(child);

          // Force two frames so the browser registers the initial state
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              child.style.opacity = 1;
              child.style.transform = "translateY(0)";
            });
          });
        };
        setTimeout(() => {
          smooth_append_anima_3(img_el, temp_img_el);
          //chnage fullview card dataset
          console.log("chnageeeeeeeeeeeeeeeee", el.dataset.prtflo_img);
          app_btns_getelem(
            "portflpgcntnts_archdsgn_prtflomain_lft_top_thumbimg",
          ).dataset.prtflo_img = el.dataset.prtflo_img;
        }, 150);
      }
    } catch (err) {
      console.log(err);
    }
  }
});

//graphics portfoilo image full view
home.addEventListener("click", async (e) => {
  const el = e.target.closest(
    "#portflpgcntnts_archdsgn_prtflomain_lft_top_thumbimg",
  );
  if (el) {
    try {
      console.log("heeeeeeeeeeeeeeeeee", el.dataset.prtflo_img);
      const cachedResponse = await caches.match(
        `/api/prtfloimgsapi/${el.dataset.prtflo_img}`,
      );

      if (cachedResponse) {
        const offline_img_blob = URL.createObjectURL(
          await cachedResponse.blob(),
        );
        console.log(offline_img_blob);
        /* const temp_img_el = document.createElement("img");
        temp_img_el.src = `${offline_img_blob}`;
        temp_img_el.id = "fullview_pnl_mid_thumbimg";
        temp_img_el.dataset.prtflo_img = `${plain_nm_ext}`; */
        const float_el_pnl = app_btns_getelem("floatpop");
        float_el_pnl.innerHTML = "";
        float_el_pnl.style.display = "block";
        const fullview_pnl = `<div id="fullview_pnl">
        <div id="fullview_pnl_cntnts">
        <div id="fullview_pnl_mid"><img src="${offline_img_blob}" id="fullview_pnl_mid_thumbimg"></div>
        <div id="fullview_pnl_bttm">
        <div id="fullview_pnl_bttm_cntntspnl">
        <button id="fullview_pnl_top_btn">
        <span><img id="fullview_pnl_top_btnicon" src="dist/icons/long_back_arrow.svg" width="15" class="app-icon"></span>Close Fullview</button>
        <p id="fullview_pnl_mid_thumbimg_ttlid">Graphics Design Portfolio</p>
        <div id="fullview_pnl_btm_endnotescntnts">
        <p class="fullview_pnl_mid_thumbimg_txtscl"><img class="fullview_pnl_mid_thumbimg_iconscl" width="11" src="dist/icons/comments.svg" alt=""><span>0</span>Coments</p>
        <p class="fullview_pnl_mid_thumbimg_txtscl"><img  class="fullview_pnl_mid_thumbimg_iconscl" " width="11" src="dist/icons/likes.svg" alt=""><span>0</span>Likes</p>
        </div>
        </div>
        </div>
        </div>
        </div>
        `;

        /*   float_el_pnl.appendChild(temp_img_el); */
        float_el_pnl.innerHTML = fullview_pnl;
        document.body.style.overflow = "hidden";
        scroll_bar_fuc(app_btns_getelem("floatpop"));
      }
    } catch (err) {
      console.log(err);
    }
  }
});

//close full previw page
home.addEventListener("click", async (e) => {
  const el = e.target.closest("#fullview_pnl_top_btn");
  if (el) {
    closeopenFunc(app_btns_getelem("floatpop"));
    enable_scroll_ft_fuc();
  }
});
//gblog page
home.addEventListener("click", async (e) => {
  const el = e.target.closest("#quklnksscls_crdlnks_blogbtn");
  if (el) {
    window.location.href = "/blog";
  }
});

//graphics design section
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#ctgry_ttl_drpdwnmenucl_grphcsdsgnbtn") ||
    e.target.closest("#sidemenuCtrycl_grphcsdsgnbtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/grphcsflpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;

      //iniate loading anima
      document
        .querySelectorAll(".grphcsflpgcntnts_ttm_main_crd")
        .forEach((el) => el.classList.add("is-loading"));
    }
  }
});
//display semi poster/flyer categories
home.addEventListener("click", async (e) => {
  if (e.target.closest("#grphc_dsgn_type_pstr_flyrs")) {
    const semi_catgry_types = [
      /*  "All", */
      "Recent",
      "General",
      "Church",
      "Club/Restaurant",
      "Sports",
      "Branding",
      "Thumbnails",
    ];
    const el_prnt = app_api_getelem("grphcsflpgcntnts_bttm_semi_ctgry");
    el_prnt.innerHTML = "";
    for (let i = 0; i < semi_catgry_types.length; i++) {
      const el_chld = document.createElement("button");
      el_chld.className = "semi_grphc_dsgn_type_pstr_flyrs_crdscl";
      el_chld.id = `semi_grphc_dsgn_type_pstr_flyrs_${i}`;
      el_chld.innerHTML = semi_catgry_types[i];

      el_prnt.appendChild(el_chld);
    }
  }
});
//graphics desgin section
//recent flyers
home.addEventListener("click", async (e) => {
  if (e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_0")) {
    app_btns_spinner_fuc(app_btns_getelem("grphcsflpgcntnts_bttm_main"));
    const data_obj = await app_btns_request(
      "/api/grphcsdsgndatasctnapi",
      "GET",
    );
    //recent posters & flyers - click based
    //reusable promise cached checker
    //arguements: array data, empty newly added array, endpoint url (individual imgs), parent variable & child classname
    //return: task done signal,  empty newly added (arr), endpoint url (individual imgs), parent variable & child classname
    const argument_arr_obj = data_obj.recnt_flyers;
    const renewly_cached = [];
    const endpoint = "/api/rcntpstrflyrsindiimgapi";
    const prnt_e_var = app_api_getelem("grphcsflpgcntnts_bttm_main");
    const chld_e_var_classnm = "grphcsflpgcntnts_ttm_main_crd_thumbnail";
    app_btns_img_cache_checker_or_dwnld_cache_fuc(
      argument_arr_obj,
      renewly_cached,
      endpoint,
      prnt_e_var,
      chld_e_var_classnm,
    ).then((e) => {
      console.log(
        "done",
        e.tasks_done,
        e.arr,
        e.arg_endpoint,
        e.prnt_e,
        e.chld_e_classnm,
      );
      if (e.arr.length > 0) {
        (async () => {
          for (let i = 0; i < e.arr.length; i++) {
            const new_cachedResponse = await caches.match(
              `${e.arg_endpoint}/${e.arr[i]}`,
            );

            if (new_cachedResponse) {
              const new_offline_img_blob = URL.createObjectURL(
                await new_cachedResponse.blob(),
              );
              console.log("new cached", new_offline_img_blob);
              //render here v2.0.0.0
              const img_sclspnl = `
                      <div class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl">
                      <img class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl_icncl" src="dist/icons/semi menu.svg" width="10">
                    `;

              const chld_e_img = document.createElement("img");
              chld_e_img.style.width = "100%";
              chld_e_img.src = new_offline_img_blob;
              const chld_e = document.createElement("div");
              chld_e.className = e.chld_e_classnm;
              chld_e.innerHTML = img_sclspnl;
              chld_e.appendChild(chld_e_img);
              e.prnt_e.appendChild(chld_e);
            }
          }
        })();
      }
    });
  }
});
//general flyers
home.addEventListener("click", async (e) => {
  if (e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_1")) {
    app_btns_spinner_fuc(app_btns_getelem("grphcsflpgcntnts_bttm_main"));
    const data_obj = await app_btns_request(
      "/api/grphcsdsgndatasctnapi",
      "GET",
    );
    if (data_obj) {
      //recent posters & flyers - click based
      //reusable promise cached checker
      //arguements: array data, empty newly added array, endpoint url (individual imgs), parent variable & child classname
      //return: task done signal,  empty newly added (arr), endpoint url (individual imgs), parent variable & child classname
      const argument_arr_obj = data_obj.gnrl_flyrs;
      const renewly_cached = [];
      const endpoint = "/api/gnrlpstrflyrsindiimgapi";
      const prnt_e_var = app_api_getelem("grphcsflpgcntnts_bttm_main");
      const chld_e_var_classnm = "grphcsflpgcntnts_ttm_main_crd_thumbnail";
      app_btns_img_cache_checker_or_dwnld_cache_fuc(
        argument_arr_obj,
        renewly_cached,
        endpoint,
        prnt_e_var,
        chld_e_var_classnm,
      ).then((e) => {
        console.log(
          "done",
          e.tasks_done,
          e.arr,
          e.arg_endpoint,
          e.prnt_e,
          e.chld_e_classnm,
        );
        if (e.arr.length > 0) {
          (async () => {
            for (let i = 0; i < e.arr.length; i++) {
              const new_cachedResponse = await caches.match(
                `${e.arg_endpoint}/${e.arr[i]}`,
              );

              if (new_cachedResponse) {
                const new_offline_img_blob = URL.createObjectURL(
                  await new_cachedResponse.blob(),
                );
                console.log("new cached", new_offline_img_blob);
                //render here v2.0.0.0
                const img_sclspnl = `
                      <div class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl">
                      <img class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl_icncl" src="dist/icons/semi menu.svg" width="10">
                    `;

                const chld_e_img = document.createElement("img");
                chld_e_img.style.width = "100%";
                chld_e_img.src = new_offline_img_blob;
                const chld_e = document.createElement("div");
                chld_e.className = e.chld_e_classnm;
                chld_e.innerHTML = img_sclspnl;
                chld_e.appendChild(chld_e_img);
                e.prnt_e.appendChild(chld_e);
              }
            }
          })();
        }
      });
    }
  }
});
//church flyers
home.addEventListener("click", async (e) => {
  if (e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_2")) {
    app_btns_spinner_fuc(app_btns_getelem("grphcsflpgcntnts_bttm_main"));
    const data = await app_btns_request("/api/chrchflyrsdataapi", "GET");
    const data_obj = await app_btns_request(
      "/api/grphcsdsgndatasctnapi",
      "GET",
    );
    if (data_obj) {
      //recent posters & flyers - click based
      //reusable promise cached checker
      //arguements: array data, empty newly added array, endpoint url (individual imgs), parent variable & child classname
      //return: task done signal,  empty newly added (arr), endpoint url (individual imgs), parent variable & child classname
      const argument_arr_obj = data_obj.church_flyrs;
      const renewly_cached = [];
      const endpoint = "/api/chrchpstrflyrsindiimgapi";
      const prnt_e_var = app_api_getelem("grphcsflpgcntnts_bttm_main");
      const chld_e_var_classnm = "grphcsflpgcntnts_ttm_main_crd_thumbnail";
      app_btns_img_cache_checker_or_dwnld_cache_fuc(
        argument_arr_obj,
        renewly_cached,
        endpoint,
        prnt_e_var,
        chld_e_var_classnm,
      ).then((e) => {
        console.log(
          "done",
          e.tasks_done,
          e.arr,
          e.arg_endpoint,
          e.prnt_e,
          e.chld_e_classnm,
        );
        if (e.arr.length > 0) {
          (async () => {
            for (let i = 0; i < e.arr.length; i++) {
              const new_cachedResponse = await caches.match(
                `${e.arg_endpoint}/${e.arr[i]}`,
              );

              if (new_cachedResponse) {
                const new_offline_img_blob = URL.createObjectURL(
                  await new_cachedResponse.blob(),
                );
                console.log("new cached", new_offline_img_blob);
                //render here v2.0.0.0
                const img_sclspnl = `
                      <div class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl">
                      <img class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl_icncl" src="dist/icons/semi menu.svg" width="10">
                    `;

                const chld_e_img = document.createElement("img");
                chld_e_img.style.width = "100%";
                chld_e_img.src = new_offline_img_blob;
                const chld_e = document.createElement("div");
                chld_e.className = e.chld_e_classnm;
                chld_e.innerHTML = img_sclspnl;
                chld_e.appendChild(chld_e_img);
                e.prnt_e.appendChild(chld_e);
              }
            }
          })();
        }
      });
    }
  }
});
//club restaurant flyers
let global_clb_rstrnt_remaining_arr_flyrs;
home.addEventListener("click", async (e) => {
  if (e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_3")) {
    app_btns_spinner_fuc(app_btns_getelem("grphcsflpgcntnts_bttm_main"));
    const data_obj = await app_btns_request(
      "/api/grphcsdsgndatasctnapi",
      "GET",
    );
    if (data_obj) {
      //recent posters & flyers - click based
      //reusable promise cached checker
      //arguements: array data, empty newly added array, endpoint url (individual imgs), parent variable & child classname
      //return: task done signal,  empty newly added (arr), endpoint url (individual imgs), parent variable & child classname

      //rrender actual flyer data
      const original_arr_obj = data_obj.clb_rstrnt_flyrs;
      const renewly_cached = [];
      const endpoint = "/api/clbsrstrntpstrflyrsindiimgapi";
      const prnt_e_var = app_api_getelem("grphcsflpgcntnts_bttm_main");
      const chld_e_var_classnm = "grphcsflpgcntnts_ttm_main_crd_thumbnail";

      const render_thirty_func = (
        argument_arr_obj,
        renewly_cached,
        endpoint,
        prnt_e_var,
        chld_e_var_classnm,
      ) => {
        app_btns_img_cache_checker_or_dwnld_cache_fuc(
          argument_arr_obj,
          renewly_cached,
          endpoint,
          prnt_e_var,
          chld_e_var_classnm,
        ).then((e) => {
          console.log(
            "done",
            e.tasks_done,
            e.arr,
            e.arg_endpoint,
            e.prnt_e,
            e.chld_e_classnm,
          );
          if (e.arr.length > 0) {
            (async () => {
              for (let i = 0; i < e.arr.length; i++) {
                const new_cachedResponse = await caches.match(
                  `${e.arg_endpoint}/${e.arr[i]}`,
                );

                if (new_cachedResponse) {
                  const new_offline_img_blob = URL.createObjectURL(
                    await new_cachedResponse.blob(),
                  );
                  console.log("new cached", new_offline_img_blob);
                  //render here v2.0.0.0
                  const img_sclspnl = `
                      <div class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl">
                      <img class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl_icncl" src="dist/icons/semi menu.svg" width="10">
                    `;

                  const chld_e_img = document.createElement("img");
                  chld_e_img.style.width = "100%";
                  chld_e_img.src = new_offline_img_blob;
                  const chld_e = document.createElement("div");
                  chld_e.className = e.chld_e_classnm;
                  chld_e.innerHTML = img_sclspnl;
                  chld_e.appendChild(chld_e_img);
                  e.prnt_e.appendChild(chld_e);
                }
              }
            })();
          }
        });
      };

      //30 per render
      const track_thirty_renders_fuc = (
        original_arr_obj,
        renewly_cached,
        endpoint,
        prnt_e_var,
        chld_e_var_classnm,
      ) => {
        if (original_arr_obj.length > 30) {
          //track 30 renders
          const thirty_arr = original_arr_obj.slice(0, 30);
          global_clb_rstrnt_remaining_arr_flyrs = original_arr_obj.slice(30);

          console.log("thirty_array: ", thirty_arr.length);
          console.log(
            "remaining_renders_array: ",
            global_clb_rstrnt_remaining_arr_flyrs.length,
          );
          console.log("total: ", original_arr_obj.length);
          //render 30
          const argument_arr_obj = thirty_arr;
          render_thirty_func(
            argument_arr_obj,
            renewly_cached,
            endpoint,
            prnt_e_var,
            chld_e_var_classnm,
          );
          //show next page button

          const nxt_pg_pl = app_api_getelem("grphcsflpgcntnts_ttm_lwstbttm");
          nxt_pg_pl.style.display = "flex";
          nxt_pg_pl.innerHTML = `
          <button id="grphcsflpgcntnts_ttm_lwstbttm_nxtpgbtn">Next Page<span><img id="grphcsflpgcntnts_ttm_lwstbttm_nxtpgbtn_icn" src="dist/icons/long_forward_arrow.svg" width="15" class="app-icon"></span></button>
          `;
        } else {
          console.log("less thann 30 - render immediate");
        }
      };

      track_thirty_renders_fuc(
        original_arr_obj,
        renewly_cached,
        endpoint,
        prnt_e_var,
        chld_e_var_classnm,
      );
    }
  }
});
//sports flyers
home.addEventListener("click", async (e) => {
  if (e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_4")) {
    app_btns_spinner_fuc(app_btns_getelem("grphcsflpgcntnts_bttm_main"));
    const data_obj = await app_btns_request(
      "/api/grphcsdsgndatasctnapi",
      "GET",
    );
    if (data_obj) {
      //recent posters & flyers - click based
      //reusable promise cached checker
      //arguements: array data, empty newly added array, endpoint url (individual imgs), parent variable & child classname
      //return: task done signal,  empty newly added (arr), endpoint url (individual imgs), parent variable & child classname
      const argument_arr_obj = data_obj.sprts_flyrs;
      const renewly_cached = [];
      const endpoint = "/api/sprtspstrflyrsindiimgapi";
      const prnt_e_var = app_api_getelem("grphcsflpgcntnts_bttm_main");
      const chld_e_var_classnm = "grphcsflpgcntnts_ttm_main_crd_thumbnail";
      app_btns_img_cache_checker_or_dwnld_cache_fuc(
        argument_arr_obj,
        renewly_cached,
        endpoint,
        prnt_e_var,
        chld_e_var_classnm,
      ).then((e) => {
        console.log(
          "done",
          e.tasks_done,
          e.arr,
          e.arg_endpoint,
          e.prnt_e,
          e.chld_e_classnm,
        );
        if (e.arr.length > 0) {
          (async () => {
            for (let i = 0; i < e.arr.length; i++) {
              const new_cachedResponse = await caches.match(
                `${e.arg_endpoint}/${e.arr[i]}`,
              );

              if (new_cachedResponse) {
                const new_offline_img_blob = URL.createObjectURL(
                  await new_cachedResponse.blob(),
                );
                console.log("new cached", new_offline_img_blob);
                //render here v2.0.0.0
                const img_sclspnl = `
                      <div class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl">
                      <img class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl_icncl" src="dist/icons/semi menu.svg" width="10">
                    `;

                const chld_e_img = document.createElement("img");
                chld_e_img.style.width = "100%";
                chld_e_img.src = new_offline_img_blob;
                const chld_e = document.createElement("div");
                chld_e.className = e.chld_e_classnm;
                chld_e.innerHTML = img_sclspnl;
                chld_e.appendChild(chld_e_img);
                e.prnt_e.appendChild(chld_e);
              }
            }
          })();
        }
      });
    }
  }
});
//branding flyers
home.addEventListener("click", async (e) => {
  if (e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_5")) {
    app_btns_spinner_fuc(app_btns_getelem("grphcsflpgcntnts_bttm_main"));
    const data_obj = await app_btns_request(
      "/api/grphcsdsgndatasctnapi",
      "GET",
    );
    if (data_obj) {
      //recent posters & flyers - click based
      //reusable promise cached checker
      //arguements: array data, empty newly added array, endpoint url (individual imgs), parent variable & child classname
      //return: task done signal,  empty newly added (arr), endpoint url (individual imgs), parent variable & child classname
      const argument_arr_obj = data_obj.branding_flyrs;
      const renewly_cached = [];
      const endpoint = "/api/brndngpstrflyrsindiimgapi";
      const prnt_e_var = app_api_getelem("grphcsflpgcntnts_bttm_main");
      const chld_e_var_classnm = "grphcsflpgcntnts_ttm_main_crd_thumbnail";
      app_btns_img_cache_checker_or_dwnld_cache_fuc(
        argument_arr_obj,
        renewly_cached,
        endpoint,
        prnt_e_var,
        chld_e_var_classnm,
      ).then((e) => {
        console.log(
          "done",
          e.tasks_done,
          e.arr,
          e.arg_endpoint,
          e.prnt_e,
          e.chld_e_classnm,
        );
        if (e.arr.length > 0) {
          (async () => {
            for (let i = 0; i < e.arr.length; i++) {
              const new_cachedResponse = await caches.match(
                `${e.arg_endpoint}/${e.arr[i]}`,
              );

              if (new_cachedResponse) {
                const new_offline_img_blob = URL.createObjectURL(
                  await new_cachedResponse.blob(),
                );
                console.log("new cached", new_offline_img_blob);
                //render here v2.0.0.0
                const img_sclspnl = `
                      <div class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl">
                      <img class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl_icncl" src="dist/icons/semi menu.svg" width="10">
                    `;

                const chld_e_img = document.createElement("img");
                chld_e_img.style.width = "100%";
                chld_e_img.src = new_offline_img_blob;
                const chld_e = document.createElement("div");
                chld_e.className = e.chld_e_classnm;
                chld_e.innerHTML = img_sclspnl;
                chld_e.appendChild(chld_e_img);
                e.prnt_e.appendChild(chld_e);
              }
            }
          })();
        }
      });
    }
  }
});
//thumbnail flyers
home.addEventListener("click", async (e) => {
  if (e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_6")) {
    app_btns_spinner_fuc(app_btns_getelem("grphcsflpgcntnts_bttm_main"));
    const data_obj = await app_btns_request(
      "/api/grphcsdsgndatasctnapi",
      "GET",
    );
    if (data_obj) {
      //recent posters & flyers - click based
      //reusable promise cached checker
      //arguements: array data, empty newly added array, endpoint url (individual imgs), parent variable & child classname
      //return: task done signal,  empty newly added (arr), endpoint url (individual imgs), parent variable & child classname
      const argument_arr_obj = data_obj.thumbnail_flyrs;
      const renewly_cached = [];
      const endpoint = "/api/thmbnlpstrflyrsindiimgapi";
      const prnt_e_var = app_api_getelem("grphcsflpgcntnts_bttm_main");
      const chld_e_var_classnm = "grphcsflpgcntnts_ttm_main_crd_thumbnail";
      app_btns_img_cache_checker_or_dwnld_cache_fuc(
        argument_arr_obj,
        renewly_cached,
        endpoint,
        prnt_e_var,
        chld_e_var_classnm,
      ).then((e) => {
        console.log(
          "done",
          e.tasks_done,
          e.arr,
          e.arg_endpoint,
          e.prnt_e,
          e.chld_e_classnm,
        );
        if (e.arr.length > 0) {
          (async () => {
            for (let i = 0; i < e.arr.length; i++) {
              const new_cachedResponse = await caches.match(
                `${e.arg_endpoint}/${e.arr[i]}`,
              );

              if (new_cachedResponse) {
                const new_offline_img_blob = URL.createObjectURL(
                  await new_cachedResponse.blob(),
                );
                console.log("new cached", new_offline_img_blob);
                //render here v2.0.0.0
                const img_sclspnl = `
                      <div class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl">
                      <img class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl_icncl" src="dist/icons/semi menu.svg" width="10">
                    `;

                const chld_e_img = document.createElement("img");
                chld_e_img.style.width = "100%";
                chld_e_img.src = new_offline_img_blob;
                const chld_e = document.createElement("div");
                chld_e.className = e.chld_e_classnm;
                chld_e.innerHTML = img_sclspnl;
                chld_e.appendChild(chld_e_img);
                e.prnt_e.appendChild(chld_e);
              }
            }
          })();
        }
      });
    }
  }
});
//flyers popup menu
home.addEventListener("click", async (e) => {
  if (e.target.closest(".grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl")) {
    console.log("s");
  }
});
//flyers popup menu - like icon
home.addEventListener("click", (e) => {
  const icon = e.target
    .closest(".grphcsflpgcntnts_ttm_main_crd_thumbnail_img_popuppnl")
    ?.querySelector(
      ".grphcsflpgcntnts_ttm_main_crd_thumbnail_img_popuppnll_icncl",
    );

  if (icon) {
    if (icon.src.includes("like.svg")) {
      // Switch to like_2
      icon.src = "dist/icons/like_2.svg";
      icon.style.filter = "";
    } else {
      // Switch back to like
      icon.src = "dist/icons/like.svg";
      icon.style.filter =
        "invert(24%) sepia(85%) saturate(2206%) hue-rotate(326deg) brightness(87%) contrast(92%)";
    }
  }
});

//close next, current & previous page panel if any tags & graphics types btns are clicked
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_0") ||
    e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_1") ||
    e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_2") ||
    e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_3") ||
    e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_4") ||
    e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_5") ||
    e.target.closest("#semi_grphc_dsgn_type_pstr_flyrs_6")
  ) {
    close_nxt_crrnt_prvs_pg_panel();
  }
});
//author and books section
home.addEventListener("click", async (e) => {
  if (e.target.closest("#sidemenuCtrycl_authrbooksbtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/authrbookspg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
      //auhtor books category cards
      const atthr_bks_ctgry_pnl = app_btns_getelem("authrbookspgcntnts_ctgry");
      if (atthr_bks_ctgry_pnl) {
        const a = [
          {
            ttl: "Officially Released Books",
            icon: "official_released_books",
            id: "authrbookspgcntnts_ctgry_crd_thumbnl_offclrlssdbksid_0",
            sub_txt: "0 In Collection",
          },
          {
            ttl: "Upcoming Books",
            icon: "up_coming_books",
            id: "authrbookspgcntnts_ctgry_crd_thumbnl_offclrlssdbksid_1",
            sub_txt: "0 In Collection",
          },
          {
            ttl: "Book Drafts & Ideas",
            icon: "book_drafts_ideas",
            id: "authrbookspgcntnts_ctgry_crd_thumbnl_offclrlssdbksid_2",
            sub_txt: "0 In Collection",
          },
          {
            ttl: "Affiliated Books",
            icon: "affiliated_books",
            id: "authrbookspgcntnts_ctgry_crd_thumbnl_offclrlssdbksid_3",
            sub_txt: "0 In Collection",
          },
          {
            ttl: "Hire Book-Space",
            icon: "hire_book_space",
            id: "authrbookspgcntnts_ctgry_crd_thumbnl_offclrlssdbksid_4",
            sub_txt: "Sale your book here",
          },
        ];
        //category cards
        for (let i = 0; i < a.length; i++) {
          const chld_el = document.createElement("div");
          chld_el.className = "authrbookspgcntnts_ctgry_crd";
          chld_el.id = `authrbookspgcntnts_ctgry_crd_id_${i}`;
          chld_el.innerHTML = `
          <div class="authrbookspgcntnts_ctgry_crd">
            <div class="authrbookspgcntnts_ctgry_crd_thumbnl" id="${a[i].id}"><div class="authrbookspgcntnts_ctgry_crd_thumbnl_content"><img class="authrbookspgcntnts_ctgry_crd_thumbnl_content_icnscl" width="12" src="dist/icons/${a[i].icon}.svg" alt=""></div></div>
            <div class="authrbookspgcntnts_ctgry_crd_info">
              <p class="authrbookspgcntnts_ctgry_crd_info_ttl">${a[i].ttl}</p>
              <p class="authrbookspgcntnts_ctgry_crd_info_dscrptn">${a[i].sub_txt}</p>
            </div>
          </div>`;

          atthr_bks_ctgry_pnl.appendChild(chld_el);
        }

        //officially released books
        const authr_bks_prnt_el = app_btns_getelem(
          "authrbookspgcntnts_maincntnts_contents",
        );
        app_btns_spinner_fuc(authr_bks_prnt_el);
        const authr_bks_obj_data = await app_btns_request(
          "/api/auhtrbksdatasctnapi",
          "GET",
        );
        //category book count
        app_btns_getelem(
          "authrbookspgcntnts_ctgry_crd_info_dscrptn",
        ).innerHTML =
          `${authr_bks_obj_data.offcl_rlssd_bks.length} In Collection`;
        //books
        if (authr_bks_obj_data.offcl_rlssd_bks) {
          authr_bks_prnt_el.innerHTML = "";
          console.log(authr_bks_obj_data.offcl_rlssd_bks);
          authr_bks_obj_data.offcl_rlssd_bks.forEach((e, index) => {
            console.log(e);
            const chld_el = document.createElement("div");
            chld_el.className =
              "authrbookspgcntnts_maincntnts_contents_cookcrd";
            chld_el.id = `authrbookspgcntnts_maincntnts_contents_cookcrd_ofclrlssdbksid_${index}`;
            chld_el.innerHTML = `
            <div class="authrbookspgcntnts_maincntnts_contents_cookcrd_thmbnl"><div class="authrbookspgcntnts_maincntnts_contents_cookcrd_thmbnl_popupricetag" >${e.bk_price}</div><img class="authrbookspgcntnts_maincntnts_contents_cookcrd_thmbnl_imgcl" src="dist/imgs/ctgry/author_books/official_released_books/${e.bk_img_nm}.webp" style="height:100%;"></div>
             <div class="authrbookspgcntnts_maincntnts_contents_cookcrd_info">
            <p class="authrbookspgcntnts_maincntnts_contents_cookcrd_info_ttl">${e.bk_ttl}</p>
            <p class="authrbookspgcntnts_maincntnts_contents_cookcrd_info_dscrptn">${e.bk_dscrptn}</p>
            <br><br>
            <div class="authrbookspgcntnts_maincntnts_contents_cookcrd_info_btm">
             <div class="authrbookspgcntnts_maincntnts_contents_cookcrd_info_btm_rght">
            <button class="authrbookspgcntnts_maincntnts_contents_cookcrd_info_btm_rght_buynowbtn">Buy Now</button></div>
            </div>
            </div>
                `;

            authr_bks_prnt_el.appendChild(chld_el);
          });
        }
      }
    }
  }
});

//officially released books by click
home.addEventListener("click", async (e) => {
  if (e.target.closest("#authrbookspgcntnts_ctgry_crd_id_0")) {
    const authr_bks_prnt_el = app_btns_getelem(
      "authrbookspgcntnts_maincntnts_contents",
    );
    app_btns_spinner_fuc(authr_bks_prnt_el);
    authr_bks_prnt_el.innerHTML = "";
    const authr_bks_obj_data = await app_btns_request(
      "/api/auhtrbksdatasctnapi",
      "GET",
    );
    if (authr_bks_obj_data.offcl_rlssd_bks) {
      console.log(authr_bks_obj_data.offcl_rlssd_bks);
      authr_bks_obj_data.offcl_rlssd_bks.forEach((e, index) => {
        console.log(e);
        const chld_el = document.createElement("div");
        chld_el.className = "authrbookspgcntnts_maincntnts_contents_cookcrd";
        chld_el.id = `authrbookspgcntnts_maincntnts_contents_cookcrd_ofclrlssdbksid_${index}`;
        chld_el.innerHTML = `
            <div class="authrbookspgcntnts_maincntnts_contents_cookcrd_thmbnl"><img class="authrbookspgcntnts_maincntnts_contents_cookcrd_thmbnl_imgcl" src="dist/imgs/ctgry/author_books/official_released_books/${e.bk_img_nm}.webp" style="height:100%;"></div>
             <div class="authrbookspgcntnts_maincntnts_contents_cookcrd_info">
            <p class="authrbookspgcntnts_maincntnts_contents_cookcrd_info_ttl">${e.bk_ttl}</p>
            <p class="authrbookspgcntnts_maincntnts_contents_cookcrd_info_dscrptn">${e.bk_dscrptn}</p>
            <br><br>
            <div class="authrbookspgcntnts_maincntnts_contents_cookcrd_info_btm">
             <div class="authrbookspgcntnts_maincntnts_contents_cookcrd_info_btm_rght">
            <button class="authrbookspgcntnts_maincntnts_contents_cookcrd_info_btm_rght_buynowbtn">Buy Now</button>
            </div>
            </div>
            </div>
                `;

        authr_bks_prnt_el.appendChild(chld_el);
      });
    }
  }
});

//upcoming books
home.addEventListener("click", async (e) => {
  if (e.target.closest("#authrbookspgcntnts_ctgry_crd_id_1")) {
    const err_icn_mgs = `<div id="authrbookspgcntnts_maincntnts_err_icn_mgs">
    <div>
    <div id="generic_empty_event_clndnr_img"><img src="dist/imgs/no_books_unavailable.webp" width="55"></div>
    <p style="text-align:center;">No Upcoming Books Available</p>
    </div>
    <div>`;
    const e = app_btns_getelem("authrbookspgcntnts_maincntnts_contents");
    e.innerHTML = "";
    e.innerHTML = err_icn_mgs;
    console.log("hhhh");
  }
});

//drafted & idea books
home.addEventListener("click", async (e) => {
  if (e.target.closest("#authrbookspgcntnts_ctgry_crd_id_2")) {
    const err_icn_mgs = `<div id="authrbookspgcntnts_maincntnts_err_icn_mgs">
    <div>
    <div id="generic_empty_event_clndnr_img"><img src="dist/imgs/no_books_unavailable.webp" width="55"></div>
    <p style="text-align:center;">No Drafted & Idea Books Available</p>
    </div>
    <div>`;
    const e = app_btns_getelem("authrbookspgcntnts_maincntnts_contents");
    e.innerHTML = "";
    e.innerHTML = err_icn_mgs;
    console.log("hhhh");
  }
});
//affiliated books
home.addEventListener("click", async (e) => {
  if (e.target.closest("#authrbookspgcntnts_ctgry_crd_id_3")) {
    const err_icn_mgs = `<div id="authrbookspgcntnts_maincntnts_err_icn_mgs">
    <div>
    <div id="generic_empty_event_clndnr_img"><img src="dist/imgs/no_books_unavailable.webp" width="55"></div>
    <p style="text-align:center;">No Affiliated Books Available</p>
    </div>
    <div>`;
    const e = app_btns_getelem("authrbookspgcntnts_maincntnts_contents");
    e.innerHTML = "";
    e.innerHTML = err_icn_mgs;
    console.log("hhhh");
  }
});

//hire book space
let global_file_input_files;
home.addEventListener("click", async (e) => {
  if (e.target.closest("#authrbookspgcntnts_ctgry_crd_id_4")) {
    const e = app_btns_getelem("authrbookspgcntnts_maincntnts_contents");
    app_btns_spinner_fuc(e);
    const data = await app_btns_request("/app/hirebkspcsctn", "GET");
    e.innerHTML = data;
  }
});

//book form submission
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      "#authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_attcmntfile_pnl_txtlink",
    )
  ) {
    const file_input = app_btns_getelem(
      "authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_attcmntfile_pnl_txtlink_filinput",
    );
    const ready_upload_files_preview = app_btns_getelem(
      "authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles",
    );

    ready_upload_files_preview.innerHTML = "";
    file_input.value = "";
    file_input.click();

    file_input.onchange = () => {
      const files = file_input.files;
      global_file_input_files = file_input.files;
      const er_msg_pnl = app_btns_getelem(
        "authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_ermgpnl",
      );
      console.log("1file_input: ", file_input);
      if (files.length > 5) {
        er_msg_pnl.innerHTML = "";
        er_msg_pnl = "";
        er_msg_pnl.innerHTML = `<p class="er_msg_pnl_txtmsg">Only 5 file selection are allowed!</p>`;

        setTimeout(() => {
          er_msg_pnl.innerHTML = "";
          file_input.value = "";
        }, 5000);
      } else if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const fl_size = (files[i].size / (1024 * 1024)).toFixed(2); //convert to MBs
          console.log(fl_size);
          const fl_nm = files[i].name;
          //too large (10 MB limit) change
          console.log("origin: ", files[i].size);
          console.log("subbbbbb: ", 10 * 1024 * 1024);
          if (files[i].size > 10 * 1024 * 1024) {
            const e = document.createElement("p");
            e.className = "er_msg_pnl_txtmsg";
            e.innerHTML = `File ${fl_nm} exceeds 10 MB limit!`;
            er_msg_pnl.appendChild(e);
          } else {
            const e = document.createElement("div");
            e.className =
              "authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl";
            e.innerHTML = `
                <div id="authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_img" ><img src="dist/imgs/file_thumbnail.webp" width="35" alt=""></div>
                <div class="authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_info">
                  <p class="authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_info_ttl">${fl_nm}</p>
                  <p class="authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_info_size">${fl_size}MB</p>
                </div>
                <div class="authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_rmvfilpnl">
                  <button class="authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_rmvfilpnl_btn" data-fl_data_nm="${fl_nm}"><span>
                      <img src="dist/icons/trash.svg" width="10">
                    </span></button>
                </div>
            `;
            ready_upload_files_preview.appendChild(e);
          }
        }
        setTimeout(() => {
          er_msg_pnl.innerHTML = "";
        }, 5000);
      }
    };
  }
});
//book form submission - removed selected file
home.addEventListener("click", async (e) => {
  const elem = e.target.closest(
    ".authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_rmvfilpnl_btn",
  );
  if (elem) {
    if (global_file_input_files) {
      //remove file
      const file_to_rmv = elem.dataset.fl_data_nm;
      const filtered_files = Array.from(global_file_input_files).filter(
        (file) => file.name !== file_to_rmv,
      );
      const dataTransfer = new DataTransfer();
      filtered_files.forEach((file) => dataTransfer.items.add(file));
      global_file_input_files = dataTransfer.files;

      //render after removed file
      const prnt = app_btns_getelem(
        "authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles",
      );
      prnt.innerHTML = "";
      if (global_file_input_files.length > 0) {
        for (let i = 0; i < global_file_input_files.length; i++) {
          const e = document.createElement("div");
          e.className =
            "authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl";
          e.innerHTML = `
                <div id="authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_img" ><img src="dist/imgs/file_thumbnail.webp" width="35" alt=""></div>
                <div class="authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_info">
                  <p class="authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_info_ttl">${global_file_input_files[i].name}</p>
                  <p class="authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_info_size">${(global_file_input_files[i].size / (1024 * 1024)).toFixed(2)}MB</p>
                </div>
                <div class="authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_rmvfilpnl">
                  <button class="authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_crdcl_rmvfilpnl_btn" data-fl_data_nm="${global_file_input_files[i].name}"><span>
                      <img src="dist/icons/trash.svg" width="10">
                    </span></button>
                </div>
            `;
          prnt.appendChild(e);
        }
      }
    }
  }
});

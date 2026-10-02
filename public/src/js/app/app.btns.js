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
  /*   console.log("enabled"); */
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
    /*    console.log(img); */
    const cachedResponse = await caches.match(`${arg_endpoint}/${img}`);

    if (cachedResponse) {
      const offline_img_blob = URL.createObjectURL(await cachedResponse.blob());
      /* console.log("cached", offline_img_blob); */
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
        /*  console.log("dwnld thencached img", img); */
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

//resuable scroll to top of elem fucntion
const app_btns_scroll_top_elem_fuc = (e) => {
  e.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

//reuable cookie
const app_btns_reusable_cookie = (elem) => {
  let ckies = document.cookie.split("; ");
  for (let i = 0; i < ckies.length; i++) {
    let cookie = ckies[i];
    let [name, value] = cookie.split("=");
    if (name === elem) {
      return decodeURIComponent(value);
    }
  }
  return null;
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
  //reset password
  if (e.target.closest("#resetpwdpg_pwd_seecnfrmpwdicn")) {
    see_hide("resetpwdpg_pwd", "resetpwdpg_pwd_seecnfrmpwdicnimg");
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
    const cookie = app_btns_reusable_cookie("usr_accnt_jwt_token");
    const c_url_data = await auth_lgn_request("/api/ckieurl", "POST", {
      c: cookie,
      r: "accntspg",
    });
    if (c_url_data) {
      /*  console.log(c_url_data); */
      const data = await app_btns_request(`${c_url_data.dir_url}`, "GET");
      if (data) {
        app_btns_getelem("main").innerHTML = data;
      }
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
    /*  console.log("hoahoi"); */
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

  if (e.target.closest("#accntspgcntnts_ttr_crs_clss_bnnr")) {
    const elem = app_btns_getelem("accntspgcntnts_ttr_crs_clss_sec");
    const temporal_content = elem.innerHTML;
    //loading
    elem.innerHTML = "";
    elem.innerHTML = `<div id="spnrpnl"><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span></div>`;
    closeopenFunc(elem);

    flip2 = !flip2;
    app_btns_getelem(
      "accntspgcntnts_ttr_crs_clss_bnnr_btnicn",
    ).style.transform = flip2 ? "rotate(180deg)" : "rotate(0deg)";

    const usr_accnt_jwt_token = app_btns_reusable_cookie("usr_accnt_jwt_token");
    const c_url_data = await auth_lgn_request(
      "/usr/crtttraccntcookie",
      "POST",
      {
        c: usr_accnt_jwt_token,
      },
    );
    //err
    /* if (condition) {
  
    } */
    //not exist
    if (c_url_data.regstr === true) {
      elem.innerHTML = temporal_content;
    }
    if (c_url_data.pending === true) {
      elem.innerHTML = c_url_data.pending_mgs;
    }
    if (c_url_data.approved === true) {
      elem.innerHTML = c_url_data.approved_mgs;
    }
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
  if (
    e.target.closest("#sidemenuCtrycl_authrbooksbtn") ||
    e.target.closest("#ctgry_ttl_drpdwnmenucl_authrbksbtn")
  ) {
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
          authr_bks_obj_data.offcl_rlssd_bks.forEach((e, index) => {
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
      //scoll to section
      app_btns_scroll_top_elem_fuc(
        app_btns_getelem("authrbookspgcntnts_ctgry"),
      );
      //main jobs
      console.log(authr_bks_obj_data.offcl_rlssd_bks);
      authr_bks_obj_data.offcl_rlssd_bks.forEach((e, index) => {
        console.log(e);
        const chld_el = document.createElement("div");
        chld_el.className = "authrbookspgcntnts_maincntnts_contents_cookcrd";
        chld_el.id = `authrbookspgcntnts_maincntnts_contents_cookcrd_ofclrlssdbksid_${index}`;
        chld_el.innerHTML = `
            <div class="authrbookspgcntnts_maincntnts_contents_cookcrd_thmbnl"><div class="authrbookspgcntnts_maincntnts_contents_cookcrd_thmbnl_popupricetag" >${e.bk_price}</div><img class="authrbookspgcntnts_maincntnts_contents_cookcrd_thmbnl_imgcl" src="dist/imgs/ctgry/author_books/official_released_books/${e.bk_img_nm}.webp" style="height:100%;"></div>
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
    //scoll to section
    app_btns_scroll_top_elem_fuc(app_btns_getelem("authrbookspgcntnts_ctgry"));
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
    //scoll to section
    app_btns_scroll_top_elem_fuc(app_btns_getelem("authrbookspgcntnts_ctgry"));
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
    app_btns_scroll_top_elem_fuc(app_btns_getelem("authrbookspgcntnts_ctgry"));
  }
});

//hire book space
let global_file_input_files;
home.addEventListener("click", async (e) => {
  if (e.target.closest("#authrbookspgcntnts_ctgry_crd_id_4")) {
    const e = app_btns_getelem("authrbookspgcntnts_maincntnts_contents");
    app_btns_spinner_fuc(e);
    const data = await app_btns_request("/app/hirebkspcsctn", "GET");
    if (data) {
      e.innerHTML = data;
      app_btns_scroll_top_elem_fuc(
        app_btns_getelem("authrbookspgcntnts_ctgry"),
      );
    }
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
      if (files.length > 5) {
        er_msg_pnl.innerHTML = "";
        er_msg_pnl.innerHTML = "";
        er_msg_pnl.innerHTML = `<p class="er_msg_pnl_txtmsg">Only 5 file selection are allowed!</p>`;

        setTimeout(() => {
          er_msg_pnl.innerHTML = "";
          file_input.value = "";
        }, 5000);
      } else if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
          const fl_size = (files[i].size / (1024 * 1024)).toFixed(2); //convert to MBs
          const fl_nm = files[i].name;
          //too large (10 MB limit) change
          const fl_prvw = () => {
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
          };
          if (files[i].size > 10 * 1024 * 1024) {
            const e = document.createElement("p");
            e.className = "er_msg_pnl_txtmsg";
            e.innerHTML = `File ${fl_nm} exceeds 10 MB limit!`;
            er_msg_pnl.appendChild(e);
            fl_prvw();
          } else {
            fl_prvw();
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

//hire book space - sumit book form
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      "#authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_submtfrmbtn",
    )
  ) {
    const eml_input = app_btns_getelem(
      "authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_eml",
    );

    const hirebkspc_input = app_btns_getelem(
      "authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rvwbox",
    );
    const er_msg_pnl = app_btns_getelem(
      "authrbookspgcntnts_maincntnts_contents_hirebkspc_pnl_rdytouploadfiles_ermgpnl",
    );
    if (eml_input.value && hirebkspc_input.value) {
      if (
        eml_input.value &&
        hirebkspc_input.value &&
        !global_file_input_files
      ) {
        /*    console.log(
          "email & descrption: ",
          eml_input.value,
          hirebkspc_input.value,
        ); */
        e.target.innerHTML = `<span><img class="ldngicn" width="30" style="  filter: invert(24%) sepia(85%) saturate(2206%) hue-rotate(326deg)
    brightness(87%) contrast(92%);" src="dist/icons/loading.svg" alt=""></span>`;
      } else if (
        eml_input.value &&
        hirebkspc_input.value &&
        global_file_input_files
      ) {
        /* console.log(
          "email & descrption: ",
          eml_input.value,
          hirebkspc_input.value,
        );
        console.log("orignal: ", global_file_input_files); */
        e.target.innerHTML = `<span><img class="ldngicn" width="30" style="  filter: invert(24%) sepia(85%) saturate(2206%) hue-rotate(326deg)
    brightness(87%) contrast(92%);" src="dist/icons/loading.svg" alt=""></span>`;
      }
    } else {
      const e = document.createElement("p");
      e.className = "er_msg_pnl_txtmsg";
      er_msg_pnl.innerHTML = "";
      e.innerHTML = `Email or Description field is empty!`;
      er_msg_pnl.appendChild(e);
      setTimeout(() => {
        er_msg_pnl.innerHTML = "";
      }, 5000);
    }
  }
});

//fmjr-Graphics Workspace
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#ctgry_ttl_drpdwnmenucl_fmjrgrphcswrkspbtn") ||
    e.target.closest("#sidemenuCtrycl_fmjrgrphcswrkspbtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/fmjrgrphcswrkspcpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});
//Courses & Classes
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#ctgry_ttl_drpdwnmenucl_corsclsswrkspcpgbtn") ||
    e.target.closest("#sidemenuCtrycl_corsclsswrkspcpgbtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/corsclsswrkspcpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;

      let tmp = "";
      for (let i = 0; i < 1; i++) {
        tmp += my_cors_clss_tmp;
        console.log(i);
      }
      const crdlet_prnt = `<div class="cors_clss_wrkspcpg_cntnts_main_crdlet_prntcntnr">${tmp}</div>`;
      const prnt = app_btns_getelem("cors_clss_wrkspcpg_cntnts_main");
      prnt.innerHTML = "";
      prnt.innerHTML = crdlet_prnt;
    }
  }
});
//Courses & Classes - preview course by click
home.addEventListener("click", async (e) => {
  if (e.target.closest(".cors_clss_wrkspcpg_cntnts_main_crdlet_bttm_btn")) {
    //large screen side menu
    const linkbtns_pnl = document.createElement("div");
    linkbtns_pnl.id = "cors_clss_wrkspcpg_cntnts_main_prvwpnl_lft_main";
    const arr_d = [
      "Account Details",
      "Course / Class Details",
      "Payments",
      "Track Progress",
      "Chat & Messages",
    ];
    for (let i = 0; i < arr_d.length; i++) {
      const e = document.createElement("button");
      e.className = "cors_clss_wrkspcpg_cntnts_main_prvwpnl_lft_main_linkbtn";
      e.id = `cors_clss_wrkspcpg_cntnts_main_prvwpnl_lft_main_linkbtn_id_${i}`;
      e.textContent = arr_d[i];
      linkbtns_pnl.appendChild(e);
      console.log(e);
    }
    //small screen dop down menu
    //small screen dop down menu
    const drpdwn_linkbtns_pnl = document.createElement("div");
    drpdwn_linkbtns_pnl.id =
      "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu";
    for (let i = 0; i < arr_d.length; i++) {
      const e = document.createElement("button");
      e.className =
        "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnscl";
      e.id = `cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnid_${i}`;
      e.textContent = arr_d[i];
      drpdwn_linkbtns_pnl.appendChild(e);
      console.log(e);
    }

    if (linkbtns_pnl) {
      const prnt_e = app_btns_getelem("cors_clss_wrkspcpg_cntnts_main");
      prnt_e.innerHTML = "";
      const chld_e = document.createElement("div");
      chld_e.id = "cors_clss_wrkspcpg_cntnts_main_prvwpnl";
      chld_e.innerHTML = `
    <div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_lft">
    <div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_lft_ttlbar">All Courses & Classes</div>
    ${linkbtns_pnl.outerHTML}
    <div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_lft_bttm">caaaaa</div>
    </div>
    <div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght">
     <div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_ttlbar_pnl">
     <div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_ttlbar">Account Details</div>
     <div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu"><img id="ctgry_ttlicon" src="dist/icons/three menu.svg" width="15" class="app-icon"></div>
     <div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl" style="display: none;">${drpdwn_linkbtns_pnl.outerHTML}</div>
     </div>
      <div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_main"></div>
    </div>
    `;
      prnt_e.appendChild(chld_e);
    }
  }
});

///Courses & Classes - show drop down menu
home.addEventListener("click", async (e) => {
  if (e.target.closest("#cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu")) {
    closeopenFunc(
      app_btns_getelem(
        "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl",
      ),
    );
  }
});

//chats and messsages temp
const chts_messgs_temp = `
<div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section">
<div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_top">
<div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_top_lft">Chat Messages</div>
<div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_top_rght">
<div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_top_rght_msgsid">0 Messages</div>
<div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_top_rght_prtcpntsid">0 Participants</div>
</div>
</div>
<div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_mid">
<div class="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_mid_mgssctn_rcvr_crd">
<div class="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_mid_mgssctn_rcvr_crd_cntnts">
<p class="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_mid_mgssctn_rcvr_date">Musonda Fred - 11:20AM</p>
<div  class="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_mid_mgssctn_rcvr_mgs"> EOIA ASY y ekj asyd oksopda hyida daosdua apdkasldapo sdpaosdpasd asyu asda dasidoa saspdoas dasa da[dia da0d[a daduap dadoad aapsdoapd aua da[spdoa da[doasd apda sda da[dia da[dopad asd ad adia da[da dauda [pdpa da[0d s[d as[d ad as[da [da dad a[d [sduada dadua[d a[daud asdasd asuda da[da[s d</div>
</div>
</div>


<div class="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_mid_mgssctn_sndr_crd">
<div class="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_mid_mgssctn_sndr_crd_cntnts">
<p class="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_mid_mgssctn_sndr_date">You - 11:20AM</p>
<div  class="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_mid_mgssctn_sndr_mgs"> EOIA ASY y ekj asyd oksopda hyida daosdua apdkasldapo sdpaosdpasd asyu asda dasidoa saspdoas dasa da[dia da0d[a daduap dadoad aapsdoapd aua da[spdoa da[doasd apda sda da[dia da[dopad asd ad adia da[da dauda [pdpa da[0d s[d as[d ad as[da [da dad a[d [sduada dadua[d a[daud asdasd asuda da[da[s d</div>
</div>
</div>
</div>
<div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_ftr">
<div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_ftr_cotnts">
<div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_ftr_rght_mgspnl"><textarea id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_ftr_txtarainpt" name="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_ftr_txtarainpt" placeholder="Messsage" rows="1" style="resize: none;" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="none"></textarea></div>
<div id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_ftr_rght">
<button id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_ftr_attchfile_btn"><img src="dist/icons/paperclip.svg" width="10"></button>
<button id="cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl_chtsmsgs_section_ftr_sndmgs_btn"><img class="grphcsflpgcntnts_ttm_main_crd_thumbnail_sclspnl_icncl" src="dist/icons/send_message.svg" width="10"></button>
</div>
</div>
</div>
</div>
`;
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnid_4",
    ) ||
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_lft_main_linkbtn_id_4",
    )
  ) {
    const prnt = app_btns_getelem(
      "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_main",
    );

    prnt.innerHTML = "";
    prnt.innerHTML = chts_messgs_temp;
    app_btns_getelem(
      "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_ttlbar",
    ).innerHTML = e.target.innerHTML;
  }
});
//Accounts details
const prfl_sectn_temp = `
<div id="prfl_sectn_tem_crd">
<div id="prfl_sectn_tem_crd_pflimg"><img id="prfl_sectn_tem_crd_pflimg_id" width="50" src="dist/imgs/default_profile_img_1.webp" alt=""></span></div>
<div id="prfl_sectn_tem_crd_pflinfo">
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Username: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">fmjr_stores Guest</p>
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Email Address: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">Email Address Unlisted</p>
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Contact Line 1: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">Contact Unlisted</p>
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Contact Line 2: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">Contact Unlisted</p>
</br>
<button id="prfl_sectn_tem_crd_pfl_edtbtn"><img id="ctgry_ttlicon" src="dist/icons/refresh.svg" width="15" class="app-icon">Update Details</button>
</div>
</div>
`;
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_lft_main_linkbtn_id_0",
    ) ||
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnid_0",
    )
  ) {
    const prnt = app_btns_getelem(
      "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_main",
    );

    prnt.innerHTML = "";
    prnt.innerHTML = prfl_sectn_temp;
    app_btns_getelem(
      "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_ttlbar",
    ).innerHTML = e.target.innerHTML;
  }
});
//update accounts details - courses & classes
home.addEventListener("click", async (e) => {
  if (e.target.closest("#prfl_sectn_tem_crd_pfl_edtbtn")) {
    const data = await app_btns_request("/app/lgnpg", "GET");
    spinner_fuc();
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});
//close dropdown menu if btns rae clicked - courses & classes
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnid_0",
    ) ||
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnid_1",
    ) ||
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnid_2",
    ) ||
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnid_3",
    ) ||
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnid_4",
    ) ||
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnid_5",
    )
  ) {
    closeopenFunc(
      app_btns_getelem(
        "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_pnl",
      ),
    );
  }
});
//auto load account details - courses & classes
home.addEventListener("click", async (e) => {
  if (e.target.closest(".cors_clss_wrkspcpg_cntnts_main_crdlet_bttm_btn")) {
    const prnt = app_btns_getelem(
      "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_main",
    );
    prnt.innerHTML = "";
    prnt.innerHTML = prfl_sectn_temp;
  }
});
//Cousrse & classes deatils - courses & classes
const crs_clss_detils = `
<div class="crs_clss_detils_crd">
<div class="crs_clss_detils_crd_img"></div>
<div class="crs_clss_detils_crd_info">
<p id="crs_clss_detils_crd_info_ttl">Graphics Design Crash course</p>
<p id="crs_clss_detils_crd_info_dscrptn">IIH AGS AIJ ats el asg aspas a asdasdas IIH AGS AIJ ats el asg aspas a asdasdas IIH AGS AIJ ats el asg aspas a asdasdas IIH AGS AIJ ats el asg aspas a asdasdas IIH AGS AIJ ats el asg aspas a asdasdas IIH AGS AIJ ats el asg aspas a asdasdas IIH AGS AIJ ats el asg aspas a asdasdas IIH AGS AIJ ats el asg aspas a asdasdas IIH AGS AIJ ats el asg aspas a asdasdas IIH AGS AIJ ats el asg aspas a asdasdas </p>
<p id="crs_clss_detils_crd_info_uplddate"><span><img src="dist/icons/time.svg"  width="8"></span>Published: 20 September 2026</p>
<p id="crs_clss_detils_crd_info_updtddate"><span><img src="dist/icons/time.svg" width="8"></span>Uploaded: 23 September 2026</p>
<br>
<div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_mid_ftr">
  <div class="generic_tag_cl"><span><img src="dist/icons/official_released_books.svg" class="cors_clss_wrkspcpg_genric_icn" width="8"></span>30 Lessons</div>
  <div class="generic_tag_cl"><span><img src="dist/icons/time.svg" class="cors_clss_wrkspcpg_genric_icn" width="8"></span>3 Months Duration</div>
  <div class="generic_tag_cl"><span><img src="dist/icons/location.svg" class="cors_clss_wrkspcpg_genric_icn" width="11"></span>Online Session</div></div>
</div>
<div class="cors_clss_wrkspcpg_dvdr_line"></div>
<div id="crs_clss_detils_crd_tags">
<div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_typetag">Graphics Design</div>
<div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_typetag">Understanding Programming</div>
<div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_typetag">UIUX Designn</div>
</div>
<br><br>
<div id="crs_clss_detils_crd_subscrptnbox">
<div class="crs_clss_detils_crd_subscrptnbox_price">
<p class="crs_clss_detils_crd_subscrptnbox_price_txt">Subscription Plan</p>
<p class="crs_clss_detils_crd_subscrptnbox_price_amnt">$10</p>
</div>
<div class="crs_clss_detils_crd_subscrptnbox_mid">
<p class="crs_clss_detils_crd_subscrptnbox_mid_txt"><span><img class="generic_fltrd_icn_cl" width="10" src="dist/icons/check.svg" alt=""></span>Tutor (Tutors)</p>
<p class="crs_clss_detils_crd_subscrptnbox_mid_txt"><span><img class="generic_fltrd_icn_cl" width="10" src="dist/icons/check.svg" alt=""></span>Roadmap</p>
<p class="crs_clss_detils_crd_subscrptnbox_mid_txt"><span><img class="generic_fltrd_icn_cl" width="10" src="dist/icons/check.svg" alt=""></span>Session Materials</p>
</div>
<div class="crs_clss_detils_crd_subscrptnbox_enrlld">
<button class="crs_clss_detils_crd_subscrptnbox_enrlld_btn" id="crs_clss_detils_crd_subscrptnbox_enrlld_btnid">Active</button>
</div>
</div>

<div id="crs_clss_detils_crd_roadmap_dtls">
<p id="crs_clss_detils_crd_roadmap_dtls_ttl">Key Roadmap</p>
<div id="crs_clss_detils_crd_roadmap_dtls_dwnldbtnpnl"><button id="crs_clss_detils_crd_roadmap_dtls_dwnldbtn"><span><img src="dist/icons/download.svg" class="cors_clss_wrkspcpg_genric_icn" width="12"></span>Download Roadmap</button></div>
</div>
<br><br>
<div id="crs_clss_detils_crd_ttrinfo">
<p id="crs_clss_detils_crd_ttrinfo_ttl">Tutor Infomation</p>
<br>
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Username: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">Unlisted</p>
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Email Address: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">Unlisted</p>
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Facebook Social Handle: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">Unlisted</p>
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Instgram Social Handle: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">Unlisted</p>
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Tick Tok Social Handle: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">fmjr_stores Guest</p>
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">LinkedIn Tok Social Handle: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">Unlisted</p>
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Behance Social Handle: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">Unlisted</p>
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Contact Line 1: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">Unlisted</p>
<p class="prfl_sectn_tem_crd_pflinfo_ttlcl">Contact Line 2: </p>
<p class="prfl_sectn_tem_crd_pflinfo_dscrptncl">Unlisted</p>
</div>


</div>
`;
//course or class details
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnid_1",
    ) ||
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_lft_main_linkbtn_id_1",
    )
  ) {
    const prnt = app_btns_getelem(
      "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_main",
    );
    prnt.innerHTML = "";
    prnt.innerHTML = crs_clss_detils;
    app_btns_getelem(
      "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_ttlbar",
    ).innerHTML = e.target.innerHTML;
  }
});

//Track Progress
const trck_prgrss_temp = (percntg_bar) => {
  console.log(percntg_bar);
  //percentage bar
  const r = 35,
    c = 2 * Math.PI * r;
  const svgNS = "http://www.w3.org/2000/svg";

  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "progress-ring");
  svg.setAttribute("width", "80");
  svg.setAttribute("height", "80");

  const bg = document.createElementNS(svgNS, "circle");
  bg.setAttribute("class", "bg");
  bg.setAttribute("cx", "40");
  bg.setAttribute("cy", "40");
  bg.setAttribute("r", r);

  const prog = document.createElementNS(svgNS, "circle");
  prog.setAttribute("class", "progress");
  prog.setAttribute("cx", "40");
  prog.setAttribute("cy", "40");
  prog.setAttribute("r", r);
  prog.setAttribute("stroke-dasharray", c);
  prog.setAttribute("stroke-dashoffset", c - (c * percntg_bar) / 100);

  const txt = document.createElementNS(svgNS, "text");
  txt.setAttribute("x", "50%");
  txt.setAttribute("y", "50%");
  txt.setAttribute("text-anchor", "middle");
  txt.setAttribute("dy", ".3em");
  txt.textContent = percntg_bar + "%";

  svg.append(bg, prog, txt);

  //main details
  return (t = `
<div class="trck_prgrss_card">
<div class="trck_prgrss_card_lft">
<div class="trck_prgrss_card_lft_ttl">Course / Class Progress</div>
<div class="trck_prgrss_card_lft_prntgbar">${svg.outerHTML}</div>
</div>
<div class="trck_prgrss_card_rght">
<div class="trck_prgrss_card_rght_crd">
<div class="trck_prgrss_card_rght_crd_img"><span><img class="trck_prgrss_card_rght_crd_img_thumb" src="dist/imgs/fmjr_stores_courses_classes_thumbnail_img.webp" alt=""></span></div>
<div class="trck_prgrss_card_rght_crd_info">
<div class="trck_prgrss_card_rght_crd_info_lft">
<p class="trck_prgrss_card_rght_crd_info_lft_ttl">Graphics Desgin Guide 2026</p>
<p class="trck_prgrss_card_rght_crd_info_lft_dcsrptn">Lesson #1</p>
</div>
<div class="trck_prgrss_card_rght_crd_info_rght"><div class="trck_prgrss_card_rght_crd_info_rght_btn">Completed</div></div>
</div>
</div>

<div class="trck_prgrss_card_rght_crd">
<div class="trck_prgrss_card_rght_crd_img"><span><img class="trck_prgrss_card_rght_crd_img_thumb" src="dist/imgs/fmjr_stores_courses_classes_thumbnail_img.webp" alt=""></span></div>
<div class="trck_prgrss_card_rght_crd_info">
<div class="trck_prgrss_card_rght_crd_info_lft">
<p class="trck_prgrss_card_rght_crd_info_lft_ttl">Graphics Desgin Guide 2026</p>
<p class="trck_prgrss_card_rght_crd_info_lft_dcsrptn">Lesson #1</p>
</div>
<div class="trck_prgrss_card_rght_crd_info_rght"><div class="trck_prgrss_card_rght_crd_info_rght_btn">Completed</div></div>
</div>
</div>

<div class="trck_prgrss_card_rght_crd">
<div class="trck_prgrss_card_rght_crd_img"><span><img class="trck_prgrss_card_rght_crd_img_thumb" src="dist/imgs/fmjr_stores_courses_classes_thumbnail_img.webp" alt=""></span></div>
<div class="trck_prgrss_card_rght_crd_info">
<div class="trck_prgrss_card_rght_crd_info_lft">
<p class="trck_prgrss_card_rght_crd_info_lft_ttl">Graphics Desgin Guide 2026</p>
<p class="trck_prgrss_card_rght_crd_info_lft_dcsrptn">Lesson #1</p>
</div>
<div class="trck_prgrss_card_rght_crd_info_rght"><div class="trck_prgrss_card_rght_crd_info_rght_btn">Completed</div></div>
</div>
</div>

<div class="trck_prgrss_card_rght_crd">
<div class="trck_prgrss_card_rght_crd_img"><span><img class="trck_prgrss_card_rght_crd_img_thumb" src="dist/imgs/fmjr_stores_courses_classes_thumbnail_img.webp" alt=""></span></div>
<div class="trck_prgrss_card_rght_crd_info">
<div class="trck_prgrss_card_rght_crd_info_lft">
<p class="trck_prgrss_card_rght_crd_info_lft_ttl">Graphics Desgin Guide 2026</p>
<p class="trck_prgrss_card_rght_crd_info_lft_dcsrptn">Lesson #1</p>
</div>
<div class="trck_prgrss_card_rght_crd_info_rght"><div class="trck_prgrss_card_rght_crd_info_rght_btn">Completed</div></div>
</div>
</div>

<div class="trck_prgrss_card_rght_crd">
<div class="trck_prgrss_card_rght_crd_img"><span><img class="trck_prgrss_card_rght_crd_img_thumb" src="dist/imgs/fmjr_stores_courses_classes_thumbnail_img.webp" alt=""></span></div>
<div class="trck_prgrss_card_rght_crd_info">
<div class="trck_prgrss_card_rght_crd_info_lft">
<p class="trck_prgrss_card_rght_crd_info_lft_ttl">Graphics Desgin Guide 2026</p>
<p class="trck_prgrss_card_rght_crd_info_lft_dcsrptn">Lesson #1</p>
</div>
<div class="trck_prgrss_card_rght_crd_info_rght"><div class="trck_prgrss_card_rght_crd_info_rght_btn">Completed</div></div>
</div>
</div>


<div class="trck_prgrss_card_rght_crd">
<div class="trck_prgrss_card_rght_crd_img"><span><img class="trck_prgrss_card_rght_crd_img_thumb" src="dist/imgs/fmjr_stores_courses_classes_thumbnail_img.webp" alt=""></span></div>
<div class="trck_prgrss_card_rght_crd_info">
<div class="trck_prgrss_card_rght_crd_info_lft">
<p class="trck_prgrss_card_rght_crd_info_lft_ttl">Graphics Desgin Guide 2026</p>
<p class="trck_prgrss_card_rght_crd_info_lft_dcsrptn">Lesson #1</p>
</div>
<div class="trck_prgrss_card_rght_crd_info_rght"><div class="trck_prgrss_card_rght_crd_info_rght_btn">Completed</div></div>
</div>
</div>

<div class="trck_prgrss_card_rght_crd">
<div class="trck_prgrss_card_rght_crd_img"><span><img class="trck_prgrss_card_rght_crd_img_thumb" src="dist/imgs/fmjr_stores_courses_classes_thumbnail_img.webp" alt=""></span></div>
<div class="trck_prgrss_card_rght_crd_info">
<div class="trck_prgrss_card_rght_crd_info_lft">
<p class="trck_prgrss_card_rght_crd_info_lft_ttl">Graphics Desgin Guide 2026</p>
<p class="trck_prgrss_card_rght_crd_info_lft_dcsrptn">Lesson #1</p>
</div>
<div class="trck_prgrss_card_rght_crd_info_rght"><div class="trck_prgrss_card_rght_crd_info_rght_btn">Completed</div></div>
</div>
</div>


<div class="trck_prgrss_card_rght_crd">
<div class="trck_prgrss_card_rght_crd_img"><span><img class="trck_prgrss_card_rght_crd_img_thumb" src="dist/imgs/fmjr_stores_courses_classes_thumbnail_img.webp" alt=""></span></div>
<div class="trck_prgrss_card_rght_crd_info">
<div class="trck_prgrss_card_rght_crd_info_lft">
<p class="trck_prgrss_card_rght_crd_info_lft_ttl">Graphics Desgin Guide 2026</p>
<p class="trck_prgrss_card_rght_crd_info_lft_dcsrptn">Lesson #1</p>
</div>
<div class="trck_prgrss_card_rght_crd_info_rght"><div class="trck_prgrss_card_rght_crd_info_rght_btn">Completed</div></div>
</div>
</div>

<div class="trck_prgrss_card_rght_crd">
<div class="trck_prgrss_card_rght_crd_img"><span><img class="trck_prgrss_card_rght_crd_img_thumb" src="dist/imgs/fmjr_stores_courses_classes_thumbnail_img.webp" alt=""></span></div>
<div class="trck_prgrss_card_rght_crd_info">
<div class="trck_prgrss_card_rght_crd_info_lft">
<p class="trck_prgrss_card_rght_crd_info_lft_ttl">Graphics Desgin Guide 2026</p>
<p class="trck_prgrss_card_rght_crd_info_lft_dcsrptn">Lesson #1</p>
</div>
<div class="trck_prgrss_card_rght_crd_info_rght"><div class="trck_prgrss_card_rght_crd_info_rght_btn">Completed</div></div>
</div>
</div>


</div>
</div>
`);
};

//Track Progress
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_lft_main_linkbtn_id_3",
    ) ||
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnid_3",
    )
  ) {
    const prnt = app_btns_getelem(
      "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_main",
    );
    prnt.innerHTML = "";
    prnt.innerHTML = trck_prgrss_temp(0);
    app_btns_getelem(
      "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_ttlbar",
    ).innerHTML = e.target.innerHTML;
  }
});

//my courses
const my_cors_clss_tmp = `
<div class="cors_clss_wrkspcpg_cntnts_main_crdlet">
        <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_img"></div>
        <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info">
          <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top">
            <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags">
              <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_thumbimg_pnl"><div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_thumbimg"></div>Musonda Fred</div>
              <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_typetag">Graphics Design</div>
            </div>
          </div>
          <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_mid">
            <p class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_mid_ttl">title</p>
            <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_mid_dscrptn">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam
              minus quasi nemo ex qui sed eos mollitia dolorum, placeat deserunt
              ipsam velit molestias quia autem quas distinctio explicabo vero
              adipisci.</div>
            <br>
            <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_mid_ftr">
              <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_drtntime"><span><img src="dist/icons/time.svg" class="cors_clss_wrkspcpg_genric_icn" width="8"></span>3 Months</div>
              <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_sessnvenue"><span><img src="dist/icons/location.svg" class="cors_clss_wrkspcpg_genric_icn" width="11"></span>Online Session</div></div>
          </div>
        </div>
        <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_bttm">
          <button class="cors_clss_wrkspcpg_cntnts_main_crdlet_bttm_btn">View
            Now
            <img class="cors_clss_wrkspcpg_cntnts_main_crdlet_bttm_btn_icn" src="dist/icons/long_forward_arrow.svg" width="15"></button>
        </div>
      </div>
`;

//my courses - click buton
home.addEventListener("click", async (e) => {
  if (e.target.closest("#corsclsswrkspcpg_ctgrycrd_0")) {
    let tmp = "";
    for (let i = 0; i < 1; i++) {
      tmp += my_cors_clss_tmp;
      console.log(i);
    }
    const crdlet_prnt = `<div class="cors_clss_wrkspcpg_cntnts_main_crdlet_prntcntnr">${tmp}</div>`;
    const prnt = app_btns_getelem("cors_clss_wrkspcpg_cntnts_main");
    prnt.innerHTML = "";
    prnt.innerHTML = crdlet_prnt;
    document
      .querySelectorAll(".authrbookspgcntnts_ctgry_crd_thumbnl")
      .forEach((el) => {
        el.style.backgroundColor = "#707070";
      });
    app_btns_getelem("cors_clss_sctn_ctgrycrd_id_0").style.backgroundColor =
      "#b3324f";
  }
});

//All courses
const all_crs_clss_tmp = `
<div class="cors_clss_wrkspcpg_cntnts_main_crdlet">
        <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_img"></div>
        <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info">
          <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top">
            <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags">
              <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_thumbimg_pnl"><div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_thumbimg"></div>Musonda Fred</div>
              <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_typetag">Graphics Design</div>
            </div>
          </div>
          <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_mid">
            <p class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_mid_ttl">title</p>
            <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_mid_dscrptn">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam
              minus quasi nemo ex qui sed eos mollitia dolorum, placeat deserunt
              ipsam velit molestias quia autem quas distinctio explicabo vero
              adipisci.</div>
            <br>
            <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_mid_ftr">
              <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_drtntime"><span><img src="dist/icons/time.svg" class="cors_clss_wrkspcpg_genric_icn" width="8"></span>3 Months</div>
              <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_sessnvenue"><span><img src="dist/icons/location.svg" class="cors_clss_wrkspcpg_genric_icn" width="11"></span>Online Session</div></div>
          </div>
        </div>
        <div class="cors_clss_wrkspcpg_cntnts_main_crdlet_bttm">
          <button class="cors_clss_wrkspcpg_cntnts_main_crdlet_bttm_enrllnow_btn">Enroll
            Now
            <img class="cors_clss_wrkspcpg_cntnts_main_crdlet_bttm_btn_icn" src="dist/icons/long_forward_arrow.svg" width="15"></button>
        </div>
      </div>`;

//All courses - click buton
home.addEventListener("click", async (e) => {
  if (e.target.closest("#corsclsswrkspcpg_ctgrycrd_1")) {
    let tmp = "";
    for (let i = 0; i < 1; i++) {
      tmp += all_crs_clss_tmp;
      console.log(i);
    }
    const crdlet_prnt = `<div class="cors_clss_wrkspcpg_cntnts_main_crdlet_prntcntnr">${tmp}</div>`;
    const prnt = app_btns_getelem("cors_clss_wrkspcpg_cntnts_main");
    prnt.innerHTML = "";
    prnt.innerHTML = crdlet_prnt;
    document
      .querySelectorAll(".authrbookspgcntnts_ctgry_crd_thumbnl")
      .forEach((el) => {
        el.style.backgroundColor = "#707070";
      });
    app_btns_getelem("cors_clss_sctn_ctgrycrd_id_1").style.backgroundColor =
      "#b3324f";
  }
});

//in house courses - click buton
home.addEventListener("click", async (e) => {
  if (e.target.closest("#corsclsswrkspcpg_ctgrycrd_2")) {
    let tmp = "";
    for (let i = 0; i < 1; i++) {
      tmp += all_crs_clss_tmp;
      console.log(i);
    }
    const crdlet_prnt = `<div class="cors_clss_wrkspcpg_cntnts_main_crdlet_prntcntnr">${tmp}</div>`;
    const prnt = app_btns_getelem("cors_clss_wrkspcpg_cntnts_main");
    prnt.innerHTML = "";
    prnt.innerHTML = crdlet_prnt;
    document
      .querySelectorAll(".authrbookspgcntnts_ctgry_crd_thumbnl")
      .forEach((el) => {
        el.style.backgroundColor = "#707070";
      });
    app_btns_getelem("cors_clss_sctn_ctgrycrd_id_2").style.backgroundColor =
      "#b3324f";
  }
});

//affiliates courses - click buton
home.addEventListener("click", async (e) => {
  if (e.target.closest("#corsclsswrkspcpg_ctgrycrd_3")) {
    let tmp = "";
    for (let i = 0; i < 1; i++) {
      tmp += all_crs_clss_tmp;
      console.log(i);
    }
    const crdlet_prnt = `<div class="cors_clss_wrkspcpg_cntnts_main_crdlet_prntcntnr">${tmp}</div>`;
    const prnt = app_btns_getelem("cors_clss_wrkspcpg_cntnts_main");
    prnt.innerHTML = "";
    prnt.innerHTML = crdlet_prnt;
    document
      .querySelectorAll(".authrbookspgcntnts_ctgry_crd_thumbnl")
      .forEach((el) => {
        el.style.backgroundColor = "#707070";
      });
    app_btns_getelem("cors_clss_sctn_ctgrycrd_id_3").style.backgroundColor =
      "#b3324f";
  }
});

//enroll no button
const enroll_now_pymnt_sctn = `
<div id="enroll_now_pymnt_sctn">
<div id="enroll_now_pymnt_sctn_cntnts">

<div class="enroll_now_pymnt_sctn_subscrptnbox">
<div class="crs_clss_detils_crd_subscrptnbox_price">
<p class="crs_clss_detils_crd_subscrptnbox_price_txt">Subscription Plan</p>
<p class="crs_clss_detils_crd_subscrptnbox_price_amnt">$10</p>
</div>
<div class="crs_clss_detils_crd_subscrptnbox_mid">
<p class="crs_clss_detils_crd_subscrptnbox_mid_txt"><span><img class="generic_fltrd_icn_cl" width="10" src="dist/icons/check.svg" alt=""></span>Full Payment</p>
</div>
<div class="crs_clss_detils_crd_subscrptnbox_enrlld">
<button class="crs_clss_detils_crd_subscrptnbox_enrlld_btn">Subscribe</button>
</div>
</div>

<br>

<div class="enroll_now_pymnt_sctn_subscrptnbox">
<div class="crs_clss_detils_crd_subscrptnbox_price">
<p class="crs_clss_detils_crd_subscrptnbox_price_txt">Subscription Plan</p>
<p class="crs_clss_detils_crd_subscrptnbox_price_amnt">$10</p>
</div>
<div class="crs_clss_detils_crd_subscrptnbox_mid">
<p class="crs_clss_detils_crd_subscrptnbox_mid_txt"><span><img class="generic_fltrd_icn_cl" width="10" src="dist/icons/check.svg" alt=""></span>Half Payment</p>
</div>
<div class="crs_clss_detils_crd_subscrptnbox_enrlld">
<button class="crs_clss_detils_crd_subscrptnbox_enrlld_btn">Subscribe</button>
</div>
</div>

<br>

<div class="enroll_now_pymnt_sctn_subscrptnbox">
<div class="crs_clss_detils_crd_subscrptnbox_price">
<p class="crs_clss_detils_crd_subscrptnbox_price_txt">Subscription Plan</p>
<p class="crs_clss_detils_crd_subscrptnbox_price_amnt">$10</p>
</div>
<div class="crs_clss_detils_crd_subscrptnbox_mid">
<p class="crs_clss_detils_crd_subscrptnbox_mid_txt"><span><img class="generic_fltrd_icn_cl" width="10" src="dist/icons/check.svg" alt=""></span>Quarter Payment</p>
</div>
<div class="crs_clss_detils_crd_subscrptnbox_enrlld">
<button class="crs_clss_detils_crd_subscrptnbox_enrlld_btn">Subscribe</button>
</div>
</div>

</div>
</div>
`;
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(".cors_clss_wrkspcpg_cntnts_main_crdlet_bttm_enrllnow_btn")
  ) {
    const prnt = app_btns_getelem("cors_clss_wrkspcpg_cntnts_main");
    prnt.innerHTML = "";
    prnt.innerHTML = enroll_now_pymnt_sctn;
  }
});

//course / class payment details
const crs_clss_pymnt_dtls = `
<div>
<p class="crs_clss_pymnt_dtls_ttl_cl">Full Payment Status</p>
<p class="crs_clss_pymnt_dtls_key">Invoice Number: <span class="crs_clss_pymnt_dtls_value">S564 F5677 G6412</span></p>
<p class="crs_clss_pymnt_dtls_key">Payment Date & Time: <span class="crs_clss_pymnt_dtls_value">01:09AM, 20th Sep 2026</span></p>
<p class="crs_clss_pymnt_dtls_key">Payment Method: <span class="crs_clss_pymnt_dtls_value">Mobile Money</span></p>
<p class="crs_clss_pymnt_dtls_key">Amount: <span class="crs_clss_pymnt_dtls_value">K500.00</span></p>
</br>

<p class="crs_clss_pymnt_dtls_ttl_cl">Complete Payment Status</p>
<p class="crs_clss_pymnt_dtls_key">Course / Class Title: <span class="crs_clss_pymnt_dtls_value">Graphics Design Crash Course</span></p>
<p class="crs_clss_pymnt_dtls_key">Payment Status: <span class="crs_clss_pymnt_dtls_value" id="crs_clss_pymnt_dtls_pymntstts_tag">Completed</span></p>
<p class="crs_clss_pymnt_dtls_key">Total Amount: <span class="crs_clss_pymnt_dtls_value">K500.00</span></p>
</br></br>

<div id="crs_clss_pymnt_dtls_dwnldrcpt_btnpnl"><button id="crs_clss_pymnt_dtls_dwnldrcpt_btn"><span><img src="dist/icons/download.svg" class="cors_clss_wrkspcpg_genric_icn" width="12"></span>Dowload PDF Receipt</button></div>
<div>
`;

//course / class payment details - click
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_menu_popupdrpmenu_btnid_2",
    ) ||
    e.target.closest(
      "#cors_clss_wrkspcpg_cntnts_main_prvwpnl_lft_main_linkbtn_id_2",
    )
  ) {
    app_btns_getelem(
      "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_ttlbar",
    ).innerHTML = e.target.innerHTML;
    const prnt = app_btns_getelem(
      "cors_clss_wrkspcpg_cntnts_main_prvwpnl_rght_main",
    );
    prnt.innerHTML = "";
    prnt.innerHTML = crs_clss_pymnt_dtls;
  }
});

//operator
let tt_sctn_operator;
document.body.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      ".cors_clss_wrkspcpg_cntnts_main_crdlet_info_top_nmtags_typetag",
    )
  ) {
    tt_sctn_operator = e.target.dataset.oprtr;
    app_btns_getelem("tt_usr_dsply_oprtr_id").innerHTML = `${
      e.target.dataset.oprtr
    } zambia`;
  }
});

//create tutor account - option 1
/* document.body.addEventListener("click", async (e) => {
  if (
    e.target.closest("#accntspgcntnts_ttr_crs_clss_sec_ttrs_submittttrformbtn")
  ) {
    const el1 = app_btns_getelem("ttr_nm");
    const el2 = app_btns_getelem("ttr_eml");
    const el3 = app_btns_getelem("ttr_website");
    const el4 = app_btns_getelem("ttr_fb_hndl");
    const el5 = app_btns_getelem("ttr_instgrm_hndl");
    const el6 = app_btns_getelem("ttr_ticktok_hndl");
    const el7 = app_btns_getelem("ttr_bhnc_hndl");
    const el8 = app_btns_getelem("ttr_cntct_1");
    const el9 = app_btns_getelem("ttr_cntct_2");
    const el10 = app_btns_getelem("ttr_mblsrvcs_nm");
    const el11 = app_btns_getelem("ttr_mblsrvcs_phn");
    const el12 = app_btns_getelem(
      "accntspgcntnts_ttr_crs_clss_sec_ttrs_dscrptn",
    );

    const btn = e.target;
    const mbl_oprtr = tt_sctn_operator;

    const auth_lgn_err_pnl = app_btns_getelem(
      "authrbookspgcntnts_mainermgs_ermgpnl",
    );
    e.target.innerHTML = "";
    e.target.innerHTML = `<span><img class="ldngicn" width="30" style="  filter: invert(24%) sepia(85%) saturate(2206%) hue-rotate(326deg)
    brightness(87%) contrast(92%);" src="dist/icons/loading.svg" alt=""></span>`;

    const ttr_usr_nm = el1 ? el1.value : null;
    const ttr_usr_eml = el2 ? el2.value : null;
    const ttr_usr_website = el3 ? el3.value : null;
    const ttr_usr_fb_hndl = el4 ? el4.value : null;
    const ttr_usr_instrm_hndl = el5 ? el5.value : null;
    const ttr_usr_tiktok_hndl = el6 ? el6.value : null;
    const ttr_usr_bhnc_hndl = el7 ? el7.value : null;
    const ttr_usr_cntct_1 = el8 ? el8.value : null;
    const ttr_usr_cntct_2 = el9 ? el9.value : null;
    const ttr_usr_mblsrvcs_nm = el10 ? el10.value : null;
    const ttr_usr_mblsrvcs_phn = el11 ? el11.value : null;
    const ttr_usr_dscrptn = el12 ? el12.value : null;

    //cookie
    const ttr_crtd_token_client = app_btns_reusable_cookie("ttr_crtd_token");
    const ttr_accnt_obj = {
      //required
      ttr_usr_nm: ttr_usr_nm,
      ttr_usr_eml: ttr_usr_eml,
      ttr_usr_cntct_1: ttr_usr_cntct_1,
      ttr_usr_mblsrvcs_nm: ttr_usr_mblsrvcs_nm,
      ttr_usr_mblsrvcs_phn: ttr_usr_mblsrvcs_phn,
      ttr_usr_dscrptn: ttr_usr_dscrptn,
      mbl_oprtr: mbl_oprtr,
      //optional
      ttr_usr_website: ttr_usr_website,
      ttr_usr_fb_hndl: ttr_usr_fb_hndl,
      ttr_usr_instrm_hndl: ttr_usr_instrm_hndl,
      ttr_usr_tiktok_hndl: ttr_usr_tiktok_hndl,
      ttr_usr_bhnc_hndl: ttr_usr_bhnc_hndl,
      ttr_usr_cntct_2: ttr_usr_cntct_2,
      //cookie
      ttr_crtd_token_client: ttr_crtd_token_client,
    };
    console.log(ttr_accnt_obj);

    //profile img
    console.log("global_file_input_files: ", global_file_input_files);
    const formData = new FormData();
    if (global_file_input_files && global_file_input_files[0]) {
      formData.append("prfl_img", global_file_input_files[0]);
    }
    //text
    Object.keys(ttr_accnt_obj).forEach((key) => {
      formData.append(key, ttr_accnt_obj[key]);
    });

    console.log("formDataaaaaaaaaaaaaaaaaaaaaa:", formData);

    //formdata request
    fetch("/usr/crtttraccnt", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        //err
        if (data.erMgs) {
          btn.innerHTML = "Submit";
          auth_lgn_err_pnl.style.display = "block";
          auth_lgn_err_pnl.innerHTML = data.erMgs;
          app_btns_scroll_top_elem_fuc(
            app_btns_getelem("accntspgcntnts_ttr_crs_clss_sec"),
          );
          if (auth_lgn_err_pnl_time_out) {
            clearTimeout(auth_lgn_err_pnl_time_out);
          }
          auth_lgn_err_pnl_time_out = setTimeout(() => {
            auth_lgn_err_pnl.style.display = "none";
          }, 7000);
        } //success
        if (data.accnt_sttus === true) {
          app_btns_getelem("accntspgcntnts_ttr_crs_clss_sec").innerHTML =
            data.accnt_sttus_mgs;

          if (data.ttr_crtd_token) {
            //token
            const expires = new Date(Date.now() + 60 * 60 * 1000); // 1hr
            document.cookie =
              `ttr_crtd_token=${encodeURIComponent(data.ttr_crtd_token)};` +
              `Secure; SameSite=Strict; expires=${expires.toUTCString()}; path=/`;
          }
        }
      })
      .catch((error) => console.error(error));

  }
}); */
//create tutor account - option 2
document.body.addEventListener("click", async (e) => {
  if (
    e.target.closest("#accntspgcntnts_ttr_crs_clss_sec_ttrs_submittttrformbtn")
  ) {
    const el1 = app_btns_getelem("ttr_nm");
    const el2 = app_btns_getelem("ttr_eml");
    const el3 = app_btns_getelem("ttr_website");
    const el4 = app_btns_getelem("ttr_fb_hndl");
    const el5 = app_btns_getelem("ttr_instgrm_hndl");
    const el6 = app_btns_getelem("ttr_ticktok_hndl");
    const el7 = app_btns_getelem("ttr_bhnc_hndl");
    const el8 = app_btns_getelem("ttr_cntct_1");
    const el9 = app_btns_getelem("ttr_cntct_2");
    const el10 = app_btns_getelem("ttr_mblsrvcs_nm");
    const el11 = app_btns_getelem("ttr_mblsrvcs_phn");
    const el12 = app_btns_getelem(
      "accntspgcntnts_ttr_crs_clss_sec_ttrs_dscrptn",
    );

    const btn = e.target;
    const mbl_oprtr = tt_sctn_operator;

    const auth_lgn_err_pnl = app_btns_getelem(
      "authrbookspgcntnts_mainermgs_ermgpnl",
    );
    e.target.innerHTML = "";
    e.target.innerHTML = `<span><img class="ldngicn" width="30" style="  filter: invert(24%) sepia(85%) saturate(2206%) hue-rotate(326deg)
    brightness(87%) contrast(92%);" src="dist/icons/loading.svg" alt=""></span>`;

    const ttr_usr_nm = el1 ? el1.value : null;
    const ttr_usr_eml = el2 ? el2.value : null;
    const ttr_usr_website = el3 ? el3.value : null;
    const ttr_usr_fb_hndl = el4 ? el4.value : null;
    const ttr_usr_instrm_hndl = el5 ? el5.value : null;
    const ttr_usr_tiktok_hndl = el6 ? el6.value : null;
    const ttr_usr_bhnc_hndl = el7 ? el7.value : null;
    const ttr_usr_cntct_1 = el8 ? el8.value : null;
    const ttr_usr_cntct_2 = el9 ? el9.value : null;
    const ttr_usr_mblsrvcs_nm = el10 ? el10.value : null;
    const ttr_usr_mblsrvcs_phn = el11 ? el11.value : null;
    const ttr_usr_dscrptn = el12 ? el12.value : null;

    //cookie
    const usr_accnt_jwt_token = app_btns_reusable_cookie("usr_accnt_jwt_token");
    const ttr_accnt_obj = {
      //required
      ttr_usr_nm: ttr_usr_nm,
      ttr_usr_eml: ttr_usr_eml,
      ttr_usr_cntct_1: ttr_usr_cntct_1,
      ttr_usr_mblsrvcs_nm: ttr_usr_mblsrvcs_nm,
      ttr_usr_mblsrvcs_phn: ttr_usr_mblsrvcs_phn,
      ttr_usr_dscrptn: ttr_usr_dscrptn,
      mbl_oprtr: mbl_oprtr,
      //optional
      ttr_usr_website: ttr_usr_website,
      ttr_usr_fb_hndl: ttr_usr_fb_hndl,
      ttr_usr_instrm_hndl: ttr_usr_instrm_hndl,
      ttr_usr_tiktok_hndl: ttr_usr_tiktok_hndl,
      ttr_usr_bhnc_hndl: ttr_usr_bhnc_hndl,
      ttr_usr_cntct_2: ttr_usr_cntct_2,
      //cookie
      usr_accnt_jwt_token: usr_accnt_jwt_token,
    };
    console.log(ttr_accnt_obj);

    //profile img
    console.log("global_file_input_files: ", global_file_input_files);
    const formData = new FormData();
    if (global_file_input_files && global_file_input_files[0]) {
      formData.append("prfl_img", global_file_input_files[0]);
    }
    //text
    Object.keys(ttr_accnt_obj).forEach((key) => {
      formData.append(key, ttr_accnt_obj[key]);
    });

    /*  console.log("formDataaaaaaaaaaaaaaaaaaaaaa:", formData); */

    //formdata request
    fetch("/usr/crtttraccnt", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        /*   console.log(data); */
        //err
        if (data.erMgs) {
          btn.innerHTML = "Submit";
          auth_lgn_err_pnl.style.display = "block";
          auth_lgn_err_pnl.innerHTML = data.erMgs;
          app_btns_scroll_top_elem_fuc(
            app_btns_getelem("accntspgcntnts_ttr_crs_clss_sec"),
          );
          if (auth_lgn_err_pnl_time_out) {
            clearTimeout(auth_lgn_err_pnl_time_out);
          }
          auth_lgn_err_pnl_time_out = setTimeout(() => {
            auth_lgn_err_pnl.style.display = "none";
          }, 7000);
        } //success
        if (data.accnt_sttus === true) {
          app_btns_getelem("accntspgcntnts_ttr_crs_clss_sec").innerHTML =
            data.accnt_sttus_mgs;

          if (data.ttr_crtd_token) {
            //token
            const expires = new Date(Date.now() + 60 * 60 * 1000); // 1hr
            document.cookie =
              `ttr_crtd_token=${encodeURIComponent(data.ttr_crtd_token)};` +
              `Secure; SameSite=Strict; expires=${expires.toUTCString()}; path=/`;
          }
        }
      })
      .catch((error) => console.error(error));
  }
});

//mall page
home.addEventListener("click", async (e) => {
  if (e.target.closest("#navbr_rght_mallbtn")) {
    spinner_fuc();
    const data = await app_btns_request("/app/mallpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});
//cliental page
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#sidemenuCtrycl_clntalbtn") ||
    e.target.closest("#ctgry_ttl_drpdwnmenucl_clntalbtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/clntalpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});
//ads worksapce page
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#sidemenuCtrycl_adswrkspcpgbtn") ||
    e.target.closest("#ctgry_ttl_drpdwnmenucl_adswrkspcpgbtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/adswrkspcpg", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});
//web dev page
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#sidemenuCtrycl_webdevbbtn") ||
    e.target.closest("#ctgry_ttl_drpdwnmenucl_webdevbbtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/webdev", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
    }
  }
});
//view uiux cardlet
home.addEventListener("click", async (e) => {
  if (e.target.closest(".glbal_uiux_cadlet")) {
    const data = await app_btns_request("/app/chtpg", "GET");
    if (data) {
      const tmp = `
      <div id=""glbal_uiux_cadlet_fullview_crd>
      <div id="glbal_uiux_cadlet_fullview_crd_cls>close</div>
      <div>
      title bar
      </div>
      <div></div>
      <div></div>
      <div></div>
      </div>
      `;

      app_btns_getelem("floatpop").innerHTML = "";
      app_btns_getelem("floatpop").innerHTML = tmp;
      closeopenFunc(app_btns_getelem("floatpop"));
      /*     document.body.style.overflow = "hidden";
      scroll_bar_fuc(app_btns_getelem("floatpop")); */
    }
  }
});

//social channel page
let global_full_shots_vids;
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#sidemenuCtrycl_sclchnnlbtn") ||
    e.target.closest("#ctgry_ttl_drpdwnmenucl_sclchnnlbtn")
  ) {
    spinner_fuc();
    const data = await app_btns_request("/app/sclchnnl", "GET");
    if (data) {
      app_btns_getelem("main").innerHTML = data;
      //auhtor books category cards
      const prnt_el = app_btns_getelem("sclchnnlpg_ctgrycrds");

      if (prnt_el) {
        const a = [
          {
            ttl: "Bible Culture TLC",
            icon: "official_released_books",
            id: "authrbookspgcntnts_ctgry_crd_thumbnl_offclrlssdbksid_0",
            sub_txt: "0 In Collection",
            icn: "assets/logos/bctlc/fmjr_stores _bctlc-logo_color_combo_open",
          },
        ];
        //category cards
        for (let i = 0; i < a.length; i++) {
          const chld_el = document.createElement("div");
          chld_el.className = "authrbookspgcntnts_ctgry_crd";
          chld_el.id = `sclchnnlpg_ctgrycrds_ctgry_crd_id_${i}`;
          chld_el.innerHTML = `
          <div class="authrbookspgcntnts_ctgry_crd">
            <div class="authrbookspgcntnts_ctgry_crd_thumbnl" id="${a[i].id}"><div class="authrbookspgcntnts_ctgry_crd_thumbnl_content"><img width="18" src="${a[i].icn}.png" alt=""></div></div>
            <div class="authrbookspgcntnts_ctgry_crd_info">
              <p class="sclchnnlpg_ctgrycrds_ctgry_crd_info_ttl">${a[i].ttl}</p>
              <p class="authrbookspgcntnts_ctgry_crd_info_dscrptn">${a[i].sub_txt}</p>
            </div>
          </div>`;

          prnt_el.appendChild(chld_el);
        }
      }
      //main playlist cards
      const plylst_el = app_btns_getelem(
        "sclchnnlpg_ctgrycrds_ttlplylst_crdspnl",
      );
      const spnr = `<div id="spnrpnl"><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span></div>`;
      plylst_el.innerHTML = spnr;
      const yt_data = await app_btns_request("/api/ytchnnldata", "GET");

      plylst_el.innerHTML = "";
      //full vids
      if (yt_data.full_vids) {
        for (let i = 0; i < yt_data.full_vids.length; i++) {
          const chld_el = document.createElement("div");
          chld_el.className = "sclchnnlpg_ctgrycrds_ttlplylst_crd";
          chld_el.innerHTML = `
        <div class="sclchnnlpg_ctgrycrds_ttlplylst_img"><span><img
              class="sclchnnlpg_ctgrycrds_ttlplylst_img_thumb"
              src="assets/logos/bctlc/fmjr_stores _bctlc-logo_color_combo.png"
              width="25"
            /></span></div>
        <div class="trck_prgrss_card_rght_crd_info">
          <div class="trck_prgrss_card_rght_crd_info_lft">
            <p class="trck_prgrss_card_rght_crd_info_lft_ttl">${yt_data.full_vids[i].title}</p>
            <p class="trck_prgrss_card_rght_crd_info_lft_dcsrptn">Duration: ${yt_data.full_vids[i].duration}</p>
          </div>
          <div class="trck_prgrss_card_rght_crd_info_rght"><div
              class="sclchnnlpg_ctgrycrds_ttlplylst_crd_btncl" data-url="${yt_data.full_vids[i].url}"
            >Watch</div></div>
        </div>
        `;

          plylst_el.appendChild(chld_el);
        }
      }

      //short vids
      global_full_shots_vids = yt_data;

      //vid count

      app_btns_getelem("authrbookspgcntnts_ctgry_crd_info_dscrptn").innerHTML =
        `${yt_data.yt_data_length} In Collection`;
    }
  }
});
//go to bctlc channel
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      "#sclchnnlpg_cntnts_bctlclogo_sreenmain_btnspnl_sitelinkbtn",
    )
  ) {
    window.location.href = "https://www.youtube.com/@BibleCultureTLC";
  }
});
//go to whatsapp
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      "#sclchnnlpg_cntnts_bctlclogo_sreenmain_btnspnl_whtsappbtn",
    )
  ) {
    window.location.href = "https://wa.me/260975986004";
  }
});
//show playlist
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#sclchnnlpg_cntnts_bctlclogo_sreenmain_btnspnl_viewbtn")
  ) {
    /*     const tmp = `
         <div id="sclchnnlpg_ctgrycrds_ttlplylst_crdspnl_defultmgs">
      <img
            src="assets/logos/bctlc/fmjr_stores _bctlc-logo_color_combo.png"
            width="35"
          />
      </div>
    `;  const prnt_el = app_btns_getelem("sclchnnlpg_ctgrycrds_ttlplylst_crdspnl");
    tmprl_prnt_ctnt = prnt_el.innerHTML;

    prnt_el.innerHTML = tmp; */
    app_btns_scroll_top_elem_fuc(
      app_btns_getelem("sclchnnlpg_ctgrycrds_ttlplylst"),
    );
  }
});
//Go to individual video playlist
home.addEventListener("click", async (e) => {
  if (e.target.closest(".sclchnnlpg_ctgrycrds_ttlplylst_crd_btncl")) {
    window.open(e.target.dataset.url, "_blank");
  }
});
//shorts- clicked based
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      "#sclchnnlpg_cntnts_bctlclogo_sreenmain_btnspnl_shtsvidsbtn",
    )
  ) {
    const plylst_el = app_btns_getelem(
      "sclchnnlpg_ctgrycrds_ttlplylst_crdspnl",
    );
    const spnr = `<div id="spnrpnl"><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span></div>`;
    plylst_el.innerHTML = spnr;

    plylst_el.innerHTML = "";
    //full vids
    if (global_full_shots_vids) {
      for (let i = 0; i < global_full_shots_vids.shorts_vids.length; i++) {
        const chld_el = document.createElement("div");
        chld_el.className = "sclchnnlpg_ctgrycrds_ttlplylst_crd";
        chld_el.innerHTML = `
        <div class="sclchnnlpg_ctgrycrds_ttlplylst_img"><span><img
              class="sclchnnlpg_ctgrycrds_ttlplylst_img_thumb"
              src="assets/logos/bctlc/fmjr_stores _bctlc-logo_color_combo.png"
              width="25"
            /></span></div>
        <div class="trck_prgrss_card_rght_crd_info">
          <div class="trck_prgrss_card_rght_crd_info_lft">
            <p class="trck_prgrss_card_rght_crd_info_lft_ttl">${global_full_shots_vids.shorts_vids[i].title}</p>
            <p class="trck_prgrss_card_rght_crd_info_lft_dcsrptn">Duration: ${global_full_shots_vids.shorts_vids[i].duration}</p>
          </div>
          <div class="trck_prgrss_card_rght_crd_info_rght"><div
              class="sclchnnlpg_ctgrycrds_ttlplylst_crd_btncl" data-url="${global_full_shots_vids.shorts_vids[i].url}"
            >Watch</div></div>
        </div>
        `;

        plylst_el.appendChild(chld_el);
      }
    }
    e.target.style.backgroundColor = "#b3324f";
    app_btns_getelem(
      "sclchnnlpg_cntnts_bctlclogo_sreenmain_btnspnl_fullvidsbtn",
    ).style.backgroundColor = "#2f2f30";
  }
});
//full - clicked based
home.addEventListener("click", async (e) => {
  if (
    e.target.closest(
      "#sclchnnlpg_cntnts_bctlclogo_sreenmain_btnspnl_fullvidsbtn",
    )
  ) {
    const plylst_el = app_btns_getelem(
      "sclchnnlpg_ctgrycrds_ttlplylst_crdspnl",
    );
    const spnr = `<div id="spnrpnl"><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span></div>`;
    plylst_el.innerHTML = spnr;

    plylst_el.innerHTML = "";
    //full vids
    if (global_full_shots_vids) {
      for (let i = 0; i < global_full_shots_vids.full_vids.length; i++) {
        const chld_el = document.createElement("div");
        chld_el.className = "sclchnnlpg_ctgrycrds_ttlplylst_crd";
        chld_el.innerHTML = `
        <div class="sclchnnlpg_ctgrycrds_ttlplylst_img"><span><img
              class="sclchnnlpg_ctgrycrds_ttlplylst_img_thumb"
              src="assets/logos/bctlc/fmjr_stores _bctlc-logo_color_combo.png"
              width="25"
            /></span></div>
        <div class="trck_prgrss_card_rght_crd_info">
          <div class="trck_prgrss_card_rght_crd_info_lft">
            <p class="trck_prgrss_card_rght_crd_info_lft_ttl">${global_full_shots_vids.full_vids[i].title}</p>
            <p class="trck_prgrss_card_rght_crd_info_lft_dcsrptn">Duration: ${global_full_shots_vids.full_vids[i].duration}</p>
          </div>
          <div class="trck_prgrss_card_rght_crd_info_rght"><div
              class="sclchnnlpg_ctgrycrds_ttlplylst_crd_btncl" data-url="${global_full_shots_vids.full_vids[i].url}"
            >Watch</div></div>
        </div>
        `;

        plylst_el.appendChild(chld_el);
      }
    }
    e.target.style.backgroundColor = "#b3324f";
    app_btns_getelem(
      "sclchnnlpg_cntnts_bctlclogo_sreenmain_btnspnl_shtsvidsbtn",
    ).style.backgroundColor = "#2f2f30";
  }
});
//show room page
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#sidemenuCtrycl_shwrmbtn") ||
    e.target.closest("#ctgry_ttl_drpdwnmenucl_shwrmbtn")
  ) {
    const plylst_el = app_btns_getelem("main");
    const spnr = `<div id="spnrpnl"><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span></div>`;
    plylst_el.innerHTML = spnr;
    const data = await app_btns_request("/app/shwrmpg", "GET");
    if (data) {
      plylst_el.innerHTML = "";
      plylst_el.innerHTML = data;

      //digital art collection count
      const dgtl_art_data = await app_btns_request(
        "/api/dgtlartalldata",
        "GET",
      );
      app_btns_getelem("shwrmpg_cntnts_ctgry_crd_info_dscrptn").innerHTML =
        `${dgtl_art_data.total_in_collection} In Collection`;
    }
  }
});
//show room page - affiliates & collaboration digital art
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#shwrmpg_cntnts_lft_affltsalldgtlart_btn") ||
    e.target.closest("#shwrmpg_cntnts_lft_affltsseriesdgtlart_btn") ||
    e.target.closest("#shwrmpg_cntnts_lft_affltsdwnldbldgtlart_btn") ||
    e.target.closest("#shwrmpg_cntnts_lft_cllbtrnalldgtlart_btn") ||
    e.target.closest("#shwrmpg_cntnts_lft_cllbtrnseriesdgtlart_btn") ||
    e.target.closest("#shwrmpg_cntnts_lft_cllbtrndwnldbldgtlart_btn") ||
    e.target.closest("#shwrmpg_cntnts_lft_anmtnsartdgtlart_btn") ||
    e.target.closest("#shwrmpg_cntnts_lft_chrctrcncptartdgtlart_btn") ||
    e.target.closest("#shwrmpg_cntnts_lft_cncptartdgtlart_btn") ||
    e.target.closest("#shwrmpg_cntnts_lft_idlstriesartdgtlart_btn") ||
    e.target.closest("#shwrmpg_cntnts_lft_drftsnotesartdgtlart_btn")
  ) {
    const p_el = app_btns_getelem("shwrmpg_cntnts_lft_main");
    const tmp = `
    <div id="shwrmpg_cntnts_default_unavailable_service">
      <div>
        <div id="dwnldpgcntnts_img"><img src="dist/imgs/no_books_unavailable.webp" width="55"></div>
        <p id="hlppgcntnts_txt">Digital Art Unavailable</p>
      </div>
    </div>
    `;
    p_el.innerHTML = tmp;
    app_btns_scroll_top_elem_fuc(p_el);
  }
});
//show room page - in-house all
let global_shwrmpg_cntnts_lrght_cntnts;
home.addEventListener("click", async (e) => {
  if (e.target.closest("#shwrmpg_cntnts_lft_inhusalldgtlart_btn")) {
    closeopenFunc(
      app_btns_getelem("shwrmpg_cntnts_lft_inhusalldgtlart_btn_bttmdrpmenu"),
    );
    app_btns_scroll_top_elem_fuc(
      app_btns_getelem("shwrmpg_cntnts_lft_inhusalldgtlart_btn"),
    );
  }
});
//show room page - in-house series
home.addEventListener("click", async (e) => {
  if (e.target.closest("#shwrmpg_cntnts_lft_inhusseriesdgtlart_btn")) {
    const p_el = app_btns_getelem("shwrmpg_cntnts_rght");
    global_shwrmpg_cntnts_lrght_cntnts = p_el.innerHTML;
    const tmp = `
    <div id="shwrmpg_cntnts_rght_contents">
    <div id="shwrmpg_cntnts_rght_contents_top">
    <button id="shwrmpg_cntnts_rght_contents_top_rtrnbtn"><span><img id="shwrmpg_cntnts_rght_contents_top_rtrnbtn_icn" src="dist/icons/long_back_arrow.svg" width="15" class="app-icon"></span></button>
    <button id="shwrmpg_cntnts_rght_contents_top_ttl">In-House Series Digital Art</button>
    </div>
    <div id="shwrmpg_cntnts_rght_contents_bttm"><div id="shwrmpg_cntnts_default_unavailable_service">
      <div>
        <div id="dwnldpgcntnts_img"><img src="dist/imgs/no_books_unavailable.webp" width="55"></div>
        <p id="hlppgcntnts_txt">Series Unavailable</p>
      </div>
    </div></div>
    </div>
    `;
    p_el.innerHTML = tmp;
    app_btns_scroll_top_elem_fuc(p_el);
  }
});

//show room page - in-house dowload
home.addEventListener("click", async (e) => {
  if (e.target.closest("#shwrmpg_cntnts_lft_inhusdwnldbldgtlart_btn")) {
    const p_el = app_btns_getelem("shwrmpg_cntnts_rght");
    global_shwrmpg_cntnts_lrght_cntnts = p_el.innerHTML;
    const tmp = `
    <div id="shwrmpg_cntnts_rght_contents">
    <div id="shwrmpg_cntnts_rght_contents_top">
    <button id="shwrmpg_cntnts_rght_contents_top_rtrnbtn"><span><img id="shwrmpg_cntnts_rght_contents_top_rtrnbtn_icn" src="dist/icons/long_back_arrow.svg" width="15" class="app-icon"></span></button>
    <button id="shwrmpg_cntnts_rght_contents_top_ttl">In-House Downloadable Digital Art</button>
    </div>
    <div id="shwrmpg_cntnts_rght_contents_bttm">
     <p class="shwrmpg_cntnts_lft_inhusdwnldbldgtlart_artcrdttl">Digital Artboard Issue #1</p>
    <div class="shwrmpg_cntnts_lft_inhusdwnldbldgtlart_thumbpnl">
    <div class="shwrmpg_cntnts_lft_inhusdwnldbldgtlart_pnl">
            <img id="shwrmpg_cntnts_lft_main_thumbnlcvrart" src="dist/imgs/ctgry/showroom/digital_art/Digital Artboard Issue_1.webp" alt="">
          </div>
    </div>
    <p class="shwrmpg_cntnts_lft_inhusdwnldbldgtlart_ttl">Digital Artboard Issue #1</p>
    <p class="shwrmpg_cntnts_lft_inhusdwnldbldgtlart_dscrptn">Digital Artboard 2022/2023 Issue #1, where fiction meets art, consisting of vibrant characters, each with their
    own distinct backstory, personalities, systems and immersive environments. Join Musonda Fred on his creative journey, as he shares his inspiration, process, and passion for storytelling through digital art. In this new Digital Artboard 2022/2023 Issue #1, take a look at
    seven selected artworks.</p>
    <br />
    <button class="shwrmpg_cntnts_lft_txt_btnscl" id="shwrmpg_dwnldfile_daiss1pdf_btn">Download PDF</button>
  <br />
  <br />
  <p class="shwrmpg_cntnts_lft_inhusdwnldbldgtlart_artcrdttl">Digital Art - Edition 2026</p>
    <div class="shwrmpg_cntnts_lft_inhusdwnldbldgtlart_thumbpnl">
    <div class="shwrmpg_cntnts_lft_inhusdwnldbldgtlart_pnl">
            <img id="shwrmpg_cntnts_lft_main_thumbnlcvrart" src="dist/imgs/ctgry/showroom/digital_art/Digital Art - Edition 2026.webp" alt="">
          </div>
    </div>
    <p class="shwrmpg_cntnts_lft_inhusdwnldbldgtlart_ttl">Digital Art - Edition 2026</p>
    <p class="shwrmpg_cntnts_lft_inhusdwnldbldgtlart_dscrptn">Digital Artboard 2022/2023 Issue #1, where fiction meets art, consisting of vibrant characters, each with their
    own distinct backstory, personalities, systems and immersive environments. Join Musonda Fred on his creative journey, as he shares his inspiration, process, and passion for storytelling through digital art. In this new Digital Artboard 2022/2023 Issue #1, take a look at
    seven selected artworks.</p>
    <br />
    <button class="shwrmpg_cntnts_lft_txt_btnscl" id="shwrmpg_dwnldfile_dae2026pdf_btn">Download PDF</button>
    
    </div>
    </div>
    `;
    p_el.innerHTML = tmp;
    app_btns_scroll_top_elem_fuc(p_el);
  }
});

//retrun to side main menu
home.addEventListener("click", async (e) => {
  if (e.target.closest("#shwrmpg_cntnts_rght_contents_top_rtrnbtn")) {
    const p_el = app_btns_getelem("shwrmpg_cntnts_rght");
    p_el.innerHTML = "";
    p_el.innerHTML = global_shwrmpg_cntnts_lrght_cntnts;
    app_btns_getelem("shwrmpg_cntnts_lft_main").innerHTML = `
      <div id="shwrmpg_cntnts_lft_main_thumbnlcvrart_pnl">
      <img id="shwrmpg_cntnts_lft_main_thumbnlcvrart" src="dist/imgs/ctgry/showroom/digital_art/covers/Global Digital Artboard Cover SQ xl.webp" alt="">
      </div>
    `;
    app_btns_scroll_top_elem_fuc(p_el);
  }
});
//retrun to side main menu
home.addEventListener("click", async (e) => {
  if (e.target.closest("#shwrmpg_dwnldfile_daiss1pdf_btn")) {
    window.location.href = "/api/shwrmdwnlddaiss1pdf";
  }
});

//
home.addEventListener("click", async (e) => {
  if (e.target.closest("#shwrmpg_dwnldfile_dae2026pdf_btn")) {
    const p_el = app_btns_getelem("shwrmpg_cntnts_lft_main");
    const tmp = `
    <div id="shwrmpg_cntnts_default_unavailable_service">
      <div>
        <div id="dwnldpgcntnts_img"><img src="dist/imgs/dowload_unavailable.webp" width="55"></div>
        <p id="hlppgcntnts_txt">Dowload Unavailable</p>
      </div>
    </div>
    `;
    p_el.innerHTML = tmp;
    app_btns_scroll_top_elem_fuc(p_el);
  }
});
//resuable digital images function
const usable_dgtl_art_rndr_fuc = (arg_data, arg_ttl, arg_img_dir) => {
  /*  console.log(arg_data); */
  const t = document.createElement("div");
  t.id = "shwrmpg_cntnts_rght_contents_bttm";
  for (let i = 0; i < arg_data.length; i++) {
    const img_el = document.createElement("div");
    img_el.className = "shwrmpg_cntnts_rght_contents_bttm_crdcl";
    img_el.dataset.img_url = arg_data[i].img_ttl;
    img_el.dataset.img_dir = arg_img_dir;
    img_el.innerHTML = `<img class="shwrmpg_cntnts_rght_contents_bttm_crdcl_imgcl" src="dist/imgs/ctgry/showroom/digital_art/${arg_img_dir}/compressed_img/${arg_data[i].img_ttl}" data-img_url="${arg_data[i].img_ttl}" data-img_dir="${arg_img_dir}" alt="">`;
    t.appendChild(img_el);
  }

  const p_el = app_btns_getelem("shwrmpg_cntnts_rght");
  global_shwrmpg_cntnts_lrght_cntnts = p_el.innerHTML;
  const tmp = `
    <div id="shwrmpg_cntnts_rght_contents">
    <div id="shwrmpg_cntnts_rght_contents_top">
    <button id="shwrmpg_cntnts_rght_contents_top_rtrnbtn"><span><img id="shwrmpg_cntnts_rght_contents_top_rtrnbtn_icn" src="dist/icons/long_back_arrow.svg" width="15" class="app-icon"></span></button>
    <button id="shwrmpg_cntnts_rght_contents_top_ttl">${arg_ttl}</button>
    </div>
    ${t.outerHTML}
    </div>
    `;
  p_el.innerHTML = tmp;
  app_btns_scroll_top_elem_fuc(p_el);
};

//all_black_white
home.addEventListener("click", async (e) => {
  if (e.target.closest("#shwrmpg_dgtlart_typetag_allblkwhtbtn")) {
    const data = await app_btns_request("/api/dgtlartalldata", "GET");
    if (data.all_black_white_data) {
      usable_dgtl_art_rndr_fuc(
        data.all_black_white_data,
        "All Black & White",
        "all_black_white",
      );
    }
  }
});
//all_color
home.addEventListener("click", async (e) => {
  if (e.target.closest("#shwrmpg_dgtlart_typetag_allclrbtn")) {
    const data = await app_btns_request("/api/dgtlartalldata", "GET");
    if (data.all_color_data) {
      usable_dgtl_art_rndr_fuc(data.all_color_data, "All Color", "all_color");
    }
  }
});
//twelve_patriarchs
home.addEventListener("click", async (e) => {
  if (e.target.closest("#shwrmpg_dgtlart_typetag_twlpatrchsbtn")) {
    const data = await app_btns_request("/api/dgtlartalldata", "GET");
    if (data.twelve_patriarchs_data) {
      usable_dgtl_art_rndr_fuc(
        data.twelve_patriarchs_data,
        "Twelve Patriarchs",
        "twelve_patriarchs",
      );
    }
  }
});
//leading_ladies
home.addEventListener("click", async (e) => {
  if (e.target.closest("#shwrmpg_dgtlart_typetag_ldngldiesbtn")) {
    const data = await app_btns_request("/api/dgtlartalldata", "GET");
    if (data.leading_ladies_data) {
      usable_dgtl_art_rndr_fuc(
        data.leading_ladies_data,
        "Leading Ladies",
        "leading_ladies",
      );
    }
  }
});
//seven_spirit_beasts
home.addEventListener("click", async (e) => {
  if (e.target.closest("#shwrmpg_dgtlart_typetag_svnsprtsbstsbtn")) {
    const data = await app_btns_request("/api/dgtlartalldata", "GET");
    if (data.seven_spirit_beasts_data) {
      usable_dgtl_art_rndr_fuc(
        data.seven_spirit_beasts_data,
        "Seven Spirit Beasts",
        "seven_spirit_beasts",
      );
    }
  }
});
//seven_spirit_beasts
home.addEventListener("click", async (e) => {
  if (e.target.closest("#shwrmpg_dgtlart_typetag_outfsgdgtsbtn")) {
    const data = await app_btns_request("/api/dgtlartalldata", "GET");
    if (data.outfits_gadgets_data) {
      usable_dgtl_art_rndr_fuc(
        data.outfits_gadgets_data,
        "Outfits & Gadgets",
        "outfits_gadgets",
      );
    }
  }
});
//image full view
home.addEventListener("click", async (e) => {
  if (e.target.closest(".shwrmpg_cntnts_rght_contents_bttm_crdcl")) {
    if (e.target.dataset.img_url) {
      /*       console.log(e.target.dataset.img_dir, e.target.dataset.img_url); */
      const p_el = app_btns_getelem("shwrmpg_cntnts_lft_main");
      //loading
      p_el.innerHTML = `<div id="spnrpnl"><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span></div>`;

      //success
      const temp_img = new Image();
      temp_img.onload = () => {
        /*   console.log("img complete download"); */
        p_el.innerHTML = `<div id="shwrmpg_cntnts_lft_main_thumbnlcvrart_pnl"><img id="shwrmpg_cntnts_lft_main_thumbnlcvrart_renderedimg" src="dist/imgs/ctgry/showroom/digital_art/${e.target.dataset.img_dir}/normal_img/${e.target.dataset.img_url}" alt=""></div>`;
      };
      temp_img.src = `dist/imgs/ctgry/showroom/digital_art/${e.target.dataset.img_dir}/normal_img/${e.target.dataset.img_url}`;
      app_btns_scroll_top_elem_fuc(p_el);
    }
  }
});

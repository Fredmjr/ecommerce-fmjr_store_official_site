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

//default spinner
const spinner_fuc = () => {
  const spinner = `<div id="spnrpnl"><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span></div>`;
  app_btns_getelem("main").innerHTML = "";
  app_btns_getelem("main").innerHTML = spinner;
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
  if (e.target.closest("#navbrmenuBtn_drpdwnmenu_lwrslnkprvcyBtn")) {
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
});

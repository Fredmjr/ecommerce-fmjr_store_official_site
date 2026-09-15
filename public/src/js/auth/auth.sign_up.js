//reusable button function
const auth_sgnup_getelem = (e) => {
  return document.getElementById(e) || document.querySelector(`.${e}`);
};
//reusable secon spinner
const auth_sgnup_spinner_fuc = (e) => {
  const spinner = `<div id="spnrpnl"><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span></div>`;
  e.innerHTML = "";
  e.innerHTML = spinner;
};

//Reusabled fetch request
const auth_sgnup_request = async (
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

//global variables
let globa_variabl_usr_accnt_jwt_token;
const redir_after_signup = async () => {
  const data = await app_btns_request("/app/accntspg", "GET");
  if (data) {
    auth_sgnup_getelem("main").innerHTML = data;
  }
};

//sign up form
let err_pnl_time_out;
let global_sign_up_dtls = {};
home.addEventListener("click", async (e) => {
  if (e.target.closest("#sgnup_crtaccntBtn")) {
    const el1 = auth_sgnup_getelem("sgnup_eml");
    const el2 = auth_sgnup_getelem("sgnup_pwd");
    const el3 = auth_sgnup_getelem("sgnup_cnfrmpwd");
    const el4 = auth_sgnup_getelem("sgnup_usrnm");
    const el5 = auth_sgnup_getelem("sgnup_cntct");
    const err_pnl = auth_sgnup_getelem("sgnup_errmgs_pnl");

    e.target.innerHTML = "";
    e.target.innerHTML = `<span><img class="ldngicn" width="30" style="  filter: invert(24%) sepia(85%) saturate(2206%) hue-rotate(326deg)
    brightness(87%) contrast(92%);" src="dist/icons/loading.svg" alt=""></span>`;

    const eml = el1 ? el1.value : null;
    const pwd = el2 ? el2.value : null;
    const conf_pwd = el3 ? el3.value : null;
    const usr_nm = el4 ? el4.value : null;
    const phn = el5 ? el5.value : null;

    /* console.log(eml, pwd, conf_pwd); */

    global_sign_up_dtls.eml = eml;
    global_sign_up_dtls.pwd = pwd;
    global_sign_up_dtls.usr_nm = usr_nm;
    global_sign_up_dtls.phn = phn;
    const data = await auth_sgnup_request("/usr/signupusr", "POST", {
      eml: eml,
      pwd: pwd,
      conf_pwd: conf_pwd,
      usr_nm: usr_nm,
      phn: phn,
    });
    if (data) {
      //err
      if (data.erMgs) {
        e.target.innerHTML = "Create Account";
        err_pnl.style.display = "block";
        err_pnl.innerHTML = data.erMgs;

        if (err_pnl_time_out) {
          clearTimeout(err_pnl_time_out);
        }
        err_pnl_time_out = setTimeout(() => {
          err_pnl.style.display = "none";
        }, 7000);
      } else {
        /* console.log(data); */
        global_sign_up_dtls.usr_id = data.usr_id;
        const rdir_data = await auth_sgnup_request(
          "/usr/signupusrrndrotp",
          "POST",
          {
            dir_url: data.dir_url,
          },
        );
        auth_lgn_getelem("main").innerHTML = rdir_data;
      }
    }
  }
});

//code verification - for sign up
home.addEventListener("click", async (e) => {
  if (e.target.closest("#sgnup_otp_pg_submitbtn")) {
    const el1 = auth_lgn_getelem("lgn_otp_pg_codecrd_id_0");
    const el2 = auth_lgn_getelem("lgn_otp_pg_codecrd_id_1");
    const el3 = auth_lgn_getelem("lgn_otp_pg_codecrd_id_2");
    const el4 = auth_lgn_getelem("lgn_otp_pg_codecrd_id_3");
    const el5 = auth_lgn_getelem("lgn_otp_pg_codecrd_id_4");
    const el6 = auth_lgn_getelem("lgn_otp_pg_codecrd_id_5");
    const auth_lgn_err_pnl = auth_lgn_getelem("lgn_errmgs_pnl");

    e.target.innerHTML = "";
    e.target.innerHTML = `<span><img class="ldngicn" width="30" style="  filter: invert(24%) sepia(85%) saturate(2206%) hue-rotate(326deg)
    brightness(87%) contrast(92%);" src="dist/icons/loading.svg" alt=""></span>`;

    const e1 = el1 ? el1.value : null;
    const e2 = el2 ? el2.value : null;
    const e3 = el3 ? el3.value : null;
    const e4 = el4 ? el4.value : null;
    const e5 = el5 ? el5.value : null;
    const e6 = el6 ? el6.value : null;

    const code = e1 + e2 + e3 + e4 + e5 + e6;
    /* console.log(code); */
    const data = await auth_lgn_request("/usr/sgnupusrotp", "POST", {
      code: code,
      /*       eml: auth_lgn_global_eml, */
      usr_sgn_up_obj: global_sign_up_dtls,
    });
    //err
    if (data.erMgs) {
      e.target.innerHTML = "Submit";
      auth_lgn_err_pnl.style.display = "block";
      auth_lgn_err_pnl.innerHTML = data.erMgs;

      if (auth_lgn_err_pnl_time_out) {
        clearTimeout(auth_lgn_err_pnl_time_out);
      }
      auth_lgn_err_pnl_time_out = setTimeout(() => {
        auth_lgn_err_pnl.style.display = "none";
      }, 7000);
    }

    //success
    if (data.redir) {
      //token
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24hrs
      document.cookie =
        `usr_accnt_jwt_token=${encodeURIComponent(data.usr_accnt_jwt_token)};` +
        `Secure; SameSite=Strict; expires=${expires.toUTCString()}; path=/`;
      //redirect
      setTimeout(() => {
        redir_after_signup();
        auth_lgn_getelem("navbrloginBtn").style.display = "none";
        auth_lgn_getelem("navbrsgnupBtn").outerHTML =
          `<button id="navbr_lggdintn">Logged In</button>`;
      }, 2000);
    }
  }
});

//obeser
const lgn_otp_pgbsrvr = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      const el1 = node.matches?.("#lgn_otp_pg_codepnl")
        ? node
        : node.querySelector?.("#lgn_otp_pg_codepnl");
      //
      if (el1) {
        const inputs = document.querySelectorAll(".lgn_otp_pg_codecrdlet_cl");

        inputs.forEach((input, index) => {
          input.addEventListener("input", (e) => {
            if (e.target.value.length === 1 && index < inputs.length - 1) {
              inputs[index + 1].focus();
            }
          });

          input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !e.target.value && index > 0) {
              inputs[index - 1].focus();
            }
          });
        });
      }
    });
  });
});

lgn_otp_pgbsrvr.observe(app_api_getelem("home"), {
  childList: true,
  subtree: true,
});

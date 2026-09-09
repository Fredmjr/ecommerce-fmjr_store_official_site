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
home.addEventListener("click", async (e) => {
  if (e.target.closest("#sgnup_crtaccntBtn")) {
    const el1 = auth_sgnup_getelem("sgnup_eml");
    const el2 = auth_sgnup_getelem("sgnup_pwd");
    const el3 = auth_sgnup_getelem("sgnup_cnfrmpwd");
    const el4 = auth_sgnup_getelem("sgnup_usrnm");
    const el5 = auth_sgnup_getelem("sgnup_cntct");
    const err_pnl = auth_sgnup_getelem("sgnup_errmgs_pnl");

    const eml = el1 ? el1.value : null;
    const pwd = el2 ? el2.value : null;
    const conf_pwd = el3 ? el3.value : null;
    const usr_nm = el4 ? el4.value : null;
    const phn = el5 ? el5.value : null;

    console.log(eml, pwd, conf_pwd);

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
        err_pnl.style.display = "block";
        err_pnl.innerHTML = data.erMgs;

        if (err_pnl_time_out) {
          clearTimeout(err_pnl_time_out);
        }
        err_pnl_time_out = setTimeout(() => {
          err_pnl.style.display = "none";
        }, 7000);
      }
      //success
      if (data.redir) {
        auth_sgnup_getelem("main").innerHTML = `
        <div id="spnrpnl"><br><br><br><br><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span><br><br><br><br></div>
        `;
        console.log(data.usr_accnt_jwt_token);
        //token
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24hrs
        document.cookie =
          `usr_accnt_jwt_token=${encodeURIComponent(data.usr_accnt_jwt_token)};` +
          `Secure; SameSite=Strict; expires=${expires.toUTCString()}; path=/`;
        //redirect
        setTimeout(() => {
          redir_after_signup();
          auth_sgnup_getelem("navbrloginBtn").style.display = "none";
        }, 3000);
      }
    }
  }
});

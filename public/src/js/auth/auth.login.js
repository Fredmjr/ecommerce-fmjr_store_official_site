//reusable button function
const auth_lgn_getelem = (e) => {
  return document.getElementById(e) || document.querySelector(`.${e}`);
};
//reusable secon spinner
const auth_lgn_spinner_fuc = (e) => {
  const spinner = `<div id="spnrpnl"><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span></div>`;
  e.innerHTML = "";
  e.innerHTML = spinner;
};

//Reusabled fetch request
const auth_lgn_request = async (
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
//reuable cookie
const auth_lgn_reusable_cookie = (elem) => {
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

//login
let auth_lgn_err_pnl_time_out;
let auth_lgn_global_eml;
home.addEventListener("click", async (e) => {
  if (e.target.closest("#lgn_crtaccntBtn")) {
    const el1 = auth_lgn_getelem("lgn_eml");
    const el2 = auth_lgn_getelem("lgn_pwd");
    const btn = auth_lgn_getelem("lgn_crtaccntBtn");
    const auth_lgn_err_pnl = auth_lgn_getelem("lgn_errmgs_pnl");
    btn.innerHTML = "";
    btn.innerHTML = `<span><img class="ldngicn" width="30" style="  filter: invert(24%) sepia(85%) saturate(2206%) hue-rotate(326deg)
    brightness(87%) contrast(92%);" src="dist/icons/loading.svg" alt=""></span>`;

    const eml = el1 ? el1.value : null;
    const pwd = el2 ? el2.value : null;
    auth_lgn_global_eml = el1 ? el1.value : null;
    console.log(eml, pwd);

    const data = await auth_lgn_request("/usr/lgnusr", "POST", {
      eml: eml,
      pwd: pwd,
    });

    if (data) {
      console.log(data);
      //err
      if (data.erMgs) {
        console.log(auth_lgn_err_pnl);
        btn.innerHTML = "Log In";
        auth_lgn_err_pnl.style.display = "block";
        auth_lgn_err_pnl.innerHTML = data.erMgs;

        if (auth_lgn_err_pnl_time_out) {
          clearTimeout(auth_lgn_err_pnl_time_out);
        }
        auth_lgn_err_pnl_time_out = setTimeout(() => {
          auth_lgn_err_pnl.style.display = "none";
        }, 7000);
      } else {
        //success
        auth_lgn_getelem("main").innerHTML = data;
      }
      /*  if (data.redir) {
        auth_lgn_getelem("main").innerHTML = `
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
          auth_lgn_getelem("navbrloginBtn").style.display = "none";
        }, 2000);
      } */
    }
  }
});

//log out
home.addEventListener("click", async (e) => {
  if (e.target.closest("#accntspgcntnts_lgnoutBtn")) {
    document.cookie =
      `usr_accnt_jwt_token=; ` +
      `Secure; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;

    auth_lgn_getelem("navbrloginBtn").style.display = "block";

    e.target.innerHTML = "";
    e.target.innerHTML = `<span><img class="ldngicn" width="30" style="  filter: brightness(0) invert(1);" src="dist/icons/loading.svg" alt=""></span>`;
    setTimeout(() => {
      const client_loged_out_mgs = `
    <div id="lggd_out_sctn">
     <div id="lggd_out_sctn_cntnts">
    <div id="frgotpwdpgcntnts_tplogo">
      <img src="assets/logos/fmjr_stores official.png" width="25" alt="">
    </div>
    <p id="frgotpwd_ttl">Logged out</p>
    <p id="frgotpwd_dscrptn">You have successfully logged out of your account.</p>
    <br><br>
    <div id="lggd_out_sctn_rtrnhmbtn_pnl"><button id="lggd_out_sctn_rtrnhmbtn">Return Home</button></div>
    </div>
    </div>
    `;

      auth_lgn_getelem("main").innerHTML = client_loged_out_mgs;
    }, 2000);
  }
});

//log out - return home
home.addEventListener("click", async (e) => {
  if (e.target.closest("#lggd_out_sctn_rtrnhmbtn")) {
    window.location.href = "/";
  }
});

//auto log in
const auto_lgn = () => {
  const cookie = app_btns_reusable_cookie("usr_accnt_jwt_token");
  console.log(cookie);
  if (!cookie) {
    auth_lgn_getelem("navbrloginBtn").style.display = "block";
  }
};
auto_lgn();

//code verification
home.addEventListener("click", async (e) => {
  if (e.target.closest("#lgn_otp_pg_submitbtn")) {
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
    console.log(code, auth_lgn_global_eml);
    const data = await auth_lgn_request("/usr/lgnusrotp", "POST", {
      code: code,
      eml: auth_lgn_global_eml,
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
      }, 2000);
    }
  }
});

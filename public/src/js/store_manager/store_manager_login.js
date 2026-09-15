//reusable button function
const store_manager_login_getelem = (e) => {
  return document.getElementById(e) || document.querySelector(`.${e}`);
};

//Reusabled fetch request
const store_manager_login_request = async (
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
//reusable close & open
const see_hide = (e, icon) => {
  //see
  store_manager_login_getelem(e).type =
    store_manager_login_getelem(e).type === "password" ? "text" : "password";
  //chnage icon
  store_manager_login_getelem(icon).src =
    store_manager_login_getelem(e).type === "password"
      ? "dist/icons/open-eye.svg"
      : "dist/icons/closed-eye.svg";
};

//login - password
document.body.addEventListener("click", async (e) => {
  if (e.target.closest("#lgn_pwd_seecnfrmpwdicn")) {
    see_hide("lgn_pwd", "lgn_pwd_seecnfrmpwdicnimg");
  }
});

//reusablle cookie
const store_manager_login_cookie = (elem) => {
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
document.body.addEventListener("click", async (e) => {
  if (e.target.closest("#store_managment_login_btn")) {
    const el1 = store_manager_login_getelem("lgn_eml");
    const el2 = store_manager_login_getelem("lgn_pwd");
    const btn = store_manager_login_getelem("store_managment_login_btn");
    const auth_lgn_err_pnl = store_manager_login_getelem("lgn_errmgs_pnl");
    btn.innerHTML = "";
    btn.innerHTML = `<span><img class="ldngicn" width="30" style="  filter: invert(24%) sepia(85%) saturate(2206%) hue-rotate(326deg)
    brightness(87%) contrast(92%);" src="dist/icons/loading.svg" alt=""></span>`;

    const eml = el1 ? el1.value : null;
    const pwd = el2 ? el2.value : null;
    auth_lgn_global_eml = el1 ? el1.value : null;

    const data = await store_manager_login_request(
      "/store_manager/lgnstrmngr",
      "POST",
      {
        eml: eml,
        pwd: pwd,
      },
    );

    if (data) {
      //err
      if (data.erMgs) {
        /* console.log(auth_lgn_err_pnl); */
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
        store_manager_login_getelem(
          "store_managment_login_pg_mid_cntnts_lgn",
        ).innerHTML = data;
      }
    }
  }
});

//otp
document.body.addEventListener("click", async (e) => {
  if (e.target.closest("#store_managment_login_otp_pg_submitbtn")) {
    const el1 = store_manager_login_getelem("lgn_otp_pg_codecrd_id_0");
    const el2 = store_manager_login_getelem("lgn_otp_pg_codecrd_id_1");
    const el3 = store_manager_login_getelem("lgn_otp_pg_codecrd_id_2");
    const el4 = store_manager_login_getelem("lgn_otp_pg_codecrd_id_3");
    const el5 = store_manager_login_getelem("lgn_otp_pg_codecrd_id_4");
    const el6 = store_manager_login_getelem("lgn_otp_pg_codecrd_id_5");
    const auth_lgn_err_pnl = store_manager_login_getelem("lgn_errmgs_pnl");

    e.target.innerHTML = "";
    e.target.innerHTML = `<span><img class="ldngicn" width="30" style="  filter: invert(24%) sepia(85%) saturate(2206%) hue-rotate(326deg)
    brightness(87%) contrast(92%);" src="dist/icons/loading.svg" alt=""></span>`;

    const e1 = el1 ? el1.value : null;
    const e2 = el2 ? el2.value : null;
    const e3 = el3 ? el3.value : null;
    const e4 = el4 ? el4.value : null;
    const e5 = el5 ? el5.value : null;
    const e6 = el6 ? el6.value : null;

    if (e1 === "" || e2 === "" || e3 === "" || e4 === "" || e5 === "") {
      auth_lgn_err_pnl.innerHTML = "Enter complete 6 character code";
    }

    const code = e1 + e2 + e3 + e4 + e5 + e6;
    const data = await store_manager_login_request(
      "/store_manager/lgnusrphrspss",
      "POST",
      {
        code: code,
        eml: auth_lgn_global_eml,
      },
    );
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
    if (data.qa_redir) {
      //success
      const p_el = store_manager_login_getelem("frgotpwdpgcntnts");
      p_el.innerHTML = "";
      /* console.log(data); */

      const p_child = document.createElement("div");
      p_child.className = "qa_phrase_sctn";
      const tmp = `
            <div id="lgnpgcntnts_tplogo">
                <img src="assets/logos/fmjr_stores official.png" width="25" alt="">
            </div>
            <p id="lgn_ttl">Management Login</p>
            <p id="sgnup_subtxt">Answer these three security questions below. You have 3 tries per day</p>
            <br>
            <p class="qa_phrase">${data.q1}</p>
            <div class="lgn_inptcrdcl"><input type="ans_phrase" id="ans_phrase1" name="email" placeholder="Your Answer" class="lgn_inptcl" required=""></div>
            <br>
            <p class="qa_phrase">${data.q2}</p>
            <div class="lgn_inptcrdcl"><input type="ans_phrase" id="ans_phrase2" name="email" placeholder="Your Answer" class="lgn_inptcl" required=""></div>     
            <br>
            <p class="qa_phrase">${data.q3}</p>
            <div class="lgn_inptcrdcl"><input type="ans_phrase" id="ans_phrase3" name="email" placeholder="Your Answer" class="lgn_inptcl" required=""></div>
            <br> <div id="lgn_errmgs_pnl" style="display: none;"></div>
            <button id="store_managment_qa_phrase_btn">Submit Answer</button>
            `;
      p_child.innerHTML = tmp;
      p_el.appendChild(p_child);
    }
  }
});

//oberserver
const store_manager_loginbsrvr = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      const el1 = node.matches?.("#store_managment_login_otp_pg_submitbtn")
        ? node
        : node.querySelector?.("#store_managment_login_otp_pg_submitbtn");
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

store_manager_loginbsrvr.observe(document.body, {
  childList: true,
  subtree: true,
});

//security question
document.body.addEventListener("click", async (e) => {
  if (e.target.closest("#store_managment_qa_phrase_btn")) {
    const el1 = store_manager_login_getelem("ans_phrase1");
    const el2 = store_manager_login_getelem("ans_phrase2");
    const el3 = store_manager_login_getelem("ans_phrase3");
    const auth_lgn_err_pnl = store_manager_login_getelem("lgn_errmgs_pnl");

    e.target.innerHTML = "";
    e.target.innerHTML = `<span><img class="ldngicn" width="30" style="  filter: invert(24%) sepia(85%) saturate(2206%) hue-rotate(326deg)
    brightness(87%) contrast(92%);" src="dist/icons/loading.svg" alt=""></span>`;

    const e1 = el1 ? el1.value : null;
    const e2 = el2 ? el2.value : null;
    const e3 = el3 ? el3.value : null;

    const code = `${e1} ${e2} ${e3}`;
    /* console.log(code, auth_lgn_global_eml); */

    const data = await store_manager_login_request(
      "/store_manager/cnfrmlgnusrphrspss",
      "POST",
      {
        e1: e1,
        e2: e2,
        e3: e3,
        eml: auth_lgn_global_eml,
      },
    );
    //err
    if (data.erMgs) {
      e.target.innerHTML = "Submit Answer";
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
      //page
      document.body.innerHTML = data;
      //c
      const auto_data = await store_manager_login_request(
        "/store_manager/autolgn",
        "POST",
        { eml: auth_lgn_global_eml },
      );

      if (auto_data.str_mngr_jwt_token) {
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 24hrs
        document.cookie =
          `str_mngr_jwt_token=${encodeURIComponent(auto_data.str_mngr_jwt_token)};` +
          `Secure; SameSite=Strict; expires=${expires.toUTCString()}; path=/`;
      }
    }
  }
});
//store manager auto log in
const auto_lgn = async () => {
  const cookie = store_manager_login_cookie("str_mngr_jwt_token");
  if (cookie) {
    const auto_data = await store_manager_login_request(
      "/store_manager/dcrptckie",
      "POST",
      { c: cookie },
    );

    if (auto_data) {
      document.body.innerHTML = auto_data;
    }
  }
};
auto_lgn();

//store manager log out
document.body.addEventListener("click", async (e) => {
  if (e.target.closest("#store_mngrnavbar_mid_logout_btn")) {
    document.cookie =
      `str_mngr_jwt_token=; ` +
      `Secure; SameSite=Strict; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    /*   e.target.style.width = "100px";
    e.target.innerHTML = `<span><img class="ldngicn" width="4" style="  filter: invert(24%) sepia(85%) saturate(2206%) hue-rotate(326deg)
    brightness(87%) contrast(92%);" src="dist/icons/loading.svg" alt=""></span>`;
 */
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }
});

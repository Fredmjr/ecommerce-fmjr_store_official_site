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
  const data = await app_btns_request("/app/sgnuppg", "GET");
  app_btns_getelem("main").innerHTML = data;
});
//login
app_btns_getelem("navbrloginBtn").addEventListener("click", async () => {
  const data = await app_btns_request("/app/lgnpg", "GET");
  app_btns_getelem("main").innerHTML = data;
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
    see_hide("sgnup_pwd", "sgnup_pwd_seepwdicn");
  }
  //sign up - confirm password
  if (e.target.closest("#sgnup_pwd_seecnfrmpwdicn")) {
    see_hide("sgnup_cnfrmpwd", "sgnup_pwd_seecnfrmpwdicn");
  }
});

//switch from sign up to login page
home.addEventListener("click", async (e) => {
  if (e.target.closest("#rtntolgnpglnkBtn")) {
    const data = await app_btns_request("/app/lgnpg", "GET");
    app_btns_getelem("main").innerHTML = data;
  }
});

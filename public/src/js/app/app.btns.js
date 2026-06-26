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

//Mobile colapse contents
const mobileQuery = window.matchMedia("(max-width: 576px)");
const mobile_callapsable_contents_fuc = (e) => {
  if (e.matches) {
    //drop down menu
    const a = store_manager_getelem("store_hero_rght").innerHTML;
    store_manager_getelem("store_mngrnavbar_lft_drpdwnmenu_cntnts").innerHTML =
      a;
  } else {
    store_manager_getelem("store_mngrnavbar_lft_drpdwnmenu").style.display =
      "none";
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
mobileQuery.addEventListener("change", mobile_callapsable_contents_fuc);
mobile_callapsable_contents_fuc(mobileQuery);

//menu swap
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest("#store_mngrnavbar_rghtmenubtn");
  if (el) {
    if (mobileQuery.matches) {
      console.log("hi");

      closeopenFunc(store_manager_getelem("store_mngrnavbar_lft_drpdwnmenu"));
    }
  }
});

//reusable element
const getelem = (e) => {
  return document.getElementById(e) || document.querySelector(`.${name}`);
};

//coupon & meail text swap
let showing = true;
const newsletter_info1 = "Enter email address";
const newsletter_info2 = "Get coupons, offers, and more";

const swap_fade_anima = (el, type, cntnt) => {
  el.style.transition = "opacity 500ms ease-in-out";
  el.style.opacity = 0;
  setTimeout(() => {
    el[type] = cntnt;
    el.style.opacity = 1;
  }, 500);
};
//newsletter coupon & email placeholder
(() => {
  const a = getelem("newsletterinput");
  setInterval(() => {
    if (a.value === "") {
      if (showing) {
        swap_fade_anima(a, "placeholder", newsletter_info1);
      } else {
        swap_fade_anima(a, "placeholder", newsletter_info2);
      }
    }

    showing = !showing;
  }, 10000);
})();

const promoCntnts = document.querySelector("#promoCntnts");
const chkout = document.querySelector("#chkout");
const whtsnw = document.querySelector("#whtsnw");

const ads_soon = `Sea_Shell Server Commercial coming soon!<button id="chkout">Check out whats new</button>`;
const ads_new = `   Sea_Shell Server Official.<button id="whtsnw">See whats new</button>`;
let showing = true;

promoCntnts.innerHTML = ads_new;

setInterval(() => {
  if (showing) {
    promoCntnts.innerHTML = ads_soon;
  } else {
    promoCntnts.innerHTML = ads_new;
  }
  showing = !showing;
}, 10000);

/* close and open function resusabled*/
closeopenFunc = (a) => {
  if (window.getComputedStyle(a).display === "none") {
    a.style.display = "block";
  } else {
    a.style.display = "none";
  }
};

/* Qucik links section */
/* comapny */
document.querySelector("#cmpnydrpmnuBtn").addEventListener("click", () => {
  closeopenFunc(document.querySelector("#cmpnylnks"));
});
/* learn */
document.querySelector("#lrndrpmnuBtn").addEventListener("click", () => {
  closeopenFunc(document.querySelector("#lrnlnks"));
});
/* Resource Center */
document.querySelector("#rsccntrdrpmnuBtn").addEventListener("click", () => {
  closeopenFunc(document.querySelector("#rsccntrlnks"));
});
/* Automations */
document.querySelector("#autmtnsdrpmnuBtn").addEventListener("click", () => {
  closeopenFunc(document.querySelector("#autmtnslnks"));
});
/* Security */
document.querySelector("#scrtydrpmnuBtn").addEventListener("click", () => {
  closeopenFunc(document.querySelector("#scrtylnks"));
});
/* Solutions */
document.querySelector("#sltnsdrpmnuBtn").addEventListener("click", () => {
  closeopenFunc(document.querySelector("#sltnslnks"));
});
/* Pricing */
document.querySelector("#prcngdrpmnuBtn").addEventListener("click", () => {
  closeopenFunc(document.querySelector("#prcnglnks"));
});
/* Account Pricing */
document
  .querySelector("#accnt_prcngdrpmnuBtn")
  .addEventListener("click", () => {
    closeopenFunc(document.querySelector("#accntprcnglnks"));
  });

/* close dropdown menu */
document.querySelector("#navbrmenuicon").addEventListener("click", () => {
  closeopenFunc(document.querySelector("#navbrmenudrpdwn"));
});
document.querySelector("#sttngsclsBtn").addEventListener("click", () => {
  closeopenFunc(document.querySelector("#navbrmenudrpdwn"));
});

/* Reload page - hshels navbar logo button */
document.querySelector("#shellsnvbrlgBtn").addEventListener("click", () => {
  window.location.reload();
});

const cards = [
  { nm: 1, id: 1, icon: "data-processing (1).png" },
  { nm: 2, id: 2, icon: "setting.png" },
  { nm: 3, id: 3, icon: "data-report.png" },
  { nm: 4, id: 4, icon: "data-migration.png" },
  { nm: 5, id: 5, icon: "cloud-computing (1).png" },
  { nm: 6, id: 6, icon: "data-management.png" },
  { nm: 7, id: 7, icon: "data-collection.png" },
  { nm: 8, id: 8, icon: "data-cleaning.png" },
  { nm: 9, id: 9, icon: "cloud-computing.png" },
];

/* (() => {
  const a = document.querySelector("#hrdrthmb");
  a.innerHTML = "";
  a.innerHTML = cards
    .map(
      (e) => `<div class="hrdcrdcl" id="n${e.id}">
          <span><img src="assets/icons/hshels_icons/${e.icon}" width="20" /></span>
    </div>`,
    )
    .join("");
})();
 */

/* dark mode */
document.querySelector("#drkmdBtn").addEventListener("click", () => {
  const a = document.querySelector("#mdcrcl");
  const b = document.querySelector("#offid");

  /* color switcher */
  const white = "#ffffff";
  const black = "#000000";
  const bg = "#121314";
  const md = "#252629";
  const fltr_wht = "brightness(0) invert(1)";
  const fltr_blk = "brightness(1) invert(0)";
  const brdr_blk = "1px solid #000000";
  const brdr_wht = "1px solid #ffffff";

  /* elements */
  const e1 = document.querySelector("#home");
  const hrdrinf = document.querySelector("#hrdrinf");
  /* navibar */
  const navbar = document.querySelector("#navbar");
  const n1 = document.querySelector("#shellsnabrlogo");
  const n2 = document.querySelector("#shellsnabrwrdlogo");
  const n3 = document.querySelector("#navbrsgnupBtn");
  const n4 = document.querySelector("#navbrloginBtn");
  const n5 = document.querySelector("#navbrmenuicon");
  const n6 = document.querySelector("#quklnkshrdrBtn");

  /* quick links */
  const n7 = document.querySelector("#qklnksPnl");
  const n8 = document.querySelectorAll(".lnkscl");
  const n9 = document.querySelectorAll(".drpqkmenulnks");

  /* header */
  const n10 = document.querySelector(".circle-inner");

  /* quick links */
  const n11 = document.querySelectorAll(".lnksttl");

  if (window.getComputedStyle(a).justifyContent === "start") {
    a.style.justifyContent = "end";
    b.textContent = "on";
    /* style modes */
    e1.style.backgroundColor = bg;
    hrdrinf.style.color = white;
    navbar.style.color = white;
    n1.style.filter = fltr_wht;
    n2.style.color = white;
    n3.style.color = white;
    n3.style.backgroundColor = md;
    n4.style.color = white;
    n5.style.filter = fltr_wht;
    n6.style.border = brdr_wht;
    n6.style.color = white;
    n7.style.color = white;
    n8.forEach((e) => {
      e.style.color = white;
    });
    n9.forEach((e) => {
      e.style.color = white;
    });
    n10.style.backgroundColor = md;
    n11.forEach((e) => {
      e.style.backgroundColor = md;
      e.style.color = white;
    });
  } else {
    a.style.justifyContent = "start";
    b.textContent = "off";
    e1.style.backgroundColor = white;

    hrdrinf.style.color = black;
    navbar.style.color = black;
    n1.style.filter = fltr_blk;
    n2.style.color = black;
    n3.style.color = white;
    n3.style.backgroundColor = md;
    n4.style.color = black;
    n5.style.filter = fltr_blk;
    n6.style.border = brdr_blk;
    n6.style.color = black;
    n7.style.color = black;
    n8.forEach((e) => {
      e.style.color = white;
    });
    n9.forEach((e) => {
      e.style.color = md;
    });
    n10.style.backgroundColor = "#151515";
    /* n10.style.backgroundColor = "#424242"; */
    n11.forEach((e) => {
      e.style.backgroundColor = "rgba(221, 221, 221, 0.27)";
      e.style.color = black;
    });
  }
});

/* Close home pop menu */
/* close dropdown menu */
document.querySelector("#hmpopupBclsBtn").addEventListener("click", () => {
  closeopenFunc(document.querySelector("#hmpopup"));
});

/* signup - home popup */
document.querySelector("#navbrsgnupBtn").addEventListener("click", () => {
  const a = document.querySelector("#hmpopup");
  const b = document.querySelector("#hmpopup_top_lft");
  closeopenFunc(a);
  a.style.display = "flex";
  b.innerHTML = "Sign up";
});

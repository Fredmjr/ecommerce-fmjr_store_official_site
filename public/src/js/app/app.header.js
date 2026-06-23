const home = document.querySelector("#home");
//Header contents
//small & large screen swap & respovisveness
const parent = document.querySelector("#header_thmub");
const left = document.querySelector("#header_thmublft");
const right = document.querySelector("#header_thmubrght");
const mobileQuery = window.matchMedia("(max-width: 576px)");

const checkRotation = ({ matches }) => {
  if (!parent || !left || !right) return;

  // configuration for both states
  const config = matches
    ? { dir: "column", lOrd: "2", rOrd: "1", w: "100%" }
    : { dir: "row", lOrd: "1", rOrd: "2", w: "50%" };

  // apply styles
  parent.style.flexDirection = config.dir;
  left.style.order = config.lOrd;
  right.style.order = config.rOrd;
  left.style.width = right.style.width = config.w;
};

// Listen and Initial Run
mobileQuery.addEventListener("change", checkRotation);
checkRotation(mobileQuery);

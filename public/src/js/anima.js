//Reusabled fetch request
const request2 = async (url, method, body = null, customHeaders = {}) => {
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

//header contents
(async () => {
  const data = await request2("http://localhost:8100/app/hdrdt", "GET");

  if (data.erMgs) {
    console.log("err!");
  } else if (data.data_sttus === true) {
    const items = data.data;
    const container = document.querySelector("#header_thmubrghtthumbCntnts");
    container.innerHTML = "";
    items.forEach((e) => {
      const div = document.createElement("div");
      div.className = "thumb-item";
      div.style.height = "3%";
      div.style.width = "50%";
      div.style.backgroundColor = "#707070";
      div.style.borderRadius = "3px";
      div.style.marginTop = "1px";
      div.style.marginBottom = "1px";
      //smooth transition
      div.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      container.appendChild(div);
    });

    let index = 0;
    const allDivs = container.querySelectorAll(".thumb-item");
    //first default scroll card
    if (allDivs.length > 0) {
      allDivs[0].style.height = "10%";
      allDivs[0].style.backgroundColor = "#b3324f";
      document.querySelector("#tophdrttl").textContent = items[0].title;
      document.querySelector("#tophdrdscptn").textContent =
        items[0].description;

      // Prepare index for the first interval run (next item)
      index = 1;
    }

    setInterval(() => {
      //info loop
      const btnpnl = document.querySelector("#tophdrgetsrttdBtnPnl");
      const ttl = document.querySelector("#tophdrttl");
      const dsc = document.querySelector("#tophdrdscptn");
      const sub = document.querySelector("#tophdrsubdscptn");

      const elements = [ttl, dsc, sub, btnpnl].filter((el) => el !== null);

      elements.forEach((el) => {
        if (el) {
          el.style.transition =
            "opacity 0.5s ease-in-out, transform 0.5s ease-out";
          el.style.opacity = "0";
          el.style.transform = "translateY(5px)";
        }
      });

      setTimeout(() => {
        if (ttl) ttl.textContent = items[index].title;
        if (dsc) dsc.textContent = items[index].description;
        if (sub) sub.textContent = items[index].subdescription;
        if (btnpnl) btnpnl.innerHTML = items[index].button;
        elements.forEach((el) => {
          if (el) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          }
        });

        //img loop

        //thumb scroll loop
        allDivs.forEach((div, i) => {
          div.style.height = i === index ? "10%" : "3%";
          div.style.backgroundColor = i === index ? "#b3324f" : "#707070";
        });
        index = (index + 1) % items.length;
      }, 500);

      /*     index = (index + 1) % items.length; */
    }, 5000);
  }
})();

//small & large screen swap & respovisveness
const parent = document.querySelector("#header_thmub");
const left = document.querySelector("#header_thmublft");
const right = document.querySelector("#header_thmubrght");
const mobileQuery = window.matchMedia("(max-width: 576px)");

const checkRotation = ({ matches }) => {
  if (!parent || !left || !right) return;

  // Configuration for both states
  const config = matches
    ? { dir: "column", lOrd: "2", rOrd: "1", w: "100%" }
    : { dir: "row", lOrd: "1", rOrd: "2", w: "50%" };

  // Apply styles efficiently
  parent.style.flexDirection = config.dir;
  left.style.order = config.lOrd;
  right.style.order = config.rOrd;
  left.style.width = right.style.width = config.w;
};

// Listen and Initial Run
mobileQuery.addEventListener("change", checkRotation);
checkRotation(mobileQuery);

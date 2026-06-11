const home = document.querySelector("#home");

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
  const data = await request2("/app/hdrdt", "GET");

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
      div.style.width = "40%";
      div.style.backgroundColor = "#707070";
      div.style.borderRadius = "3px";
      div.style.marginTop = "1px";
      div.style.marginBottom = "1px";
      div.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
      container.appendChild(div);
    });

    let index = 0;
    const allDivs = container.querySelectorAll(".thumb-item");
    if (allDivs.length > 0) {
      allDivs[0].style.height = "10%";
      allDivs[0].style.backgroundColor = "#b3324f";
      document.querySelector("#tophdrttl").textContent = items[0].title;
      document.querySelector("#tophdrdscptn").textContent =
        items[0].description;
      index = 1;
    }

    function animateOut(textElements, img) {
      textElements.forEach((el) => {
        el.style.transition =
          "opacity 0.5s ease-in-out, transform 0.5s ease-out";
        el.style.opacity = "0";
        el.style.transform = "translateY(15px)";
      });

      if (img) {
        img.style.transition =
          "opacity 0.5s ease-in-out, transform 0.5s ease-out";
        img.style.opacity = "0";
        img.style.transform = "translateX(30px)";
      }
    }

    // MODIFIED: Separated content assignment from the Fade-In trigger
    function swapUIContent(
      textElements,
      img,
      currentItem,
      allDivs,
      currentIndex,
      proceedToFadeIn,
    ) {
      // Teleport elements to opposite starting positions instantly while invisible
      textElements.forEach((el) => {
        el.style.transition = "none";
        el.style.transform = "translateY(-15px)";
      });

      if (img && currentItem.img) {
        img.style.transition = "none";
        img.style.transform = "translateX(-30px)";

        // Setup the onload listener BEFORE changing the source
        img.onload = () => {
          // Trigger the fade-in only when the asset is 100% loaded and decoded
          proceedToFadeIn();
          img.onload = null; // Clean up memory
        };
        img.src = currentItem.img;
        img.dataset.imgId = currentItem.imgId;
      } else {
        // Fallback if there's no image element
        proceedToFadeIn();
      }

      // Update text contents cleanly
      const [ttl, dsc, sub, btnpnl] = textElements;
      if (ttl) ttl.textContent = currentItem.title;
      if (dsc) dsc.textContent = currentItem.description;
      if (sub) sub.textContent = currentItem.subdescription;
      if (btnpnl) btnpnl.innerHTML = currentItem.button;

      // Handle scroll bar focus indicators
      allDivs.forEach((div, i) => {
        div.style.height = i === currentIndex ? "10%" : "3%";
        div.style.backgroundColor = i === currentIndex ? "#b3324f" : "#707070";
      });
    }

    function preloadNextImage(items, nextIndex) {
      if (items[nextIndex] && items[nextIndex].img) {
        const preloadWorker = new Image();
        preloadWorker.src = items[nextIndex].img;
      }
    }

    preloadNextImage(items, 1);

    // ==========================================
    // RUNTIME EXECUTION BLOCK (FIXED LOOP)
    // ==========================================
    setInterval(() => {
      const btnpnl = document.querySelector("#tophdrgetsrttdBtnPnl");
      const ttl = document.querySelector("#tophdrttl");
      const dsc = document.querySelector("#tophdrdscptn");
      const sub = document.querySelector("#tophdrsubdscptn");
      const img = document.querySelector("#header_thmubrghtdtlsImg");

      const textElements = [ttl, dsc, sub, btnpnl].filter((el) => el !== null);
      const currentItem = items[index];

      // Step A: Fire exit animations immediately
      animateOut(textElements, img);

      // Step B: Wait for the 0.5s exit transition to complete
      setTimeout(() => {
        // Define the function that handles animating things back into view
        const fadeInElements = () => {
          // Force a browser UI layout recalculation before triggering animations
          document.body.offsetHeight;

          textElements.forEach((el) => {
            el.style.transition =
              "opacity 0.5s ease-in-out, transform 0.5s ease-out";
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
          });

          if (img) {
            img.style.transition =
              "opacity 0.5s ease-in-out, transform 0.5s ease-out";
            img.style.opacity = "1";
            img.style.transform = "translateX(0)";
          }
        };

        // Pass fadeInElements as a callback into the swap function
        swapUIContent(
          textElements,
          img,
          currentItem,
          allDivs,
          index,
          fadeInElements,
        );

        // Increment index counter target safely
        index = (index + 1) % items.length;

        // Step C: Preload the NEXT image immediately
        const nextIndex = (index + 1) % items.length;
        preloadNextImage(items, nextIndex);
      }, 500);
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

//offline image
//set image
const cache_set_Img = async (imageUrl) => {
  const cache = await caches.open("welcome_img");
  await cache.add(imageUrl);
  console.log("Image cached successfully for offline use!");
};
/* cache_set_Img("app/wlcmimg"); */
cache_set_Img("https://guest.alwaysdata.net/app/wlcmimg");
//get image
const img_el = document.querySelector("#header_thmubrghtdtlsImg");

if (img_el) {
  const cache_get_Img = async () => {
    const cachedResponse = await caches.match("app/wlcmimg");

    /*    if (cachedResponse) {
      const blob = await cachedResponse.blob();
      img_el.src = URL.createObjectURL(blob);
      console.log("imageeeeeeeeeeeeee", blob);
      console.log("img_elimg_el", img_el);
    } */
  };
  cache_get_Img();
}

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

    //RIGHT & LEFT ANIMA
    //optimized for image download and other content swap - in short image availability is inmportant before swap is done.
    //you can reuse this code in the fture but make sure image download is priority first, the text and scroll bars.
    //animateOut(): Handles fading and sliding everything out of view.
    //swapUIContent(): Updates the text, thumbnails, and images instantly while hidden.
    //preloadNextImage(): Silently downloads the next image ahead of time.

    // Handles the exit animation (Fades out and moves elements)
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

    // Swaps text data, changes image source from cache, and sets up entry tracking
    function swapUIContent(
      textElements,
      img,
      currentItem,
      allDivs,
      currentIndex,
    ) {
      // Teleport elements to opposite starting positions instantly while invisible
      textElements.forEach((el) => {
        el.style.transition = "none";
        el.style.transform = "translateY(-15px)";
      });

      if (img && currentItem.img) {
        img.style.transition = "none";
        img.style.transform = "translateX(-30px)";
        img.src = currentItem.img; // Pulls instantly from preloaded browser cache
        img.dataset.imgId = currentItem.imgId;
      }

      // Force a browser UI layout recalculation
      document.body.offsetHeight;

      // Update text contents cleanly
      const [ttl, dsc, sub, btnpnl] = textElements;
      if (ttl) ttl.textContent = currentItem.title;
      if (dsc) dsc.textContent = currentItem.description;
      if (sub) sub.textContent = currentItem.subdescription;
      if (btnpnl) btnpnl.innerHTML = currentItem.button;

      // Animate all text elements back into view
      textElements.forEach((el) => {
        el.style.transition =
          "opacity 0.5s ease-in-out, transform 0.5s ease-out";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });

      // Animate image back into view
      if (img) {
        img.style.transition =
          "opacity 0.5s ease-in-out, transform 0.5s ease-out";
        img.style.opacity = "1";
        img.style.transform = "translateX(0)";
      }

      // Handle scroll bar focus indicators
      allDivs.forEach((div, i) => {
        div.style.height = i === currentIndex ? "10%" : "3%";
        div.style.backgroundColor = i === currentIndex ? "#b3324f" : "#707070";
      });
    }

    // Background Image Downloader Pipeline
    function preloadNextImage(items, nextIndex) {
      if (items[nextIndex] && items[nextIndex].img) {
        const preloadWorker = new Image();
        preloadWorker.src = items[nextIndex].img; // Forces browser download into RAM cache
      }
    }

    // ==========================================
    // 2. RUNTIME EXECUTION BLOCK
    // ==========================================

    // Preload the very first upcoming slide (Index 1) on initial page load
    preloadNextImage(items, 1);

    // The Core Animation Loop Interface
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

      // Step B: Wait for the 0.5s exit transition, then swap data and trigger arrival entry
      setTimeout(() => {
        // Perform the content layout changes
        swapUIContent(textElements, img, currentItem, allDivs, index);

        // Increment index counter target safely
        index = (index + 1) % items.length;

        // Step C: Preload the NEXT image immediately while user reads current slide
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

//Animations (anima) mutation observer

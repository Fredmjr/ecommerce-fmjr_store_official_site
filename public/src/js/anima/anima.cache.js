const anima_cache_home = document.querySelector("#home");
let txt_img_anima_setInterval;
//fetch request template
const anima_cache_request = async (
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

//cache image template
const anima_cache_set_Img = async (imageUrl, img_tag) => {
  const cache = await caches.open(img_tag);
  await cache.add(imageUrl);
  /*   console.log("Image cached successfully for offline use!"); */
};

const anima_cache_getelem = (e) => {
  return document.getElementById(e) || document.querySelector(`.${e}`);
};

//dowload, cache & transition content
(async () => {
  //one-time img dowload
  const img_files = [
    "welcome.webp",
    "Portfolio.webp",
    "Graphics Design.webp",
    "Web Dev.webp",
    "Desktop Dev.webp",
    "Courses & Classes.webp",
    "Author-Books.webp",
    "Show room.webp",
    "Social channels.webp",
    "Ads-workspace.webp",
    "fmjr-Graphics.webp",
    "Cliental.webp",
  ];
  for (const e of img_files) {
    const img_nm = e;
    const img_tag = img_nm.replace(/\.webp$/i, "");
    try {
      await anima_cache_set_Img(
        `/app/onetimemgs/${e}`,
        /* `https://guest.alwaysdata.net/app/onetimemgs/${e}`, */
        img_tag,
      );
    } catch (err) {
      console.log(err);
    }
  }

  //one-time text dowload
  let stored_text_data;
  if (img_files) {
    const text_data = await anima_cache_request("/app/cachdsrvcs", "GET");
    stored_text_data = text_data;
    if (text_data) {
      //store strignfied text contents for each object
      const parsed_data =
        typeof text_data === "string" ? JSON.parse(text_data) : text_data;
      parsed_data.cacahed_services.forEach((e) => {
        if (e.nm_tag) {
          localStorage.setItem(e.nm_tag, JSON.stringify(e));
        }
      });
      /*       console.log(parsed_data.cacahed_services.length); */
    }
  }

  //loop contents
  if (img_files && stored_text_data) {
    const parsed_data =
      typeof stored_text_data === "string"
        ? JSON.parse(stored_text_data)
        : stored_text_data;
    const services = parsed_data.cacahed_services;
    let currentIndex = 0;

    //Scoll bar anima
    const scll_br_anima = () => {
      const container = document.querySelector("#header_thmubrghtthumbCntnts");
      if (container && services && services.length > 0) {
        setTimeout(() => {
          /* container.innerHTML = ""; */
          services.forEach(() => {
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
            const allDivs = document.querySelectorAll(".thumb-item");
            allDivs.forEach((div, i) => {
              if (i === 0) {
                div.style.height = i === 0 ? "10%" : "3%";
                div.style.backgroundColor = i === 0 ? "#b3324f" : "#707070";
              }
            });
          });
        }, 3000);
      }
    };
    scll_br_anima();

    //generic first element style before anima
    /*   */
    //text & image contect anima
    txt_img_anima_setInterval = setInterval(() => {
      if (services && services.length > 0) {
        // 1Current index for this specific interval execution
        const activeIndex = currentIndex;
        const currntobj_nm = services[activeIndex];
        currentIndex = (currentIndex + 1) % services.length;
        /* console.log(`Index ${activeIndex} (${currntobj_nm.img}):`); */

        const cache_get_Img = async () => {
          const cachedResponse = await caches.match(
            `/app/onetimemgs/${currntobj_nm.img}.webp`,
          );

          if (cachedResponse) {
            const offline_img_blob = URL.createObjectURL(
              await cachedResponse.blob(),
            );

            const txt_img_anima = () => {
              const activeFrameObject = services[activeIndex];
              const btnpnl = anima_cache_getelem("tophdrgetsrttdBtnPnl");
              const ttl = anima_cache_getelem("tophdrttl");
              const dsc = anima_cache_getelem("tophdrdscptn");
              const sub = anima_cache_getelem("tophdrsubdscptn");
              const img = anima_cache_getelem("header_thmubrghtdtlsImg");

              const allDivs = document.querySelectorAll(
                "#header_thmubrghtthumbCntnts .thumb-item",
              );
              const textElements = [ttl, dsc, sub, btnpnl].filter(Boolean);

              // Fade out
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

              // Swap after fade-out
              setTimeout(() => {
                textElements.forEach((el) => {
                  el.style.transition = "none";
                  el.style.transform = "translateY(-15px)";
                });
                if (img) {
                  img.style.transition = "none";
                  img.style.transform = "translateX(-30px)";
                }

                const fadeIn = () => {
                  document.body.offsetHeight; // force reflow
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

                // Update content
                if (ttl) ttl.textContent = activeFrameObject.title;
                if (dsc) dsc.textContent = activeFrameObject.description;
                if (sub) sub.textContent = activeFrameObject.subdescription;
                if (btnpnl) btnpnl.innerHTML = activeFrameObject.button;

                if (img && offline_img_blob) {
                  img.onload = () => {
                    fadeIn();
                    img.onload = null;
                  };
                  img.src = offline_img_blob;
                } else {
                  fadeIn();
                }

                // Scroll bar indicators
                allDivs.forEach((div, i) => {
                  div.style.height = i === activeIndex ? "10%" : "3%";
                  div.style.backgroundColor =
                    i === activeIndex ? "#b3324f" : "#707070";
                });
              }, 500);
            };

            txt_img_anima();
          } else {
            /* console.warn(
              `cache miss at index ${activeIndex}. skipping img update.`,
            ); */
          }
        };
        cache_get_Img();
      }
    }, 3000);
  }
})();

// anima if anyth button is clicked, this is a along shot
// The object containing the selectors or elements you want to match against
const targetElements = {
  anima_el1: "tophdrprtfloBtn",
  anima_el2: "navbrsgnupBtn",
  anima_el3: "navbrloginBtn",
};

home.addEventListener("click", (e) => {
  const selectors = Object.values(targetElements);
  const combinedSelector = selectors.join(", ");

  if (e.target.closest(combinedSelector)) {
    clearInterval(txt_img_anima_setInterval);
  }
});

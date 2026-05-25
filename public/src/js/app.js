/* Reload page - hshels navbar logo button */
document.querySelector("#fmjrnvbrlgBtn").addEventListener("click", () => {
  window.location.reload();
});

//Reusabled fetch request
const request = async (url, method, body = null, customHeaders = {}) => {
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

//get
/* const data = await request("/api/trms", "GET"); */

//post
/* const data = await request("/api/trms", "POST", { name: "New Item" }); */

//patch
/* const data = await request("/api/trms/1", "PATCH", { price: 200 }); */

//delete
/* const data = await request("/api/trms/1", "DELETE"); */

//APP MUTATION OBSERVER
//reduced element code selection
const findNode = (node, selector) =>
  node.matches?.(selector)
    ? node
    : node.querySelector?.(selector) || document.querySelector(selector);

const appbsrvr = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      const el1 = findNode(node, "#tophdrprtfloBtn");
      const main = findNode(node, "#main");

      if (el1 && main) {
        el1.addEventListener("click", async () => {
          const data = await request("/app/portflpg", "GET");
          console.log("hi");
          main.innerHTML = data;
        });
      }
    });
  });
});

appbsrvr.observe(home, { childList: true, subtree: true });

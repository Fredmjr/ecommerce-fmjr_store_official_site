//reusable button function
const app_prfl_getelem = (e) => {
  return document.getElementById(e) || document.querySelector(`.${e}`);
};

//reuable cookie
const app_prfl_reusable_cookie = (elem) => {
  let ckies = document.cookie.split("; ");
  for (let i = 0; i < ckies.length; i++) {
    let cookie = ckies[i];
    let [name, value] = cookie.split("=");
    if (name === elem) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

//Reusabled fetch request
const app_prfl_request = async (
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

//muataion observer
const prflbsrvr = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      const el1 = node.matches?.("#accntspgcntnts_accntdtls")
        ? node
        : node.querySelector?.("#accntspgcntnts_accntdtls");
      //profile
      if (el1) {
        const cookie = app_prfl_reusable_cookie("usr_accnt_jwt_token");

        if (cookie) {
          (async () => {
            const prfl_data = await app_prfl_request("/usr/prfl", "POST", {
              c: cookie,
            });
            if (prfl_data) {
              const tmp = prfl_data.usr_dtls_tmp;

              app_prfl_getelem("accntspgcntnts_accntdtls").innerHTML = tmp;
            }
          })();
        }
      }
    });
  });
});

prflbsrvr.observe(app_api_getelem("home"), { childList: true, subtree: true });

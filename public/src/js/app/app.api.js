//Reusabled fetch request
const app_api_request = async (
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

//reusable button function
const app_api_getelem = (e) => {
  return document.getElementById(e) || document.querySelector(`.${e}`);
};

//mont and date api
let calendar_obj_data;
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#ctgryctgries_clndrBtn") ||
    e.target.closest("#ctgry_menuBtn_drpdwnmenulnkclndrBtn")
  ) {
    const data = await app_api_request("/api/dtmtndataapi", "GET");
    if (data) {
      /*  app_api_getelem("clndrcrd_bttm_lftcndrpnl_dayscntnr").innerHTML =
        "loading"; */
      //localstorage
      const parsed_data = typeof data === "string" ? JSON.parse(data) : data;
      parsed_data.month_date_data.forEach((e) => {
        if (e.month_tag) {
          localStorage.setItem(e.month_tag, JSON.stringify(e));
        }
      });

      //calendar year range data - variable
      calendar_obj_data = data.month_date_data;
    }
  }
});

const apibsrvr = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      const el1 = node.matches?.(".clndrcrd_bttm_lftft")
        ? node
        : node.querySelector?.(".clndrcrd_bttm_lftft");
      const el2 = node.matches?.("#clndrcrd_bttm_lftmonthtopttl")
        ? node
        : node.querySelector?.("#clndrcrd_bttm_lftmonthtopttl");
      const el3 = node.matches?.("#clndrcrd_bttm_lftmonth_genericbtnsbkwd")
        ? node
        : node.querySelector?.("#clndrcrd_bttm_lftmonth_genericbtnsbkwd");

      //calendar year range data - data render
      if (el1) {
        el1.textContent = `Calendar Range: ${calendar_obj_data[0].month} - ${calendar_obj_data[calendar_obj_data.length - 1].month}`;
      }
      if (el2) {
        //calendar year range data - data render
        el2.textContent = `${calendar_obj_data[0].month}`;
        console.log(calendar_obj_data[0]);

        const now = new Date();
        const options = { month: "long", year: "numeric" };
        const current_month_year = now.toLocaleDateString("en-US", options);
        const index = calendar_obj_data.findIndex(
          (obj) => obj.month === current_month_year,
        );

        console.log("index", index);
        let new_index = index;

        //generic caln prefix div space holder
        const geneirc_prfx_hldr_el_width =
          (calendar_obj_data[new_index].num_day - 1) * 14;
        const geneirc_prfx_hldr_el = `<div style="width: ${geneirc_prfx_hldr_el_width}%; background-color: red;">dddd</div>`;
        const cntr_num = app_api_getelem("clndrcrd_bttm_lftcndrpnl_dayscntnr");
        cntr_num.innerHTML = "";
        cntr_num.innerHTML = geneirc_prfx_hldr_el;

        el3.addEventListener("click", () => {
          if (new_index < calendar_obj_data.length) {
            cntr_num.innerHTML = "";
            const geneirc_prfx_hldr_el2 = `<div style="width: ${(calendar_obj_data[new_index].num_day - 1) * 14}%; background-color: red;">dddd</div>`;
            cntr_num.innerHTML = geneirc_prfx_hldr_el2;
            for (let i = 1; i <= calendar_obj_data[new_index].days; i++) {
              const cndr_pank_tem = document.createElement("p");
              cndr_pank_tem.textContent = i;
              cndr_pank_tem.style.height = "16.5%";
              cndr_pank_tem.style.width = "14%";
              cndr_pank_tem.className =
                "clndrcrd_bttm_lftcndrpnl_new_datecntnr_txtcl";
              cntr_num.appendChild(cndr_pank_tem);
              console.log(cndr_pank_tem);
            }

            new_index++;
          } else {
            console.log(calendar_obj_data.length);
            new_index = index;
          }
        });
      }
    });
  });
});

apibsrvr.observe(app_api_getelem("home"), { childList: true, subtree: true });

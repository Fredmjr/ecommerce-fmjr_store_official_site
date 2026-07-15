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
//default spinner
const app_api_spinner_fuc = (e) => {
  const spinner = `<div id="spnrpnl"><span><img class="ldngicn" width="30" src="dist/icons/loading.svg" alt=""></span></div>`;
  e.innerHTML = "";
  app_btns_getelem("main").innerHTML = spinner;
};

//reusable button function
const app_api_getelem = (e) => {
  return document.getElementById(e) || document.querySelector(`.${e}`);
};

//mont and date api
let calendar_obj_data;
let fmjr_clndr_evnt;
let calendar_btn_clicked = false;
let calendar_event_btn_clicked = false;

home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#ctgryctgries_clndrBtn") ||
    e.target.closest("#ctgry_menuBtn_drpdwnmenulnkclndrBtn")
  ) {
    const data = await app_api_request("/api/dtmtndataapi", "GET");
    if (data) {
      /*  app_api_getelem("clndrcrd_bttm_lftcndrpnl_dayscntnr").innerHTML =
        "loading"; */
      //localstorage - mont & days
      const parsed_data = typeof data === "string" ? JSON.parse(data) : data;
      parsed_data.month_date_data.forEach((e) => {
        if (e.month_tag) {
          localStorage.setItem(e.month_tag, JSON.stringify(e));
        }
      });

      //calendar year range data - variable
      calendar_obj_data = data.month_date_data;

      //localstorage - fmjr events
      localStorage.setItem(
        "fmjr_clndr_evnt_data",
        JSON.stringify(parsed_data.fmjr_clndr_evnt_data),
      );
      //event calendar year range data - variable
      fmjr_clndr_evnt = data.fmjr_clndr_evnt_data;
    }
    calendar_btn_clicked = true;
    calendar_event_btn_clicked = false;
  }
});

//events_schedules
home.addEventListener("click", async (e) => {
  if (
    e.target.closest("#ctgryctgries_evntsschdlsBtn") ||
    e.target.closest("#ctgry_menuBtn_drpdwnmenulnkevntsschdlsBtn")
  ) {
    const data = await app_api_request("/api/dtmtndataapi", "GET");
    if (data) {
      console.log(
        "clicked and showing data.usr_clndr_evnt_data: ",
        data.usr_clndr_evnt_data,
      );
      /*  app_api_getelem("clndrcrd_bttm_lftcndrpnl_dayscntnr").innerHTML =
        "loading"; */
      //localstorage - mont & days
      const parsed_data = typeof data === "string" ? JSON.parse(data) : data;
      parsed_data.month_date_data.forEach((e) => {
        if (e.month_tag) {
          localStorage.setItem(e.month_tag, JSON.stringify(e));
        }
      });

      //calendar year range data - variable
      calendar_obj_data = data.month_date_data;

      //localstorage - fmjr events
      localStorage.setItem(
        "usr_clndr_evnt_data",
        JSON.stringify(parsed_data.usr_clndr_evnt_data),
      );
      //event calendar year range data - variable
      fmjr_clndr_evnt = data.usr_clndr_evnt_data;
    }
    calendar_event_btn_clicked = true;
    calendar_btn_clicked = false;
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
      const el4 = node.matches?.("#clndrcrd_bttm_lftmonth_genericbtnsfrwd")
        ? node
        : node.querySelector?.("#clndrcrd_bttm_lftmonth_genericbtnsfrwd");
      const el5 = node.matches?.("#accntspgcntnts_subbnnrclndrsec_crtbtn")
        ? node
        : node.querySelector?.("#accntspgcntnts_subbnnrclndrsec_crtbtn");

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
        const cntr_num = app_api_getelem("clndrcrd_bttm_lftcndrpnl_dayscntnr");
        let forwrdbtn_clicked = false;

        //resuable month calendar contents
        const resuable_clndr_month_cntnts_func = () => {
          cntr_num.innerHTML = "";
          el2.textContent = calendar_obj_data[new_index].month;

          //generic gap fller
          for (let i = 1; i <= calendar_obj_data[new_index].num_day - 1; i++) {
            const filler = document.createElement("p");
            filler.style.height = "16.5%";
            filler.style.width = "14%";
            filler.className =
              "clndrcrd_bttm_lftcndrpnl_new_datecntnr_txtclfllrs ";
            cntr_num.appendChild(filler);
          }
          //days contents
          for (let i = 1; i <= calendar_obj_data[new_index].days; i++) {
            const cndr_pank_tem = document.createElement("p");
            cndr_pank_tem.textContent = i;
            cndr_pank_tem.style.height = "16.5%";
            cndr_pank_tem.style.width = "14%";
            cndr_pank_tem.className =
              "clndrcrd_bttm_lftcndrpnl_new_datecntnr_txtcl";
            cndr_pank_tem.dataset.evnttag = `${calendar_obj_data[new_index].month_tag}_${i}`;
            cndr_pank_tem.id = `${calendar_obj_data[new_index].month_tag}_${i}`;
            cntr_num.appendChild(cndr_pank_tem);
          }

          //event day
          /* const monthKey = "june_26";  */
          const monthKey = calendar_obj_data[new_index].month_tag;
          const month_events = fmjr_clndr_evnt[monthKey];
          const event_mnth_cntnr = app_api_getelem(
            "clndrcrd_bttm_rghtcrdcntnr",
          );
          //fmjr store events & event day styles
          const event_mnth_cntnr_fuc = () => {
            //day card - render notes
            if (month_events) {
              event_mnth_cntnr.innerHTML = "";
              for (const event_key in month_events) {
                const temp = document.createElement("div");
                temp.innerHTML = `
            <div class="clndrcrd_bttm_rghtcrddttmrdio">
              <div class="clndrcrd_bttm_rghtcrddttmrdioinner">
                <img class="ctgryctgries_icnscl" src="dist/icons/calendar.svg" width="10"></div></div>
            <div class="clndrcrd_bttm_rghtcrddttm">
              <p class="clndrcrd_bttm_rghtcrddttmtxt">${month_events[event_key].date}</p>
            </div>
            <p class="clndrcrd_bttm_rghtcrdttl">${month_events[event_key].ttl}</p>
            <p class="clndrcrd_bttm_rghtcrddscrptn">${month_events[event_key].dscrptn}</p>`;
                temp.className = "clndrcrd_bttm_rghtcrd";
                event_mnth_cntnr.appendChild(temp);
                //day card - styles
                const elem_for_styles = app_api_getelem(
                  month_events[event_key].data_evnttag,
                );
                if (elem_for_styles) {
                  elem_for_styles.style.backgroundColor = "#b3324f";
                  elem_for_styles.style.color = "white";
                }
              }
            } else {
              event_mnth_cntnr.innerHTML = "";
              const a = `<div id="generic_empty_event_clndnr">
            <div id+"generic_empty_event_clndnr_img">
            <div  id="generic_empty_event_clndnr_img"><img src="dist/imgs/calendar_events_unavailable.webp" width="45"></div>
            <p style="text-align:center;">No Upcoming Events</p>
             </div>
            </div>`;
              event_mnth_cntnr.innerHTML = a;
            }
          };
          if (calendar_btn_clicked === true) {
            event_mnth_cntnr_fuc();
          }

          //custmer or user events & event day styles
          const event_mnth_cntnr_fuc2 = () => {
            //day card - render notes
            if (month_events) {
              event_mnth_cntnr.innerHTML = "";
              for (const event_key in month_events) {
                const temp = document.createElement("div");
                temp.innerHTML = `
            <div class="clndrcrd_bttm_rghtcrddttmrdio">
              <div class="clndrcrd_bttm_rghtcrddttmrdioinner2">
                <img class="ctgryctgries_icnscl" src="dist/icons/calendar.svg" width="10"></div></div>
            <div class="clndrcrd_bttm_rghtcrddttm">
              <p class="clndrcrd_bttm_rghtcrddttmtxt">${month_events[event_key].date}</p>
            </div>
            <p class="clndrcrd_bttm_rghtcrdttl">${month_events[event_key].ttl}</p>
            <p class="clndrcrd_bttm_rghtcrddscrptn">${month_events[event_key].dscrptn}</p>`;
                temp.className = "clndrcrd_bttm_rghtcrd";
                event_mnth_cntnr.appendChild(temp);
                //day card - styles
                const elem_for_styles = app_api_getelem(
                  month_events[event_key].data_evnttag,
                );
                if (elem_for_styles) {
                  elem_for_styles.style.backgroundColor = "#380a86";
                  elem_for_styles.style.color = "white";
                }
              }
            } else {
              event_mnth_cntnr.innerHTML = "";
              const a = `<div id="generic_empty_event_clndnr">
            <div id+"generic_empty_event_clndnr_img">
            <div  id="generic_empty_event_clndnr_img"><img src="dist/imgs/calendar_events_unavailable.webp" width="45"></div>
            <p style="text-align:center;">No Upcoming Events</p>
             </div>
            </div>`;
              event_mnth_cntnr.innerHTML = a;
            }
          };
          if (calendar_event_btn_clicked === true) {
            event_mnth_cntnr_fuc2();
          }
        };

        //auto current selected month
        resuable_clndr_month_cntnts_func();
        new_index++;

        //month selection - backward
        el3.addEventListener("click", () => {
          const len = calendar_obj_data.length;
          let target_index;
          if (forwrdbtn_clicked) {
            target_index = (new_index - 2 + len) % len;
            forwrdbtn_clicked = false;
          } else {
            target_index = (new_index - 2 + len) % len;
          }

          new_index = target_index;
          resuable_clndr_month_cntnts_func();
          new_index = (target_index + 1) % len;
        });
        //month selection - forward
        el4.addEventListener("click", () => {
          forwrdbtn_clicked = true;
          if (new_index < calendar_obj_data.length) {
            resuable_clndr_month_cntnts_func();
            new_index++;
          } else {
            new_index = index;
          }
        });
      }
      if (el5) {
        const el_yr = app_api_getelem(
          "accntspgcntnts_subbnnrclndrseccl_date_yrid",
        );
        const el_mnth = app_api_getelem(
          "accntspgcntnts_subbnnrclndrseccl_date_mnthid",
        );
        const el_day = app_api_getelem(
          "accntspgcntnts_subbnnrclndrseccl_date_dayid",
        );

        const el_ttl = app_api_getelem(
          "accntspgcntnts_subbnnrclndrsec_details_eventttl",
        );
        const el_dscrptn = app_api_getelem(
          "accntspgcntnts_subbnnrclndrsec_dscrptnbox",
        );

        //resuable day of month
        const get_next_day_fuc = (day, month_name, year, is_forward) => {
          day = Number(day);
          const month_days = {
            January: 31,
            March: 31,
            May: 31,
            July: 31,
            August: 31,
            October: 31,
            December: 31,
            April: 30,
            June: 30,
            September: 30,
            November: 30,
            February: 28,
          };

          if (month_name === "February") {
            const is_leap_year =
              (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
            month_days["February"] = is_leap_year ? 29 : 28;
          }

          const max_days = month_days[month_name];

          if (is_forward) {
            if (day >= max_days) {
              return day;
            }
            return day + 1;
          } else {
            if (day <= 1) {
              return day;
            }
            return day - 1;
          }
        };
        //resuable month of year
        const get_next_nonth_fuc = (month_nm, is_mnth_forward) => {
          const m = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ];

          const index = m.indexOf(month_nm);
          if (index === -1) return month_nm;

          if (is_mnth_forward) {
            return m[(index + 1) % 12];
          } else {
            return m[(index - 1 + 12) % 12];
          }
        };
        //resuable year
        const get_next_yr_fuc = (yr, is_yr_forward) => {
          const numeric_yr = Number(yr);
          if (is_yr_forward) {
            return numeric_yr + 1;
          } else if (yr === "2026") {
            return numeric_yr;
          } else {
            return numeric_yr - 1;
          }
        };

        //add day
        app_api_getelem(
          "accntspgcntnts_subbnnrclndrseccl_dateadddaybtn",
        ).addEventListener("click", () => {
          let is_forward = true;
          const selcted_day = get_next_day_fuc(
            el_day.innerText,
            el_mnth.innerText,
            el_yr.innerText,
            is_forward,
          );
          el_day.innerText = selcted_day;
        });
        //sub day
        app_api_getelem(
          "accntspgcntnts_subbnnrclndrseccl_datesubdaybtn",
        ).addEventListener("click", () => {
          let is_forward = false;
          const selcted_day = get_next_day_fuc(
            el_day.innerText,
            el_mnth.innerText,
            el_yr.innerText,
            is_forward,
          );
          el_day.innerText = selcted_day;
        });

        //next month
        app_api_getelem(
          "accntspgcntnts_subbnnrclndrseccl_datenxtmnthbtn",
        ).addEventListener("click", () => {
          let is_forward = true;
          const m = get_next_nonth_fuc(el_mnth.innerText, is_forward);
          el_mnth.innerText = m;
        });
        //previous month
        app_api_getelem(
          "accntspgcntnts_subbnnrclndrseccl_dateprvusmnthbtn",
        ).addEventListener("click", () => {
          let is_forward = false;
          const m = get_next_nonth_fuc(el_mnth.innerText, is_forward);
          el_mnth.innerText = m;
        });
        //next year
        app_api_getelem(
          "accntspgcntnts_subbnnrclndrseccl_datenextyrbtn",
        ).addEventListener("click", () => {
          let is_yr_forward = true;
          const y = get_next_yr_fuc(el_yr.innerText, is_yr_forward);
          el_yr.innerText = y;
        });
        //previous
        app_api_getelem(
          "accntspgcntnts_subbnnrclndrseccl_datenprvusyrbtn",
        ).addEventListener("click", () => {
          let is_yr_forward = false;
          const y = get_next_yr_fuc(el_yr.innerText, is_yr_forward);
          el_yr.innerText = y;
        });
        //final create event
        el5.addEventListener("click", () => {
          console.log(
            "EVENT DETAILS - DATE: ",
            el_day.innerText,
            el_mnth.innerText,
            el_yr.innerText,
          );
          console.log("EVENT DETAILS - TITLE: ", el_ttl.value);
          console.log("EVENT DETAILS - DESCRPTION: ", el_dscrptn.value);
        });
      }
    });
  });
});

apibsrvr.observe(app_api_getelem("home"), { childList: true, subtree: true });

//Reusabled fetch request
const blog_request = async (url, method, body = null, customHeaders = {}) => {
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
////open or close function
closeopenFunc = (a) => {
  if (window.getComputedStyle(a).display === "none") {
    a.style.display = "block";
  } else {
    a.style.display = "none";
  }
};
//default spinner
const blog_spinner_fuc = (e) => {
  const spinner = `<div id="spnrpnl"><span><img class="ldngicn" width="20" src="dist/icons/loading.svg" alt=""></span></div>`;
  e.innerHTML = "";
  e.innerHTML = spinner;
};

//reusable button function
const blog_getelem = (e) => {
  return document.getElementById(e) || document.querySelector(`.${e}`);
};

//variables
let top3Latest_obj;

//blog data
let external_blog_data_obj;
const main_blog_crd_render_fuc = async () => {
  //card temp

  //render blog main elems
  const blog_elem_render_fuc = () => {
    blog_getelem("blog_hero_lft").innerHTML = "";
    for (let i = 0; i < 4; i++) {
      const e = document.createElement("div");
      e.className = "blog_hero_lft_crdmain_ldngcrd";
      e.innerHTML = "";
      elem_temp = e;
      blog_getelem("blog_hero_lft").appendChild(e);
    }
  };
  blog_elem_render_fuc();

  //iniate loading anima
  document
    .querySelectorAll(".blog_hero_lft_crdmain_ldngcrd")
    .forEach((el) => el.classList.add("is-loading"));

  //fetch blog data
  const data = await blog_request("/api/blogdataapi", "GET");
  external_blog_data_obj = data;
  if (data) {
    //stop loading anima
    document
      .querySelectorAll(".blog_hero_lft_crdmain_ldngcrd")
      .forEach((el) => el.classList.remove("is-loading"));

    //success data
    if ((data.data_success = true)) {
      /* data.blog_data.date,
        data.blog_data.img,
        data.blog_data.ttl,
        data.blog_data.dscrptn,
        data.blog_data.tags,
        data.blog_data.elem_crd_id, */

      const render_crd_data_fuc = () => {
        blog_getelem("blog_hero_lft").innerHTML = "";
        for (let i = 0; i < 4; i++) {
          //tag cards
          const tagsObj = data.blog_data[i].data.blog_tags;
          const tagsHTML = Object.values(tagsObj)
            .map(
              (tag) =>
                `<button class="blog_hero_lft_crdmain_info_top_crdcl">${tag}</button>`,
            )
            .join("");
          //main card
          const e = document.createElement("div");
          e.className = "blog_hero_lft_crdmain_ldngcrd_cntnr";
          e.dataset.blog_tag = data.blog_data[i].id;
          e.innerHTML = ` <div class="blog_hero_lft_crd">
          <div class="blog_hero_lft_crdhandle" data->${data.blog_data[i].date}</div>
          <div class="blog_hero_lft_crdmain">
            <div class="blog_hero_lft_crdmain_thumbimg"></div>
            <div class="blog_hero_lft_crdmain_info">
              <p class="blog_hero_lft_crdmain_info_ttl">${data.blog_data[i].data.title}</p>
              <p class="blog_hero_lft_crdmain_info_dscrptn">${data.blog_data[i].data.descrption}</p>
              <br />
              <div class="blog_hero_lft_crdmain_info_top">${tagsHTML}</div>

            </div>
          </div>
        </div>`;
          blog_getelem("blog_hero_lft").appendChild(e);
        }
      };

      render_crd_data_fuc();

      //side menu recent blog
      const side_blog_crd_redner_fuc = () => {
        if (external_blog_data_obj) {
          console.log(external_blog_data_obj);
          console.log(external_blog_data_obj.blog_data);
          const list = external_blog_data_obj.blog_data;
          //unique tags
          const allTags = list.flatMap((item) =>
            Object.values(item.data?.blog_tags || {}),
          );
          const duplicate_tags = [
            ...new Set(
              allTags.filter((tag, index) => allTags.indexOf(tag) !== index),
            ),
          ];

          console.log("duplicate_tags: ", duplicate_tags);
          const p = blog_getelem("blog_hero_rght_poplrtagspnl");
          p.innerHTML = "";
          for (let i = 0; i < duplicate_tags.length; i++) {
            console.log(duplicate_tags[i]);

            const e = document.createElement("div");
            e.className = "blog_hero_rght_poplrtags_crdcl";
            e.innerHTML = duplicate_tags[i];
            p.appendChild(e);
          }
        }
      };
      side_blog_crd_redner_fuc();
    }

    //err data
    if (data.erMgs) {
      console.log("err");
    }
  }
};
main_blog_crd_render_fuc();

//return to store
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest("#vst_store_bnnr_btn");
  if (el) {
    window.location.href = "/";
  }
});

//click on main tags
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest(".blog_hero_lft_crdmain_info_top_crdcl");
  if (el) {
    console.log(el.innerHTML);
  }
});
//click on main card
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest(".blog_hero_lft_crdmain_ldngcrd_cntnr");

  const display_blog_contents_fuc = (elem, data_obj_for_display) => {
    const selected_blog = data_obj_for_display.blog_data.find(
      (item) => item.id === elem.dataset.blog_tag,
    );
    if (selected_blog) {
      blog_getelem("blog_hero_lft").innerHTML = "";

      const { title, blog_tags, ...contentOnly } = selected_blog.data;
      const tagsHTML = Object.values(contentOnly)
        .map((tag) => `<p>${tag}</p>`)
        .join("");
      const e = document.createElement("div");
      e.className = "blog_hero_lft_crdmain_selectedcrd";
      e.innerHTML = `
         <div  id="blog_hero_lft_crdmain_selectedcrd_topbnnr">
         <p id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ttl">${selected_blog.data.title}</p>
         <div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr">
         <div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft"><div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_prflimg"></div><p>${selected_blog.uploaded_by}</p><div class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_circle"></div><p>${selected_blog.date} - ${selected_blog.time}</p></div>
          <button id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btn">
          <div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu">
          <p id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_sclsttl">Share Blog</p>
          <div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls">
          <img class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn" width="15" src="dist/icons/facebook.svg" alt="">
          <img class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn"width="15" src="dist/icons/instagram.svg" alt="">
          <img class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn" width="15" src="dist/icons/linkedin.svg" alt="">
          <img class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn" width="15" src="dist/icons/behance.svg" alt="">
          </div>
          </div>
          <img
            id="cntntsicn"
            src="dist/icons/dots.svg"
            class="bnnricons"
            width="25"
          /></button>
          </div>
         </div>
         </div>
         <div id="blog_hero_lft_crdmain_selectedcrd_thumbimg"></div>
         <div id="blog_hero_lft_crdmain_selectedcrd_info">
         ${tagsHTML}
         </div>
         </br>
         <div id="blog_hero_lft_crdmain_selectedcrd_info_endnote">
         <p class="blog_hero_lft_crdmain_selectedcrd_info_endnote_lnkscl"><img width="11" src="dist/icons/likes.svg" alt=""><span>0</span>Likes</p>
         <p class="blog_hero_lft_crdmain_selectedcrd_info_endnote_lnkscl"><img width="11" src="dist/icons/comments.svg" alt=""><span>0</span>Coments</p>
         <p class="blog_hero_lft_crdmain_selectedcrd_info_endnote_lnkscl"><img width="11" src="dist/icons/share.svg" alt=""><span>0</span>Shares</p>
         </div>
         </br></br>
         <div id="blog_hero_lft_crdmain_selectedcrd_info_endnote_rtnhm_btn_pnl">
         <button id="blog_hero_lft_crdmain_selectedcrd_info_endnote_rtnhm_btn">Home Blogs</button>
         </div>
        `;
      elem_temp = e;
      blog_getelem("blog_hero_lft").appendChild(e);
    }
  };
  if (el) {
    display_blog_contents_fuc(el, external_blog_data_obj);
  }
});

//open and close drop down menu
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest(
    "#blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btn",
  );
  if (el) {
    closeopenFunc(
      blog_getelem(
        "blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu",
      ),
    );
  }
});

//social blog
//facebook
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest(
    ".blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn",
  );
  if (el) {
    console.log(el);
  }
});

//navibar reload page - logo button
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest("#navbarlogo_full");
  if (el) {
    window.location.reload();
  }
});

//retrun to home blogs away from selected blog
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest(
    "#blog_hero_lft_crdmain_selectedcrd_info_endnote_rtnhm_btn",
  );
  if (el) {
    main_blog_crd_render_fuc();
  }
});
//poplar tag click
let remaining_unrendered_blogs = 0;
let next_pg_blogs_fuc;
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest(".blog_hero_rght_poplrtags_crdcl");
  if (el) {
    blog_getelem("blog_hero_lft_nxtpgpopupbtn_pnl").innerHTML =
      `<div id="blog_hero_lft_nxtpgpopupbtn">Next Page</div>`;
    const key_tag = el.innerHTML;
    console.log(key_tag);
    const filtered_blog_tag_data = external_blog_data_obj.blog_data.filter(
      (item) => {
        const tags = item.data?.blog_tags;
        return tags && Object.values(tags).includes(key_tag);
      },
    );

    console.log("filtered_blog_tag_data: ", filtered_blog_tag_data);

    const temp = (arg_data) => {
      blog_getelem("blog_hero_lft").innerHTML = "";
      /*       const actual_length = arg_data */
      let calculated_loop = 4;
      if (arg_data.length <= 4) {
        calculated_loop = arg_data.length;
      }
      for (let i = 0; i < calculated_loop; i++) {
        console.log("arg_data: ", arg_data);
        //tag cards
        //THSE EG LESS THAN 3 SHOW ERR FIX BY ONLY LOOP FOR THOSE
        const tagsObj = arg_data[i].data.blog_tags;
        const tagsHTML = Object.values(tagsObj)
          .map(
            (tag) =>
              `<button class="blog_hero_lft_crdmain_info_top_crdcl">${tag}</button>`,
          )
          .join("");
        //main card
        const e = document.createElement("div");
        e.className = "blog_hero_lft_crdmain_ldngcrd_cntnr";
        e.dataset.blog_tag = arg_data[i].id;
        e.innerHTML = ` <div class="blog_hero_lft_crd">
          <div class="blog_hero_lft_crdhandle" data->${arg_data[i].date}</div>
          <div class="blog_hero_lft_crdmain">
            <div class="blog_hero_lft_crdmain_thumbimg"></div>
            <div class="blog_hero_lft_crdmain_info">
              <p class="blog_hero_lft_crdmain_info_ttl">${arg_data[i].data.title}</p>
              <p class="blog_hero_lft_crdmain_info_dscrptn">${arg_data[i].data.descrption}</p>
              <br />
              <div class="blog_hero_lft_crdmain_info_top">${tagsHTML}</div>

            </div>
          </div>
        </div>`;
        blog_getelem("blog_hero_lft").appendChild(e);
      }
    };
    const arg_data = filtered_blog_tag_data;
    if (filtered_blog_tag_data.length <= 4) {
      console.log("less", filtered_blog_tag_data.length);
      console.log(
        "filtered_blog_tag_dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        arg_data,
      );
      temp(arg_data);
      blog_getelem("blog_hero_lft_nxtpgpopupbtn_pnl").innerHTML =
        `<button id="blog_hero_lft_rtrntohmblogsg_btn" >Home Blogs</button>`;
      blog_getelem("blog_hero_lft_rtrntohmblogsg_btn").style.display = "block";
    } else {
      console.log("great", filtered_blog_tag_data.length);
      const remaining_num = filtered_blog_tag_data.length - 4;
      //remove first 4 blogs coz they being rendered, the rest pass the over for next page blogs display
      const blogs_indexed_to_remove = new Set([0, 1, 2, 3]);
      remaining_unrendered_blogs = filtered_blog_tag_data.filter(
        (_, index) => !blogs_indexed_to_remove.has(index),
      );
      blog_getelem("blog_hero_lft_nxtpgpopupbtn").style.display = "block";
      console.log(
        "filtered_blog_tag_datatttttttttttttttttttttttttttttttttttt",
        arg_data,
      );
      temp(arg_data);
      next_pg_blogs_fuc = temp;
    }
  }
});

//render next page blogs

document.body.addEventListener("click", async (e) => {
  const el = e.target.closest("#blog_hero_lft_nxtpgpopupbtn");
  if (el) {
    if (remaining_unrendered_blogs.length <= 4) {
      next_pg_blogs_fuc(remaining_unrendered_blogs);
      blog_getelem("blog_hero_lft_nxtpgpopupbtn_pnl").innerHTML =
        `<button id="blog_hero_lft_rtrntohmblogsg_btn" >Home Blogs</button>`;
      blog_getelem("blog_hero_lft_rtrntohmblogsg_btn").style.display = "block";
    } else {
      next_pg_blogs_fuc(remaining_unrendered_blogs);
      //remove first 4 blogs coz they being rendered, the rest pass the over for next page blogs display
      const blogs_indexed_to_remove = new Set([0, 1, 2, 3]);
      remaining_unrendered_blogs = filtered_blog_tag_data.filter(
        (_, index) => !blogs_indexed_to_remove.has(index),
      );
    }
  }
});

//retrun to home blogs away from next page blog
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest("#blog_hero_lft_rtrntohmblogsg_btn");
  if (el) {
    el.style.display = "none";
    blog_getelem("blog_hero_lft_nxtpgpopupbtn_pnl").innerHTML =
      `<button id="blog_hero_lft_nxtpgpopupbtn" >Next Page</button>`;
    /*     next_pg_blogs_fuc(remaining_unrendered_blogs); */

    main_blog_crd_render_fuc();
  }
});

//search blog
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest(".quklnksbrf_sclsicns");
  if (el) {
    const srchd_ttl = blog_getelem("blog_hero_rght_poplrtags_srch").value;
    console.log(srchd_ttl);
    if (srchd_ttl) {
      const data = await blog_request("/api/srchddataapi", "POST", {
        srchd_ttl: srchd_ttl,
      });
      //main blogs
      //err data
      if (data.erMgs) {
        blog_getelem("blog_hero_lft").innerHTML = `
      <div class="blog_hero_lft_errpnl"> <div class="blog_hero_lft_errpnl_cntnts"> 
      <div class="blog_hero_lft_errpnl_img"><img width="70" src="dist/imgs/not_found_thumbmg.webp" alt=""></div>
      <p class="blog_hero_lft_errpnl_txt"> ${data.erMgs}</p></div></div>
      `;
      } else if (data.blog_data) {
        //good data
        console.log(
          "leghttttttttttttttttttttttttttttttt",
          data.blog_data.length,
        );
        const reusable_crds_redner_data = data.blog_data;
        const reusable_crds_redner = () => {
          blog_getelem("blog_hero_lft_nxtpgpopupbtn_pnl").innerHTML =
            `<div id="blog_hero_lft_nxtpgpopupbtn">Next Page</div>`;

          const temp = (arg_data) => {
            blog_getelem("blog_hero_lft").innerHTML = "";
            /*       const actual_length = arg_data */
            let calculated_loop = 4;
            if (arg_data.length <= 4) {
              calculated_loop = arg_data.length;
            }
            for (let i = 0; i < calculated_loop; i++) {
              console.log("arg_data: ", arg_data);
              //tag cards
              //THSE EG LESS THAN 3 SHOW ERR FIX BY ONLY LOOP FOR THOSE
              const tagsObj = arg_data[i].data.blog_tags;
              const tagsHTML = Object.values(tagsObj)
                .map(
                  (tag) =>
                    `<button class="blog_hero_lft_crdmain_info_top_crdcl">${tag}</button>`,
                )
                .join("");
              //main card
              const e = document.createElement("div");
              e.className = "blog_hero_lft_crdmain_ldngcrd_cntnr";
              e.dataset.blog_tag = arg_data[i].id;
              e.innerHTML = ` <div class="blog_hero_lft_crd">
          <div class="blog_hero_lft_crdhandle" data->${arg_data[i].date}</div>
          <div class="blog_hero_lft_crdmain">
            <div class="blog_hero_lft_crdmain_thumbimg"></div>
            <div class="blog_hero_lft_crdmain_info">
              <p class="blog_hero_lft_crdmain_info_ttl">${arg_data[i].data.title}</p>
              <p class="blog_hero_lft_crdmain_info_dscrptn">${arg_data[i].data.descrption}</p>
              <br />
              <div class="blog_hero_lft_crdmain_info_top">${tagsHTML}</div>

            </div>
          </div>
        </div>`;
              blog_getelem("blog_hero_lft").appendChild(e);
            }
          };
          const arg_data = reusable_crds_redner_data;
          if (reusable_crds_redner_data.length <= 4) {
            console.log("less", reusable_crds_redner_data.length);
            console.log(
              "reusable_crds_redner_dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
              arg_data,
            );
            temp(arg_data);
            blog_getelem("blog_hero_lft_nxtpgpopupbtn_pnl").innerHTML =
              `<button id="blog_hero_lft_rtrntohmblogsg_btn" >Home Blogs</button>`;
            blog_getelem("blog_hero_lft_rtrntohmblogsg_btn").style.display =
              "block";
          } else {
            console.log("great", reusable_crds_redner_data.length);
            //remove first 4 blogs coz they being rendered, the rest pass the over for next page blogs display
            const blogs_indexed_to_remove = new Set([0, 1, 2, 3]);
            remaining_unrendered_blogs = reusable_crds_redner_data.filter(
              (_, index) => !blogs_indexed_to_remove.has(index),
            );
            blog_getelem("blog_hero_lft_nxtpgpopupbtn").style.display = "block";
            console.log(
              "reusable_crds_redner_dataatttttttttttttttttttttttttttttttttttt",
              arg_data,
            );
            temp(arg_data);
            next_pg_blogs_fuc = temp;
          }
        };
        reusable_crds_redner();
      } else {
        // default
        blog_getelem("blog_hero_lft").innerHTML = `
      <div class="blog_hero_lft_errpnl"> <div class="blog_hero_lft_errpnl_cntnts"> 
      <div class="blog_hero_lft_errpnl_img"><img class="ldngicn" width="70" src="dist/imgs/search_failed_thumbmg.webp" alt=""></div>
      <p class="blog_hero_lft_errpnl_txt">Unable to search blog.</p></div></div>
      `;
      }
    } else {
      blog_getelem("blog_hero_lft").innerHTML = `
      <div class="blog_hero_lft_errpnl"> <div class="blog_hero_lft_errpnl_cntnts"> 
      <div class="blog_hero_lft_errpnl_img"><img width="70" src="dist/imgs/not_found_thumbmg.webp" alt=""></div>
      <p class="blog_hero_lft_errpnl_txt">Search field is empty</p></div></div>
      `;
    }
  }
});

//side blogs
(async () => {
  const data = await blog_request("/api/blogdataapi", "GET");
  blog_getelem("blog_hero_rght_rcnttpostspnl").innerHTML = `
 <div id="blog_hero_rght_rcnttpostspnl_spnnrspnl"><div id="spnrpnl"><span><img class="ldngicn" width="20" src="dist/icons/loading.svg" alt=""></span></div></div>
  `;
  if (data) {
    const items = data.blog_data;
    const top3Latest = [...items]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);
    top3Latest_obj = top3Latest;
    blog_getelem("blog_hero_rght_rcnttpostspnl").innerHTML = "";
    for (let i = 0; i < top3Latest.length; i++) {
      console.log(
        "taaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaag",
        top3Latest[i].id,
      );
      const e = document.createElement("div");
      e.className = "blog_hero_rght_rcnttposts_crd";
      e.dataset.blog_tag = top3Latest[i].id;
      e.innerHTML = `
            <div class="blog_hero_rght_rcnttposts_crd_thumbimg"></div>
            <div class="blog_hero_rght_rcnttposts_crd_info">
              <p class="blog_hero_rght_rcnttposts_crd_info_ttl">${top3Latest[i].data.title}</p>
              <p class="blog_hero_rght_rcnttposts_crd_info_dscrptn">${top3Latest[i].data.descrption}</p>
              <p class="blog_hero_rght_rcnttposts_crd_info_date">${top3Latest[i].date}</p>
    `;
      blog_getelem("blog_hero_rght_rcnttpostspnl").appendChild(e);
    }

    console.log(top3Latest);
    console.log("for side menu", data.blog_data);
  }
})();

//display side blogs contents
document.body.addEventListener("click", async (e) => {
  const el2 = e.target.closest(".blog_hero_rght_rcnttposts_crd");

  const display_blog_contents_fuc = (elem, data_obj_for_display) => {
    const selected_blog = data_obj_for_display.find(
      (item) => item.id === elem.dataset.blog_tag,
    );
    if (selected_blog) {
      blog_getelem("blog_hero_lft").innerHTML = "";

      const { title, blog_tags, ...contentOnly } = selected_blog.data;
      const tagsHTML = Object.values(contentOnly)
        .map((tag) => `<p>${tag}</p>`)
        .join("");
      const e = document.createElement("div");
      e.className = "blog_hero_lft_crdmain_selectedcrd";
      e.innerHTML = `
         <div  id="blog_hero_lft_crdmain_selectedcrd_topbnnr">
         <p id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ttl">${selected_blog.data.title}</p>
         <div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr">
         <div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft"><div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_prflimg"></div><p>${selected_blog.uploaded_by}</p><div class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_circle"></div><p>${selected_blog.date} - ${selected_blog.time}</p></div>
          <button id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btn">
          <div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu">
          <p id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_sclsttl">Share Blog</p>
          <div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls">
          <img class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn" width="15" src="dist/icons/facebook.svg" alt="">
          <img class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn"width="15" src="dist/icons/instagram.svg" alt="">
          <img class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn" width="15" src="dist/icons/linkedin.svg" alt="">
          <img class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn" width="15" src="dist/icons/behance.svg" alt="">
          </div>
          </div>
          <img
            id="cntntsicn"
            src="dist/icons/dots.svg"
            class="bnnricons"
            width="25"
          /></button>
          </div>
         </div>
         </div>
         <div id="blog_hero_lft_crdmain_selectedcrd_thumbimg"></div>
         <div id="blog_hero_lft_crdmain_selectedcrd_info">
         ${tagsHTML}
         </div>
         </br>
         <div id="blog_hero_lft_crdmain_selectedcrd_info_endnote">
         <p class="blog_hero_lft_crdmain_selectedcrd_info_endnote_lnkscl"><img width="11" src="dist/icons/likes.svg" alt=""><span>0</span>Likes</p>
         <p class="blog_hero_lft_crdmain_selectedcrd_info_endnote_lnkscl"><img width="11" src="dist/icons/comments.svg" alt=""><span>0</span>Coments</p>
         <p class="blog_hero_lft_crdmain_selectedcrd_info_endnote_lnkscl"><img width="11" src="dist/icons/share.svg" alt=""><span>0</span>Shares</p>
         </div>
         </br></br>
         <div id="blog_hero_lft_crdmain_selectedcrd_info_endnote_rtnhm_btn_pnl">
         <button id="blog_hero_lft_crdmain_selectedcrd_info_endnote_rtnhm_btn">Home Blogs</button>
         </div>
        `;
      elem_temp = e;
      blog_getelem("blog_hero_lft").appendChild(e);
    }
  };

  if (el2) {
    display_blog_contents_fuc(el2, top3Latest_obj);
  }
});

//Mobile colapse contents
const mobileQuery = window.matchMedia("(max-width: 576px)");
const mobile_callapsable_contents_fuc = (e) => {
  if (e.matches) {
    //navibar drop down menu
    const el1 = blog_getelem("blog_hero_rght_txt_srchttl");
    const el2 = blog_getelem("blog_hero_rght_poplrtags_srchpnl");
    const el3 = blog_getelem("blog_hero_rght_txt_pplrblgtgsttl");
    const el4 = blog_getelem("blog_hero_rght_poplrtagspnl");
    console.log("changed", el1, el2, el3, el4);
    const e_array = [el1, el2, el3, el4];
    for (let i = 0; i < e_array.length; i++) {
      blog_getelem(
        "blog_navbar_rghtmenubtn_drpdwnmenu_insrtcntnts",
      ).appendChild(e_array[i]);
    }

    //media elements
    const media_el1 = blog_getelem("blog_hero_rght_txt_rcntblgspstttl");
    const media_el2 = blog_getelem("blog_hero_rght_rcnttpostspnl");
    const t = [media_el1, media_el2];
    const e = document.createElement("div");
    e.className = "media_query_section_cntnts";
    for (let i = 0; i < t.length; i++) {
      console.log("tttttttttttttttttttttttttttttttttttttttttt", t[i]);
      blog_getelem("media_query_section").appendChild(t[i]);
      blog_getelem("blog_hero_rght_promcrd").style.display = "none";
    }
  }
  if (!e.matches) {
    //navibar drop down menu
    const el1 = blog_getelem("blog_hero_rght_txt_srchttl");
    const el2 = blog_getelem("blog_hero_rght_poplrtags_srchpnl");
    const el3 = blog_getelem("blog_hero_rght_txt_pplrblgtgsttl");
    const el4 = blog_getelem("blog_hero_rght_poplrtagspnl");
    //media elements
    const media_el1 = blog_getelem("blog_hero_rght_txt_rcntblgspstttl");
    const media_el2 = blog_getelem("blog_hero_rght_rcnttpostspnl");
    const media_el3 = blog_getelem("blog_hero_rght_promcrd");

    const t = [el1, el2, el3, el4, media_el1, media_el2, media_el3];
    console.log("tttttttttttt: ", t);
    const e = document.createElement("div");
    e.className = "media_query_section_cntnts";
    for (let i = 0; i < t.length; i++) {
      console.log("tttttttttttttttttttttttttttttttttttttttttt", t[i]);
      blog_getelem("blog_hero_rght").appendChild(t[i]);
    }
    blog_getelem("blog_hero_rght_promcrd").style.display = "block";
  }
};
//based on chnage
mobileQuery.addEventListener("change", mobile_callapsable_contents_fuc);
mobile_callapsable_contents_fuc(mobileQuery);

//close blog drop down menu
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest("#blog_navbar_rghtmenubtn");
  if (el) {
    blog_getelem("blog_navbar_rghtmenubtn_drpdwnmenu_pnl").style.display =
      "block";
  }
});
//close blog drop down menu
document.body.addEventListener("click", async (e) => {
  const el = e.target.closest("#blog_navbar_rghtmenubtn_drpdwnmenu_clsbtn");
  if (el) {
    blog_getelem("blog_navbar_rghtmenubtn_drpdwnmenu_pnl").style.display =
      "none";
  }
});

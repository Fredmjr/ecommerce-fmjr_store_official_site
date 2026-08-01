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
  if (el) {
    console.log(el.dataset.blog_tag);
    console.log(external_blog_data_obj);
    const selected_blog = external_blog_data_obj.blog_data.find(
      (item) => item.id === el.dataset.blog_tag,
    );

    console.log(selected_blog);
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
         <p class="blog_hero_lft_crdmain_selectedcrd_info_endnote_lnkscl"><img class="ldngicn" width="11" src="dist/icons/likes.svg" alt=""><span>0</span>Likes</p>
         <p class="blog_hero_lft_crdmain_selectedcrd_info_endnote_lnkscl"><img class="ldngicn" width="11" src="dist/icons/comments.svg" alt=""><span>0</span>Coments</p>
         <p class="blog_hero_lft_crdmain_selectedcrd_info_endnote_lnkscl"><img class="ldngicn" width="11" src="dist/icons/share.svg" alt=""><span>0</span>Shares</p>
         </div>
         </br></br>
         <div id="blog_hero_lft_crdmain_selectedcrd_info_endnote_rtnhm_btn_pnl">
         <button id="blog_hero_lft_crdmain_selectedcrd_info_endnote_rtnhm_btn">Home Blogs</button>
         </div>
        `;
      elem_temp = e;
      blog_getelem("blog_hero_lft").appendChild(e);
    }
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

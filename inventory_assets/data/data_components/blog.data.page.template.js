export const dynamic_blog_data_page_fuc = (
  blog_ttl,
  upldr_nm,
  date_time,
  blog_img,
  actual_data_info,
) => {
  const tagsHTML = Object.values(actual_data_info)
    .map((tag) => `<p>${tag}</p>`)
    .join("");

  const dynamic_blog_data_page_data = `
    <html><head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">


    <link rel="apple-touch-icon" sizes="180x180" href="https://guest.alwaysdata.net/assets/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="https://guest.alwaysdata.net/assets/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="https://guest.alwaysdata.net/assets/favicon/favicon-16x16.png">
    <link rel="manifest" href="https://guest.alwaysdata.net/assets/favicon/site.webmanifest">

    <meta name="msapplication-TileImage" content="/mstile-144x144.png">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="keywords" content="torrent">
    <meta name="description" content="A centralized place for Graphics, Web &amp; Desktop App
Development Services, Crash &amp; Normal Course Classes,
Books on Sale, Digital Art, and many more.">
    <meta name="subject" content="Online Store">
    <meta name="og:url" content="https://fmjrstores/">
    <meta name="og:title" content="fmjr_stores">
    <meta name="DC.title" content="fmjr_stores">
    <meta name="author" content="fmjr_stores">
    <meta name="og:image" content="https://guest.alwaysdata.net/assets/logos/fmjr_stores.png">
    <meta name="og:description" content="A centralized place for Graphics, Web &amp; Desktop App
Development Services, Crash &amp; Normal Course Classes,
Books on Sale, Digital Art, and many more.">
    <meta name="og:site_name" content="fmjr_stores">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="robots" content="index,follow">
    <link href="https://guest.alwaysdata.net/dist/css/blog.css" rel="stylesheet">
    <link href="https://guest.alwaysdata.net/dist/css/anima.css" rel="stylesheet">
    <title>fmjr_stores</title>
  </head>
  <body>
    <div id="blg_bnnr"></div>
    
    
    <div id="vst_store_bnnr"><button id="vst_store_bnnr_btn">
        <span><img id="vst_store_bnnr_btn_icn" src="https://guest.alwaysdata.net/dist/icons/long_back_arrow.svg" width="15" class="app-icon"></span>Check out Store</button></div>

    <div id="shared_m">
    <div id="shared_m_cntnts">
      <p id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ttl">${blog_ttl}</p>
        <div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr">
            <div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft"><div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_prflimg"><img class="fmjr_stores_default_thumbnail" src="https://guest.alwaysdata.net/dist/imgs/fmjr_stores%20default%20thumbnail%20v7.webp" alt=""></div><p>${upldr_nm}</p><div class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_circle"></div><p>${date_time}</p></div>
              <button id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btn">
              <div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu" style="display: none;">
              <p id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_sclsttl">Share Blog</p>
              <div id="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls">
              <img class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn" width="15" src="https://guest.alwaysdata.net/dist/icons/facebook.svg" alt="">
              <img class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn" width="15" src="https://guest.alwaysdata.net/dist/icons/instagram.svg" alt="">
              <img class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn" width="15" src="https://guest.alwaysdata.net/dist/icons/linkedin.svg" alt="">
              <img class="blog_hero_lft_crdmain_selectedcrd_topbnnr_ftr_lft_btndrpdwnmenu_scls_icn" width="15" src="https://guest.alwaysdata.net/dist/icons/behance.svg" alt="">
              </div>
              </div>
              </button></div>
              <div id="blog_hero_lft_crdmain_selectedcrd_thumbimg"><img class="fmjr_stores_default_thumbnail" src="${blog_img}" alt=""></div>
              <div id="blog_hero_lft_crdmain_selectedcrd_info">${tagsHTML}</div>
              <div id="blog_hero_lft_crdmain_selectedcrd_info_endnote">
            <p class="blog_hero_lft_crdmain_selectedcrd_info_endnote_lnkscl"><img width="11" src="https://guest.alwaysdata.net/dist/icons/likes.svg" alt=""><span>0</span>Likes</p>
            <p class="blog_hero_lft_crdmain_selectedcrd_info_endnote_lnkscl"><img width="11" src="https://guest.alwaysdata.net/dist/icons/comments.svg" alt=""><span>0</span>Coments</p>
            <p class="blog_hero_lft_crdmain_selectedcrd_info_endnote_lnkscl"><img width="11" src="https://guest.alwaysdata.net/dist/icons/share.svg" alt=""><span>0</span>Shares</p>
            </div>

              
    </div>
    </div>

    <div id="shared_media_query_section"><div id="shared_m_cntnts_hero_todayspecial2">
        <div id="shared_m_cntnts_hero_todayspecialcrd2">
          <div id="hero_todayspecialcrd2rlft">
            <div id="hero_todayspecialcrd2rlftpricstag">
              9%
              <br>
              <p id="hero_todayspecialcrdpricstagoff">OFF</p>
            </div>
            <img id="hero_todayspecialcrd2rlftimg" src="https://guest.alwaysdata.net/dist/imgs/graphics_design_crash_course_v2.webp" alt="graphics_design_crash_course">
          </div>
          <div id="hero_todayspecialcrd2rght">
            <div id="hero_todayspecialcrd2rghttop">
              <p id="hero_todayspecialcrd2rghtttl">Graphics Design Crash Class</p>
              <p id="hero_todayspecialcrd2rghtdscrptn">Start coding your future
                today. Master front-end and back-end skills.</p>
            </div>

            <button id="hero_todayspecialcrd2rghtBtn">Enroll Now</button>
          </div>

        </div>
      </div></div>
    

  <script src="https://guest.alwaysdata.net/src/js/blog.share/blog.share.js"></script>
</body></html>
    `;
  return dynamic_blog_data_page_data;
};

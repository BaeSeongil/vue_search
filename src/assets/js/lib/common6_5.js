$(document).ready(function () {
  // $("#scroll-line").mCustomScrollbar({
  //     theme:'minimal-dark',
  // });
  // $('.dwp-depth-open').on('click',function(){
  //     $(this).toggleClass('active');
  //     $(this).parent('.dwp-lnb-item').parent('.dwp-lnb-depth2').toggleClass('active');
  // });
  // $('.dwp-lnb-item02').on('click',function(){
  //     $(this).addClass('selected');
  //     $(this).siblings('.dwp-lnb-item02').removeClass('selected');
  //     $(this).parent('.dwp-lnb-depth2').siblings('.dwp-lnb-depth2').find('.dwp-lnb-item02').removeClass('selected');
  //     $(this).parent('.dwp-lnb-depth3').siblings('.dwp-lnb-item02').removeClass('selected');
  // });
  // var swiper = new Swiper('.msg_bn', {
  //     direction: 'vertical',
  //     loop: true,
  //     centeredSlides: true,
  //     autoplay: {
  //         delay: 6000,
  //         disableOnInteraction: false,
  //     },
  // });
  // $('.icon_search').on('click',function(){
  //     $('.dwp_search_grouping').addClass('active');
  // });
  // $('.arrow_back').on('click',function(){
  //     $('.dwp_search_grouping').removeClass('active');
  // });
  // $('.icon_btn_excel').on('click',function(){
  //     $('.excel_pop').addClass('active');
  // });
  // $('.btn_save , .btn_cancel ,.modal_close').on('click',function(){
  //     $('.modal_pop').removeClass('active');
  // });
  // $('.icon_setting').on('click',function(){
  //     $('.viewsetting_pop').addClass('active');
  // });
  // $('.items_line .dwp_btn').on('click',function(){
  //     $(this).addClass('active');
  //     $(this).siblings('.dwp_btn').removeClass('active');
  // });
  // $('.folder_ic').on('click',function(){
  //     $(this).toggleClass('active');
  //     $(this).parents('.tree_box').toggleClass('active');
  //     $(this).parents('.tree_box').siblings('.treebox_list').toggleClass('open');
  //     $(this).parents('.tree_items').siblings('.tree_items').find('.treebox_list').removeClass('open');
  //     $(this).parents('.tree_items').siblings('.tree_items').find('.tree_box').removeClass('active');
  //     $(this).parents('.tree_items').siblings('.tree_items').find('.folder_ic').removeClass('active');
  // });
  // $('.folder_txt').on('click',function(){
  //     $(this).parents('.tree_box').toggleClass('active');
  //     $(this).parents('.tree_items').siblings('.tree_items').find('.tree_box').removeClass('active');
  //     $(this).siblings('.folder_ic').toggleClass('active');
  //     $(this).parents('.tree_items').siblings('.tree_items').removeClass('active');
  //     $(this).parents('.tree_items').siblings('.tree_items').find('.folder_ic').removeClass('active');
  //     $(this).parents('.treebox_list').siblings('.tree_box').find('.folder_ic').removeClass('active');
  //     $(this).parents('.treebox_list').siblings('.tree_box').removeClass('active');
  // });
  // $('.tree_items.depth2 > .tree_box .folder_txt').on('click', function () {
  //     $(this).parents('.tree_box').siblings('.treebox_list').toggleClass('open');
  //     $(this).parents('.tree_items').siblings('.tree_items').find('.treebox_list').removeClass('open');
  // });
  // $('.edit_ic').on('click', function (e) {
  //     $(this).parent('.folder_txt').addClass('active');
  //     $(this).parent('.folder_txt').siblings('.folder_edit').addClass('active');
  //     e.stopPropagation();
  // });
  // $('.check_ic').on('click', function () {
  //     $(this).parent('.folder_edit').removeClass('active');
  //     $(this).parent('.folder_edit').siblings('.folder_txt').removeClass('active');
  // });
  // $('.more_ic').on('click', function (e) {
  //     $(this).siblings('.menu_box').toggleClass('active');
  //     e.stopPropagation();
  // });
  // $('.menu_box div').on('click', function () {
  //     $(this).parent('.menu_box').removeClass('active');
  // });
  $(".main_board").on("click", function () {
    $(".alert_pop").addClass("active");
  });
  $(".top_board").on("click", function (e) {
    $(".topboard_pop").addClass("active");
    e.stopPropagation();
  });
  $(".add_category").on("click", function (e) {
    $(".addcategory_pop").addClass("active");
    e.stopPropagation();
  });
  $(".bd_name").on("click", function (e) {
    $(".bdname_pop").addClass("active");
    e.stopPropagation();
  });
  $(".toggle_btn").on("click", function () {
    $(this).toggleClass("active");
  });
  $(".w_com").on("click", function () {
    $(this).parent(".sub_btns").siblings(".in_box02").toggleClass("active");
  });
  $(".v_com").on("click", function () {
    $(this)
      .parent(".sub_btns")
      .siblings(".dep1_com_line02")
      .toggleClass("active");
  });
  $(".like_ic").on("click", function () {
    $(this).toggleClass("active");
  });
  // $('.icon_list .more_ic').on('click', function (e) {
  //     $(this).find('.menu_box').toggleClass('active');
  //     e.stopPropagation();
  // });
  // $('body').click(function () {
  //     $('.menu_box').removeClass('active');
  // });
  $(".icon_btn_slide").on("click", function (e) {
    $(".video_pop").addClass("active");
    e.stopPropagation();
  });
  $(".slide_close").on("click", function () {
    $(".video_pop").removeClass("active");
  });
  // var swiper = new Swiper(".video_swiper2", {
  //     loop: true,
  //     spaceBetween: 10,
  //     slidesPerView: 11,
  //     freeMode: true,
  //     watchSlidesProgress: true,
  //     breakpoints: {
  //         1366: {
  //             slidesPerView: 6,
  //         },
  //         1499: {
  //             slidesPerView: 8,
  //         },
  //         1500: {
  //             slidesPerView: 11,
  //         },
  //     },
  // });
  // var swiper2 = new Swiper(".video_swiper", {
  //     loop: true,
  //     spaceBetween: 10,
  //     freeMode: true,
  //     navigation: {
  //         nextEl: ".swiper-button-next",
  //         prevEl: ".swiper-button-prev",
  //     },
  //     pagination: {
  //         el: ".swiper-pagination",
  //         type: "fraction",
  //     },
  //     thumbs: {
  //         swiper: swiper,
  //     },
  // });
  // 조직도 POP
  $(".tree-container li .t1").on("click", function () {
    $(this).toggleClass("active");
  });
  $(".tree_dep .t1").on("click", function () {
    $(this).siblings(".tree_dep2").toggleClass("active");
    $(this).find(".tree-expander").toggleClass("active");
  });
  $(".organ_c").on("click", function () {
    $(this).parent("li").css("display", "none");
  });
  $(".add").on("click", function () {
    $(".ri_inner li").css("display", "block");
  });
  $(".remove").on("click", function () {
    $(this).parent("li").css("display", "none");
  });
  $(".all_remove").on("click", function () {
    $(".ri_inner li").css("display", "none");
  });
  $(".s_bar").on("click", function () {
    $(".organ_list").toggleClass("active");
  });
  //
  $(".clip").on("click", function () {
    $(".attach_pop").addClass("active");
  });
});

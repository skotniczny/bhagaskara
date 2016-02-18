$(function() {
  // Hamburger Menu
  $mainMenu = $(".main-menu");
  $mainMenu.addClass("hidden");

  $("#hamburger").on("click", function(e) {
    e.preventDefault();
    $mainMenu.toggleClass("hidden");
  });

  // Sticky navigation
  var $pageNav = $("#nav");
  var navigationOffset = $pageNav.offset();

  $(window).scroll(function() {
    if ($(window).scrollTop() > navigationOffset.top) {
      $pageNav.addClass("sticky");
    } else{
      $pageNav.removeClass("sticky");
    }
  });

  // Blog section slider
  function slideTo(index) {
    var slidePosition = index * parseInt(blogItemWidth);
    var left = -slidePosition;
    $(".blog .slider-stripe").animate({"left": left});
  }

  var blogItemWidth = $(".blog .slider-mask").css("width");
  var blogSliderItems = $(".blog .slider-item");

  blogSliderItems.css({"width": blogItemWidth});

  var stripeWidth = blogSliderItems.length * parseInt(blogItemWidth);
  console.log(stripeWidth);
  
  $(".blog .slider-stripe").css({"width": stripeWidth}); 

  $(window).resize(function() {
    blogItemWidth = $(".blog .slider-mask").css("width");
    blogSliderItems.css({"width": blogItemWidth});

    stripeWidth = blogSliderItems.length * parseInt(blogItemWidth);
    $(".blog .slider-stripe").css({"width": stripeWidth});

    var activeItem = $(".slider-indicators").find(".active");
    var itemIndex = $(".slider-indicators li").index(activeItem);
    slideTo(itemIndex);
  });

  $(".slider-indicators").on("click", "li", function(event) {
    event.preventDefault();
    $(this).addClass("active").siblings().removeClass("active");
    var itemIndex = $(this).index();
    slideTo(itemIndex);
  });
  
  // var idx = 1;
  // var intervalId = setInterval(function() {
  //   $(".slider-indicators").find("li").eq(idx).click();
  //   idx = (idx < 5) ? idx += 1 : 0;
  //   console.log(idx);
  // }, 3000);

  // Portfolio filtering
  function filterPortfolio(event) {
    $("button.active").removeClass("active");
    $(this).addClass("active");
    
    var targetId = event.target.id;

    $(".portfolio .row div").each(function() {
      var $this = $(this);
      $this.addClass("hidden");
      if (targetId == $this.data("cat") || targetId == "all") {
        $this.removeClass("hidden");
      }
    });
  }

  $(".filter-buttons").on("click", "button", filterPortfolio);

  // Smooth scroll
  $('a[href*=#]:not([href^=#post])').click(function(){
    $('html, body').animate({
        'scrollTop': $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
  });
});

document.addEventListener("DOMContentLoaded", function() {
  function _(selector) {
    return (selector.charAt(0) == "#") ? document.querySelector(selector) : document.querySelectorAll(selector);
  }

  // Slajder sekcji zespół

  var slideNo = 0;
  var teamSliderItems = $(".team .slider-item");
  var slideLen = teamSliderItems.length - 1;
  // console.log($(".team .slider-mask").css("width"));
  var teamItemWidth = parseInt($(".slider-mask").css("width")) / 3;
  teamSliderItems.css({"width": teamItemWidth});
  var teamStripeWidth = teamSliderItems.length * parseInt(teamItemWidth);
  $(".team .slider-stripe").css({"width": teamStripeWidth}); 


  $(".slider-nav").on("click", ".arrow", function(event) {
    event.preventDefault();
    // console.log(event);
    if ($(this).hasClass("left")) {
      if (slideNo > 0) {
        slideNo -= 1;
        console.log("left");
        $(".team .slider-stripe").animate({"left": "+=400px"});
      } else {
        slideNo = 2;
        $(".team .slider-stripe").animate({"left": "-=800px"});
      }
    }

    if ($(this).hasClass("right")) {
      if (slideNo < slideLen - 2) {
        slideNo += 1;
        console.log("right");
        $(".team .slider-stripe").animate({"left": "-=400px"});
      } else {
        slideNo = 0;
        $(".team .slider-stripe").animate({"left": "+=800px"});
      }
    }
    console.log(slideNo, slideLen);
  });

  // Slajder sekcji blog

  // function slideTo(index) {
  //   var slidePosition = index * parseInt(blogItemWidth);
  //   var left = -slidePosition;
  //   $(".blog .slider-stripe").animate({"left": left});
  // }

  // var blogItemWidth = $(".blog .slider-mask").css("width");
  // console.log(blogItemWidth);

  // var blogSliderItems = $(".blog .slider-item");
  // console.log(blogSliderItems);

  // blogSliderItems.css({"width": blogItemWidth});
  // console.log(blogSliderItems.length);

  // var stripeWidth = blogSliderItems.length * parseInt(blogItemWidth);
  // console.log(stripeWidth);
  
  // $(".blog .slider-stripe").css({"width": stripeWidth}); 

  // $(window).resize(function() {
  //   blogItemWidth = $(".blog .slider-mask").css("width");
  //   blogSliderItems.css({"width": blogItemWidth});

  //   stripeWidth = blogSliderItems.length * parseInt(blogItemWidth);
  //   $(".blog .slider-stripe").css({"width": stripeWidth});

  //   var activeItem = $(".slider-indicators").find(".active");
  //   var itemIndex = $(".slider-indicators li").index(activeItem);
  //   slideTo(itemIndex);
  // });

  // $(".slider-indicators").on("click", "li", function(event) {
  //   event.preventDefault();
  //   $(this).addClass("active").siblings().removeClass("active");
  //   var itemIndex = $(this).index();
  //   slideTo(itemIndex);
  // });
  
  // var idx = 1;
  // var intervalId = setInterval(function() {
  //   $(".slider-indicators").find("li").eq(idx).click();
  //   idx = (idx < 5) ? idx += 1 : 0;
  //   console.log(idx);
  // }, 3000);

}, false);
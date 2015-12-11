document.addEventListener("DOMContentLoaded", function() {
  function _(selector) {
    return (selector.charAt(0) == "#") ? document.querySelector(selector) : document.querySelectorAll(selector);
  }

  var menu = _(".main-menu")[0];
  menu.classList.add('hidden');

  var btn = _("#hamburger");
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    this.parentElement.nextElementSibling.classList.toggle("hidden");
  }, false);

  // Przyklejanie nawigacji
  var navigationOffset = $("#nav").offset();

  $(window).scroll(function() {
    if ($(window).scrollTop() > navigationOffset.top){  
      $("#nav").addClass("sticky");
    } else{
      $("#nav").removeClass("sticky");
    }
  });

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

  function slideTo(index) {
    var slidePosition = index * parseInt(itemWidth);
    var left = -slidePosition;
    $(".slider-stripe").animate({"left": left});
  }

  var itemWidth = $(".blog .slider-mask").css("width");
  console.log(itemWidth);
  var sliderItems = $(".blog .slider-item");
  console.log(sliderItems);
  sliderItems.css({"width": itemWidth});
  console.log(sliderItems.length);
  var stripeWidth = sliderItems.length * parseInt(itemWidth);
  console.log(stripeWidth);
  $(".blog .slider-stripe").css({"width": stripeWidth}); 

  $(window).resize(function() {
    itemWidth = $(".slider-mask").css("width");
    sliderItems.css({"width": itemWidth});

    stripeWidth = sliderItems.length * parseInt(itemWidth);
    $(".slider-stripe").css({"width": stripeWidth});

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

  // Filtrowanie portfolio

  var allBtn = _("#all");
  var webBtn = _("#web");
  var appsBtn = _("#apps");
  var iconsBtn = _("#icons");

  function filterPortfolio(event) {
    if(_("button.active")[0]) {
      _("button.active")[0].classList.remove("active");
    }
    this.classList.add("active");
    var portfolioElms = _(".portfolio .row div");
    var filter = event.target.id;
    for (var i = 0; i < portfolioElms.length; i++) {
      portfolioElms[i].classList.remove("hidden");
      var elmData = portfolioElms[i].getAttribute("data-cat");
      // console.log(filter, elmData);
      if (filter !== elmData && filter !== "all") {
        portfolioElms[i].classList.add("hidden");
      }
    }
  }

  allBtn.addEventListener("click", filterPortfolio, false);
  webBtn.addEventListener("click", filterPortfolio, false);
  appsBtn.addEventListener("click", filterPortfolio, false);
  iconsBtn.addEventListener("click", filterPortfolio, false);

  // Płynny scroll

  $('a[href*=#]:not([href^=#post])').click(function(){
    $('html, body').animate({
        'scrollTop': $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
  });

}, false);
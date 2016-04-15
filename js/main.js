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

  // Progres bars
  $(".progress-bar").each(function() {
    $this = $(this);
    var $progressBarTitle = $this.prev().find("span");
    var $bar = $this.find("span");
    var percent = $bar[0].style.width;

    $progressBarTitle.text("0%");
    $bar.attr("style", "width: 0%");
    
    $this.on("inview", function() {
      $bar.animate({
        width: percent
      }, {
        duration: 1500,
        step: function(now) {
          $progressBarTitle.text(Math.round(now) + "%");
        }
      });
    });
  });

  // Counters
  $(".counter").each(function() {
    $this = $(this);
    var $number = $this.find("span");
    var value = $number.text();
    $number.text("0");
    $this.one("inview", function() {
      $({
        count: 0
      }).animate({
        count: value
      }, {
        duration: 1500,
        step: function(now) {
          if (value.slice(-1) == "%") {
            $number.text(Math.round(now) + "%");
          } else {
            $number.text(Math.round(now));
          }
        }
      });
    });
  });

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
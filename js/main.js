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

  // Slajder sekcji blog

  function slideTo(index) {
    var slidePosition = index * parseInt(itemWidth);
    var left = -slidePosition;
    $(".slider-stripe").animate({"left": left});
  }

  var itemWidth = $(".slider-mask").css("width");
  var stripeWidth = $(".slider-item").length * parseInt(innerWidth);
  $(".slider-stripe").css({"width": stripeWidth}); 

  $(window).resize(function() {
    itemWidth = $(".slider-mask").css("width");
    $(".slider-item").css({"width": itemWidth});

    stripeWidth = $(".slider-item").length * parseInt(innerWidth);
    $(".slider-stripe").css({"width": stripeWidth});

    var activeItem = $(".slider-indicators").find(".active");
    var itemIndex = $(".slider-indicators li").index(activeItem);
    slideTo(itemIndex);
  });

  $(".slider-indicators").on("click", "li", function(event) {
    $(this).addClass("active").siblings().removeClass("active");
    var itemIndex = $(this).index();
    slideTo(itemIndex);
  });
}, false);
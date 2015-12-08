document.addEventListener("DOMContentLoaded", function() {
  function $(selector) {
    return (selector.charAt(0) == "#") ? document.querySelector(selector) : document.querySelectorAll(selector);
  }

  var menu = $(".main-menu")[0];
  menu.classList.add('hidden');

  var btn = $("#hamburger");
  btn.addEventListener("click", function(e) {
    e.preventDefault();
    this.parentElement.nextElementSibling.classList.toggle("hidden");
  }, false);

  var allBtn = $("#all");
  var webBtn = $("#web");
  var appsBtn = $("#apps");
  var iconsBtn = $("#icons");

  function filterPortfolio(event) {
    if($("button.active")[0]) {
      $("button.active")[0].classList.remove("active");
    }
    this.classList.add("active");
    var portfolioElms = $(".portfolio .row div");
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
}, false);
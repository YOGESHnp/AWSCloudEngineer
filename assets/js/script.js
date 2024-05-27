$(function () {
  // Navbar toggle
  $(".navbar-toggle").click(function () {
    $(this).toggleClass("act");
    if ($(this).hasClass("act")) {
      $(".main-menu").addClass("act");
    } else {
      $(".main-menu").removeClass("act");
    }
  });

  // Page scrolling feature - requires jQuery Easing plugin
  $(document).on("click", ".page-scroll a", function (event) {
    var $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: $($anchor.attr("href")).offset().top,
        },
        1000,
        "easeInOutExpo"
      );
    event.preventDefault();
  });

  // Highlight the top nav as scrolling occurs
  $("body").scrollspy({
    target: ".site-header",
    offset: 10,
  });

  // Progress bar
  var $section = $(".section-skills");
  function loadDaBars() {
    $(".progress .progress-bar").progressbar({
      transition_delay: 500,
    });
  }

  $(document).bind("scroll", function (ev) {
    var scrollOffset = $(document).scrollTop();
    var containerOffset = $section.offset().top - window.innerHeight;
    if (scrollOffset > containerOffset) {
      loadDaBars();
      // Unbind event not to load scrolls again
      $(document).unbind("scroll");
    }
  });

  // Counters
  if ($(".section-counters .start").length > 0) {
    $(".section-counters .start").each(function () {
      var stat_item = $(this),
        offset = stat_item.offset().top;
      $(window).scroll(function () {
        if (
          $(window).scrollTop() > offset - 1000 &&
          !stat_item.hasClass("counting")
        ) {
          stat_item.addClass("counting");
          stat_item.countTo();
        }
      });
    });
  }

  // Custom callback for counting to infinity
  $("#infinity").data("countToOptions", {
    onComplete: function (value) {
      count.call(this, {
        from: value,
        to: value + 1,
      });
    },
  });

  $("#infinity").each(count);

  function count(options) {
    var $this = $(this);
    options = $.extend({}, options || {}, $this.data("countToOptions") || {});
    $this.countTo(options);
  }

  // Navigation overlay
  var s = skrollr.init({
    forceHeight: false,
    smoothScrolling: false,
    mobileDeceleration: 0.004,
    mobileCheck: function () {
      // Hack - forces mobile version to be off
      return false;
    },
  });

  // Upward arrow functionality
  $("#upward-arrow").click(function (event) {
    event.preventDefault(); // Prevent the default action
    var footer = $("#colophon");

    // Change the footer to absolute positioning
    footer.css("position", "absolute");
    footer.css("bottom", "0");

    // Disable interactions by setting pointer-events to none
    footer.css("pointer-events", "none");
    footer.css("opacity", "0.5"); // Optional: reduce opacity to indicate disabled state
  });
});

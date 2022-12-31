// title animation
(function (a) {
  a.fn.textyleF = function (b) {
    var g = this;
    var d = g.contents();
    var f = { duration: 1000, delay: 150, easing: "ease", callback: null };
    var c = a.extend(f, b);
    d.each(function () {
      var h = a(this);
      if (this.nodeType === 3) {
        e(h);
      }
    });
    function e(h) {
      h.replaceWith(h.text().replace(/(\S)/g, "<span>$1</span>"));
    }
    return this.each(function (h) {
      var j = g.children("span");
      g.css("opacity", 1);
      j.css("display", "inline-block");
      j.each(function (k) {
        a(this)
          .delay(c.delay * k)
          .queue(function (i) {
            a(this).css({
              transform: "rotateY(0deg) rotateX(0deg)",
              opacity: 1,
              transitionDuration: c.duration + "ms",
              transitionTimingFunction: c.easing,
            });
            i();
          });
        if (typeof c.callback === "function") {
          a(this).on("transitionend", function () {
            c.callback.call(this);
          });
        }
      });
    });
  };
})(jQuery);

$(window).on("load", function () {
  $(".ex1").textyleF();
  $(".ex2").textyleF({
    duration: 2000,
    delay: 200,
    easing: "cubic-bezier(0.785, 0.135, 0.15, 0.86)",
    callback: function () {
      $(this).css({
        color: "rgb(248, 111, 94)",
        transition: "1s",
      });
    },
  });
});

//tagline flipper
var jBearGraphics = jBearGraphics || "";

jBearGraphics = (function () {
  var flipText = $(".flip");
  var flipPause = 2500;
  var flipDuration = 500;
  var flipTime = flipText.length * (flipPause + flipDuration);

  var flipping = function () {
    var timer = 0;
    flipText.each(function (index, value) {
      var e = $(this);
      setTimeout(function () {
        e.removeClass("dn").addClass("flipIn");
        setTimeout(function () {
          e.addClass("flipOut").removeClass("flipIn");
        }, flipPause);
        setTimeout(function () {
          e.addClass("dn").removeClass("flipOut");
        }, flipPause + flipDuration);
      }, timer);
      timer += flipDuration + flipPause;
    });
  };

  return {
    init: function () {
      setInterval(flipping, flipTime);
    },
  };
})();

jBearGraphics.init();

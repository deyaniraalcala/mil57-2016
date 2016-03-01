
(function($){
    "use strict";

    // Page loader
    $(window).load(function(){
        $(".page-loader b").stop(true).delay(100).fadeOut();
        $(".page-loader").stop(true).delay(400).fadeOut("slow");
    });
    document.location.hash = "home";
    window.onhashchange = function(){
      var what_to_do = location.href;
      if (what_to_do=="#home")
          show_picture();
    }
    /*$(document).ready(function(){
        $("#work-grid").mixitup({
            effects: ['fade', 'scale', 'rotateY'],
            easing: 'snap'
        });
    });*/
})(jQuery);
function initWorkSlider(){
    (function($){
        "use strict";
        $(".work-full-slider").bxSlider({
            adaptiveHeight: false,
            pager: false,
            controls: true,
            auto: true,
            speed: 1000,
            pause: 5000,
            video: true,
            useCSS: false
        });
        $(".work-full-media").fitVids();
    })(jQuery);
};
// Works expander
$(window).load(function(){
    (function($){
        "use strict";
        // Works slider
        initWorkSlider()
    })(jQuery);
    // Hash change function
    function hash_change(url){
        (function($){
         "use strict";
            var hash_url = "#/" + url.replace(" .work-wrapper", "");
            window.location.hash = hash_url;
        })(jQuery);
    }
    // Open work
  	(function($){
      "use strict";
      window.work_before_scroll = $("#works").scrollTop();
      $(".work-item-link").click(function(){
          $(".wrapper").fadeOut();
          work_before_scroll = $(window).scrollTop();
          $(this).addClass("work-opened");
          $(".work-full").fadeIn(500);
          setTimeout(function(){
              initWorkSlider();
              if (work_before_scroll != 0) {
                  $("html, body").animate({
                      scrollTop: 0
                  }, "fast", "easeOutExpo");
              }
          }, 550);
          var work_url = $(this).attr("href") + ' ' + '.work-wrapper';
          $(".work-full-load").load(work_url, function(){
              $(".work-loader").delay(700).fadeOut(500);
              $(".work-navigation").animate({
                  top: 0
              }, 900, "easeOutCirc");

          });
          hash_change(work_url);
          return false;
      });
  	})(jQuery);
    // All works (close work)
    function close_work(){
        $(".work-full").fadeOut(100);
        $(".work-navigation").animate({
            top: "-60px"
        });
        setTimeout(function(){
            $(".work-full-load").empty();
            $("html, body").animate({
                scrollTop: work_before_scroll + "px"
            }, "fast", "easeOutExpo");
        }, 100);
        setTimeout(function(){
            $(".wrapper").fadeIn(100);
        }, 100);
        work_opened = $(".work-opened");
        work_opened.removeClass("work-opened");
    }
    (function($){
        "use strict";
        $(".work-all").click(function(){
            close_work();
            //Hash change
            window.location.hash = "";
        });
    })(jQuery);
    // Prev work
    function prev_work(){
        $(".work-loader").fadeIn(300);
        var work_prev_url = $(".work-opened").parent().prev(".work-item").find(".work-item-link").attr("href") +
        ' ' +
        '.work-wrapper';
        setTimeout(function(){
            $(".work-full-load").empty().load(work_prev_url, function(){
                initWorkSlider();
                $(".work-loader").delay(200).fadeOut(500);
            });
        }, 500);
        var work_opened = $(".work-opened").parent().prev(".work-item").find(".work-item-link");
        $(".work-item-link").removeClass("work-opened");
        work_opened.addClass("work-opened");
        // If left end of the links
        if ($(".work-opened").parent().is(":first")) {
            work_prev_url = $(".work-item").last().find(".work-item-link").attr("href") +
            ' ' +
            '.work-wrapper';
            setTimeout(function(){
                $(".work-full-load").empty().load(work_prev_url, function(){
                    initWorkSlider();
                    $(".work-loader").delay(200).fadeOut(500);
                });
            }, 500);
            work_opened = $(".work-item").last().find(".work-item-link");
            $(".work-item-link").removeClass("work-opened");
            work_opened.addClass("work-opened");
        }
        // Hash cahnge
        hash_change(work_prev_url);
    }
    (function($){
        "use strict";
        $(".work-prev").click(function(){
            prev_work();
        });
    })(jQuery);
    // Next work
    function next_work(){
        $(".work-loader").fadeIn(300);
        var work_next_url = $(".work-opened").parent().next(".work-item").find(".work-item-link").attr("href") +
        ' ' +
        '.work-wrapper';
        setTimeout(function(){
            $(".work-full-load").empty().load(work_next_url, function(){
                initWorkSlider();
                $(".work-loader").delay(200).fadeOut(500);
            });
        }, 500);
        var work_opened = $(".work-opened").parent().next(".work-item").find(".work-item-link");
        $(".work-item-link").removeClass("work-opened");
        work_opened.addClass("work-opened");
        // If right end of the links
        if ($(".work-opened").parent().is(":last")) {
            work_next_url = $(".work-item").first().find(".work-item-link").attr("href") +
            ' ' +
            '.work-wrapper';
            setTimeout(function(){
                $(".work-full-load").empty().load(work_next_url, function(){
                    initWorkSlider();
                    $(".work-loader").delay(200).fadeOut(500);
                });
            }, 500);
            work_opened = $(".work-item").first().find(".work-item-link");
            $(".work-item-link").removeClass("work-opened");
            work_opened.addClass("work-opened");
        }
        // Hash cahnge
        hash_change(work_next_url);
    }
    (function($){
        "use strict";
        $(".work-next").click(function(){
            next_work();
        });
    })(jQuery);
    // Hash change event
  	(function($){
      "use strict";
      $(window).hashchange(function(){
          if ((location.hash.search("/works") == -1) && ($(".work-full").is(":visible"))) {
              close_work();
          }
          else {
              var hash_new = location.hash;
              var work_url = hash_new.replace("#/", "") + ' ' + '.work-wrapper';
              if ((hash_new.replace("#/", "") != $(".work-opened").attr("href")) && ($(".work-full").is(":visible"))) {
                  $(".work-loader").fadeIn(300);
                  setTimeout(function(){
                      $(".work-full-load").empty().load(work_url, function(){
                          initWorkSlider();
                          $(".work-loader").delay(200).fadeOut(500);
                      });
                  }, 200);
                  if (work_before_scroll != 0) {
                      $("html, body").animate({
                          scrollTop: 0
                      }, "slow", "easeOutExpo");
                  }
                  var work_opened = $(".work-item-link[href = '" + work_url.replace(" .work-wrapper", "") + "']");
                  $(".work-item-link").removeClass("work-opened");
                  work_opened.addClass("work-opened");
              }
              if ((hash_new.replace("#/", "") != $(".work-opened").attr("href")) && ($(".work-full").is(":hidden")) && (location.hash.search("/works") != -1)) {
                  $(".page").fadeOut(500);
                  setTimeout(function(){
                      $(".work-full").fadeIn(500);
                  }, 550);
                  setTimeout(function(){
                      $(".work-full-load").empty().load(work_url, function(){
                          initWorkSlider();
                          $(".work-loader").delay(200).fadeOut(500);
                          $(".work-navigation").animate({
                              top: 0
                          }, 900, "easeOutCirc");
                          if (work_before_scroll != 0) {
                              $("html, body").animate({
                                  scrollTop: 0
                              }, "fast", "easeOutExpo");
                          }
                      });
                  }, 650);
                  var work_opened = $(".work-item-link[href = '" + work_url.replace(" .work-wrapper", "") + "']");
                  $(".work-item-link").removeClass("work-opened");
                  work_opened.addClass("work-opened");
              }
          }
      });
      $(window).trigger('hashchange');
  	})(jQuery);
});
$(document).ready(function(){
  // Add scrollspy to <body>
  $('body').scrollspy({target: ".navbar", offset: 50});

  // Add smooth scrolling on all links inside the navbar
  $("#myNavbar a").on('click', function(event) {

    // Prevent default anchor click behavior
    event.preventDefault();

    // Store hash
    var hash = this.hash;

    // Using jQuery's animate() method to add smooth page scroll
    // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
    $('html, body').animate({
      scrollTop: $(hash).offset().top
    }, 800, function(){

      // Add hash (#) to URL when done scrolling (default click behavior)
      window.location.hash = hash;
    });
  });
});

//Based on the Scroller function from @sallar
var $content = $('header .content')
  , $blur    = $('header .overlay')
  , wHeight  = $(window).height();

$(window).on('resize', function(){
  wHeight = $(window).height();
});

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
})();

function Scroller(){
  this.latestKnownScrollY = 0;
  this.ticking            = false;
}

Scroller.prototype = {
  init: function() {
    window.addEventListener('scroll', this.onScroll.bind(this), false);
    $blur.css('background-image',$('header:first-of-type').css('background-image'));
  },
  onScroll: function() {
    this.latestKnownScrollY = window.scrollY;
    this.requestTick();
  },
  requestTick: function() {
    if( !this.ticking ) {
      window.requestAnimFrame(this.update.bind(this));
    }
    this.ticking = true;
  },
  update: function() {
    var currentScrollY = this.latestKnownScrollY;
    this.ticking       = false;
    var slowScroll = currentScrollY / 2
      , blurScroll = currentScrollY * 2
      , opaScroll = 1.4 - currentScrollY / 400;
   if(currentScrollY > wHeight)
     $('nav').css('position','fixed');
   else
     $('nav').css('position','absolute');
    $content.css({
      'transform'         : 'translateY(' + slowScroll + 'px)',
      '-moz-transform'    : 'translateY(' + slowScroll + 'px)',
      '-webkit-transform' : 'translateY(' + slowScroll + 'px)',
      'opacity' : opaScroll
    });

    $blur.css({
      'opacity' : blurScroll / wHeight
    });
  }
};


var scroller = new Scroller();
scroller.init();

$(document).ready(function() {
  $('.particles').particleground({
    dotColor: '#FFFFFF',
    lineColor: '#FFFFFF'
  });
});

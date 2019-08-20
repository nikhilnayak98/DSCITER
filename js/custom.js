/*
*   MIT License
*
*   Copyright (c) 2019 Nikhil Nayak
*
*   Permission is hereby granted, free of charge, to any person obtaining a copy
*   of this software and associated documentation files (the "Software"), to deal
*   in the Software without restriction, including without limitation the rights
*   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*   copies of the Software, and to permit persons to whom the Software is
*   furnished to do so, subject to the following conditions:
*
*   The above copyright notice and this permission notice shall be included in all
*   copies or substantial portions of the Software.
*
*   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
*   SOFTWARE.
*/

$(window).on('load', function() {
  'use strict';
  $('#loading').addClass('hidden');
});

var $iframe = $('iframe'),
    src = $iframe.data('src');

if (window.matchMedia("(min-width: 720px)").matches) {
    $iframe.attr('src', src);
}else{
    $iframe.css('display', 'none');
}

$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});

(function($) {
  'use strict';

  /* VARIABLES */
  var navBar = $('.custom-menu'),
    navbarLinks = $('.custom-menu .nav-link');

  /* STICKY NAVBAR */
  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 50) {
      $(navBar).addClass('navbar-is-sticky');
    } else {
      $(navBar).removeClass('navbar-is-sticky');
    }
  });

  $('.navbar-toggler').on('click', function(e) {
    $(this).toggleClass('menu-is-expanded');
  });

  $(document).on('click', '.navbar-collapse.show', function(e) {
    if ($(e.target).is('a')) {
      $(this).collapse('hide');
      $('.navbar-toggler').toggleClass('menu-is-expanded');
      // $('.Menu-Icon--Circle').css('transform', 'translateX(-50%) translateY(-50%) scale(1)');
    }
  });

  /* NAVBAR ON SCROLL EASING */
  $(navbarLinks).on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - 50)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
  });

  /* team SLIDER */

  //initialize new hammer instance and swipe functionalities
var slider = new Hammer.Manager(document.getElementById('carouselExample'), { inputClass: Hammer.TouchInput});
var Swipe = new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL});
slider.add(Swipe);

// implement swipe action on the carousel
slider.on('swiperight swipeleft', function(e) {
  e.preventDefault();
  if (e.type == 'swiperight') {
    $(this).carousel('prev');
    checkitem();
  } else {
    $(this).carousel('next');
    checkitem();
  }
});


$('#carouselExample').on('slide.bs.carousel', function (e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $('.carousel-item').length;

    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item').eq(i).appendTo('.carousel-inner');
            }
            else {
                $('.carousel-item').eq(0).appendTo('.carousel-inner');
            }
        }
    }
});

  /* TABS INIT */
  $('.js-tabs a').on('click', function(e) {
    e.preventDefault();
    $(this).tab('show');
  });

  /* TOOLTIPS */
  $('[data-toggle="tooltip"]').tooltip();

  /* VIDEO MODALS */

  $('.js-video-modal-trigger').magnificPopup({
    type: 'iframe',
    iframe: {
      patterns: {
        youtube: {
          index: 'youtube.com/',
          id: function(url) {
            var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
            if (!m || !m[1]) return null;
            return m[1];
          },
          src: '//www.youtube.com/embed/%id%?autoplay=1'
        },
        vimeo: {
          index: 'vimeo.com/',
          id: function(url) {
            var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
            if (!m || !m[5]) return null;
            return m[5];
          },
          src: '//player.vimeo.com/video/%id%?autoplay=1'
        }
      }
    }
  });

})(jQuery);

// Change theme
var element = 0;
function adjustTheme() {
  if(element == 0) {
    // Dark section
    $("#main").attr("href", "css/styles-dark.css");
    document.getElementById("technologies").className = "section-spacer";
    document.getElementById("hip").className = "section-spacer";
    document.getElementById("iot").className = "section-spacer";
    document.getElementById("workshops").className = "section-spacer workshops-section";
    document.getElementById("mainlogo").src="images/assets/logo-dark.png";
    document.getElementById("footerlogo").src="images/assets/logo-dark.png";
    document.querySelector('meta[name="theme-color"]').setAttribute("content", "#0A192F");
    document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').setAttribute("content", "darkblue");
    element = 1;
  } else {
    // Light section
    $("#main").attr("href", "css/styles.css");
    document.getElementById("technologies").className = "section-spacer bg-very__gray";
    document.getElementById("hip").className = "section-spacer bg-very__gray";
    document.getElementById("iot").className = "section-spacer bg-very__gray";
    document.getElementById("workshops").className = "section-spacer workshops-section bg-very__gray";
    document.getElementById("mainlogo").src="images/assets/logo.png";
    document.getElementById("footerlogo").src="images/assets/logo.png";
    document.querySelector('meta[name="theme-color"]').setAttribute("content", "#2F5BE7");
    document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]').setAttribute("content", "blue-translucent");
    element = 0;
  }
}
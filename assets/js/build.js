(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


// $ = require('jquery');
// require('perfect-scrollbar/jquery')($);
// require('/node_modules/slick-carousel/slick/slick.min')($);
var front = {
    FullPage:function (block) {
        block.fullpage({
            fixedElements: '#full-page-nav',
            resize : true,
            anchors:['intro', 'games','about-us', 'contacts'],
            menu: '#full-page-nav',
            animateAnchor: false,
            css3:true
            // scrollBar:true
        });
    },
    Slider:{
      intro:function () {
          $('.js-slider-intro').slick({
              arrows:false,
              dots:false,
              autoplay:true,
              infinite:true
          })
      }
    },
    Masonry:function () {
        $('.js-mas-games').waterfall();
    },
    slideBg:function () {
        $.each($('.js-slide-bg'),function () {
            var src = $(this).find('img').attr('data-src');
            $(this).css({
                'background-image':'url("'+src+'")'
            })
        });
    },
    init: function () {
        this.Slider.intro();
        this.slideBg();
        this.FullPage($('#fullpage'));
        this.Masonry();
    }
};

$(document).ready(function() {
    front.init();

});



},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5cbi8vICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbi8vIHJlcXVpcmUoJ3BlcmZlY3Qtc2Nyb2xsYmFyL2pxdWVyeScpKCQpO1xuLy8gcmVxdWlyZSgnL25vZGVfbW9kdWxlcy9zbGljay1jYXJvdXNlbC9zbGljay9zbGljay5taW4nKSgkKTtcbnZhciBmcm9udCA9IHtcbiAgICBGdWxsUGFnZTpmdW5jdGlvbiAoYmxvY2spIHtcbiAgICAgICAgYmxvY2suZnVsbHBhZ2Uoe1xuICAgICAgICAgICAgZml4ZWRFbGVtZW50czogJyNmdWxsLXBhZ2UtbmF2JyxcbiAgICAgICAgICAgIHJlc2l6ZSA6IHRydWUsXG4gICAgICAgICAgICBhbmNob3JzOlsnaW50cm8nLCAnZ2FtZXMnLCdhYm91dC11cycsICdjb250YWN0cyddLFxuICAgICAgICAgICAgbWVudTogJyNmdWxsLXBhZ2UtbmF2JyxcbiAgICAgICAgICAgIGFuaW1hdGVBbmNob3I6IGZhbHNlLFxuICAgICAgICAgICAgY3NzMzp0cnVlXG4gICAgICAgICAgICAvLyBzY3JvbGxCYXI6dHJ1ZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIFNsaWRlcjp7XG4gICAgICBpbnRybzpmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgJCgnLmpzLXNsaWRlci1pbnRybycpLnNsaWNrKHtcbiAgICAgICAgICAgICAgYXJyb3dzOmZhbHNlLFxuICAgICAgICAgICAgICBkb3RzOmZhbHNlLFxuICAgICAgICAgICAgICBhdXRvcGxheTp0cnVlLFxuICAgICAgICAgICAgICBpbmZpbml0ZTp0cnVlXG4gICAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9LFxuICAgIE1hc29ucnk6ZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcuanMtbWFzLWdhbWVzJykud2F0ZXJmYWxsKCk7XG4gICAgfSxcbiAgICBzbGlkZUJnOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgJC5lYWNoKCQoJy5qcy1zbGlkZS1iZycpLGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzcmMgPSAkKHRoaXMpLmZpbmQoJ2ltZycpLmF0dHIoJ2RhdGEtc3JjJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmNzcyh7XG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOid1cmwoXCInK3NyYysnXCIpJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuU2xpZGVyLmludHJvKCk7XG4gICAgICAgIHRoaXMuc2xpZGVCZygpO1xuICAgICAgICB0aGlzLkZ1bGxQYWdlKCQoJyNmdWxscGFnZScpKTtcbiAgICAgICAgdGhpcy5NYXNvbnJ5KCk7XG4gICAgfVxufTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgZnJvbnQuaW5pdCgpO1xuXG59KTtcblxuXG4iXX0=

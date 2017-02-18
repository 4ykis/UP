

// $ = require('jquery');
require('perfect-scrollbar/jquery')($);
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
    Scroll:function () {
        $('.js-pf-scroll').perfectScrollbar();
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
    Particles:function () {
        particlesJS.load('particles-js', 'assets/json/particlesjs-config.json', function() {});
    },
    popup:{
        about:function () {
            $('.js-open-modal').on('click',function () {
                var data = $(this).attr('data-modal-link');
                $('[data-modal="'+data+'"]').fadeIn();
                $('.about').addClass('open-modal');
            });
            $('.js-close-modal').on('click', function () {
                $(this).closest('.js-modal').fadeOut();
                $('.about').removeClass('open-modal');
            })
        }
    },
    init: function () {
        this.Slider.intro();
        this.slideBg();
        this.FullPage($('#fullpage'));
        this.Masonry();
        this.Particles();
        this.Scroll();
        this.popup.about();
    }
};

$(document).ready(function() {
    front.init();

});



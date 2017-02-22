

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
    menuBtn:function () {
      $('.js-menu-btn').on('click',function () {
          $(this).toggleClass('open');
          $(this).parent().toggleClass('open');
      });

      $('#full-page-nav li').on('click',function () {
          $('.js-menu-btn').toggleClass('open').parent().toggleClass('open');
          if($(window).width() < 1000 ){
              var link = $(this).attr('data-menuanchor');
              var top = $('[data-anchor="'+link+'"]').offset().top;
              $('html,body').animate({scrollTop:top},500);
          }
      })
    },
    Scroll:function () {
        var block = $('.js-pf-scroll');
        block.perfectScrollbar({
            autoScrolling: false
        });
        if($(window).width() < 1000){

            // $.fn.fullpage.reBuild();
            $.fn.fullpage.destroy('all');
            $.fn.fullpage.setAutoScrolling(false);
        }
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
    sldieDownTitle:function () {
      $('.js-slide-down a').on('click',function () {
          if($(window).width() < 1000 ){
              var top = $('[data-anchor="games"]').offset().top;
              $('html,body').animate({scrollTop:top},500);
          }
      })
    },
    reload:function () {
        var w = $(window).width();
        $(window).resize(function () {
           var afterw = $(window).width();
           if(w > 1350){
               if(afterw < 1350){
                   location.reload();
               }
           }else if(w>1000){
               if(afterw < 1000 || afterw > 1350){
                   location.reload();
               }
           }else if(w>570){
               if(afterw < 570 || afterw > 1000){
                   location.reload();
               }
           }else if(w<570){
               if(afterw > 570){
                   location.reload();
               }
           }



        });
    },
    init: function () {
        this.Slider.intro();
        this.slideBg();
        this.menuBtn();
        this.FullPage($('#fullpage'));
        // this.Particles();
        this.Scroll();
        this.popup.about();
        this.reload();
        this.sldieDownTitle();

    }
};

$(document).ready(function() {
    front.init();
});

// E29D4D



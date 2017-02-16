

// $ = require('jquery');
// require('perfect-scrollbar/jquery')($);
// require('/node_modules/slick-carousel/slick/slick.min')($);
var front = {
    FullPage:function (block) {
        block.fullpage();
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
    init: function () {
        this.Slider.intro();
        this.FullPage($('#fullpage'));
    }
};

$(document).ready(function() {
    front.init();

});



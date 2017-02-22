(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


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



},{"perfect-scrollbar/jquery":2}],2:[function(require,module,exports){
'use strict';

module.exports = require('./src/js/adaptor/jquery');

},{"./src/js/adaptor/jquery":3}],3:[function(require,module,exports){
'use strict';

var ps = require('../main');
var psInstances = require('../plugin/instances');

function mountJQuery(jQuery) {
  jQuery.fn.perfectScrollbar = function (settingOrCommand) {
    return this.each(function () {
      if (typeof settingOrCommand === 'object' ||
          typeof settingOrCommand === 'undefined') {
        // If it's an object or none, initialize.
        var settings = settingOrCommand;

        if (!psInstances.get(this)) {
          ps.initialize(this, settings);
        }
      } else {
        // Unless, it may be a command.
        var command = settingOrCommand;

        if (command === 'update') {
          ps.update(this);
        } else if (command === 'destroy') {
          ps.destroy(this);
        }
      }
    });
  };
}

if (typeof define === 'function' && define.amd) {
  // AMD. Register as an anonymous module.
  define(['jquery'], mountJQuery);
} else {
  var jq = window.jQuery ? window.jQuery : window.$;
  if (typeof jq !== 'undefined') {
    mountJQuery(jq);
  }
}

module.exports = mountJQuery;

},{"../main":9,"../plugin/instances":20}],4:[function(require,module,exports){
'use strict';

function oldAdd(element, className) {
  var classes = element.className.split(' ');
  if (classes.indexOf(className) < 0) {
    classes.push(className);
  }
  element.className = classes.join(' ');
}

function oldRemove(element, className) {
  var classes = element.className.split(' ');
  var idx = classes.indexOf(className);
  if (idx >= 0) {
    classes.splice(idx, 1);
  }
  element.className = classes.join(' ');
}

exports.add = function (element, className) {
  if (element.classList) {
    element.classList.add(className);
  } else {
    oldAdd(element, className);
  }
};

exports.remove = function (element, className) {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    oldRemove(element, className);
  }
};

exports.list = function (element) {
  if (element.classList) {
    return Array.prototype.slice.apply(element.classList);
  } else {
    return element.className.split(' ');
  }
};

},{}],5:[function(require,module,exports){
'use strict';

var DOM = {};

DOM.e = function (tagName, className) {
  var element = document.createElement(tagName);
  element.className = className;
  return element;
};

DOM.appendTo = function (child, parent) {
  parent.appendChild(child);
  return child;
};

function cssGet(element, styleName) {
  return window.getComputedStyle(element)[styleName];
}

function cssSet(element, styleName, styleValue) {
  if (typeof styleValue === 'number') {
    styleValue = styleValue.toString() + 'px';
  }
  element.style[styleName] = styleValue;
  return element;
}

function cssMultiSet(element, obj) {
  for (var key in obj) {
    var val = obj[key];
    if (typeof val === 'number') {
      val = val.toString() + 'px';
    }
    element.style[key] = val;
  }
  return element;
}

DOM.css = function (element, styleNameOrObject, styleValue) {
  if (typeof styleNameOrObject === 'object') {
    // multiple set with object
    return cssMultiSet(element, styleNameOrObject);
  } else {
    if (typeof styleValue === 'undefined') {
      return cssGet(element, styleNameOrObject);
    } else {
      return cssSet(element, styleNameOrObject, styleValue);
    }
  }
};

DOM.matches = function (element, query) {
  if (typeof element.matches !== 'undefined') {
    return element.matches(query);
  } else {
    if (typeof element.matchesSelector !== 'undefined') {
      return element.matchesSelector(query);
    } else if (typeof element.webkitMatchesSelector !== 'undefined') {
      return element.webkitMatchesSelector(query);
    } else if (typeof element.mozMatchesSelector !== 'undefined') {
      return element.mozMatchesSelector(query);
    } else if (typeof element.msMatchesSelector !== 'undefined') {
      return element.msMatchesSelector(query);
    }
  }
};

DOM.remove = function (element) {
  if (typeof element.remove !== 'undefined') {
    element.remove();
  } else {
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }
};

DOM.queryChildren = function (element, selector) {
  return Array.prototype.filter.call(element.childNodes, function (child) {
    return DOM.matches(child, selector);
  });
};

module.exports = DOM;

},{}],6:[function(require,module,exports){
'use strict';

var EventElement = function (element) {
  this.element = element;
  this.events = {};
};

EventElement.prototype.bind = function (eventName, handler) {
  if (typeof this.events[eventName] === 'undefined') {
    this.events[eventName] = [];
  }
  this.events[eventName].push(handler);
  this.element.addEventListener(eventName, handler, false);
};

EventElement.prototype.unbind = function (eventName, handler) {
  var isHandlerProvided = (typeof handler !== 'undefined');
  this.events[eventName] = this.events[eventName].filter(function (hdlr) {
    if (isHandlerProvided && hdlr !== handler) {
      return true;
    }
    this.element.removeEventListener(eventName, hdlr, false);
    return false;
  }, this);
};

EventElement.prototype.unbindAll = function () {
  for (var name in this.events) {
    this.unbind(name);
  }
};

var EventManager = function () {
  this.eventElements = [];
};

EventManager.prototype.eventElement = function (element) {
  var ee = this.eventElements.filter(function (eventElement) {
    return eventElement.element === element;
  })[0];
  if (typeof ee === 'undefined') {
    ee = new EventElement(element);
    this.eventElements.push(ee);
  }
  return ee;
};

EventManager.prototype.bind = function (element, eventName, handler) {
  this.eventElement(element).bind(eventName, handler);
};

EventManager.prototype.unbind = function (element, eventName, handler) {
  this.eventElement(element).unbind(eventName, handler);
};

EventManager.prototype.unbindAll = function () {
  for (var i = 0; i < this.eventElements.length; i++) {
    this.eventElements[i].unbindAll();
  }
};

EventManager.prototype.once = function (element, eventName, handler) {
  var ee = this.eventElement(element);
  var onceHandler = function (e) {
    ee.unbind(eventName, onceHandler);
    handler(e);
  };
  ee.bind(eventName, onceHandler);
};

module.exports = EventManager;

},{}],7:[function(require,module,exports){
'use strict';

module.exports = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);
  }
  return function () {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
           s4() + '-' + s4() + s4() + s4();
  };
})();

},{}],8:[function(require,module,exports){
'use strict';

var cls = require('./class');
var dom = require('./dom');

var toInt = exports.toInt = function (x) {
  return parseInt(x, 10) || 0;
};

var clone = exports.clone = function (obj) {
  if (!obj) {
    return null;
  } else if (obj.constructor === Array) {
    return obj.map(clone);
  } else if (typeof obj === 'object') {
    var result = {};
    for (var key in obj) {
      result[key] = clone(obj[key]);
    }
    return result;
  } else {
    return obj;
  }
};

exports.extend = function (original, source) {
  var result = clone(original);
  for (var key in source) {
    result[key] = clone(source[key]);
  }
  return result;
};

exports.isEditable = function (el) {
  return dom.matches(el, "input,[contenteditable]") ||
         dom.matches(el, "select,[contenteditable]") ||
         dom.matches(el, "textarea,[contenteditable]") ||
         dom.matches(el, "button,[contenteditable]");
};

exports.removePsClasses = function (element) {
  var clsList = cls.list(element);
  for (var i = 0; i < clsList.length; i++) {
    var className = clsList[i];
    if (className.indexOf('ps-') === 0) {
      cls.remove(element, className);
    }
  }
};

exports.outerWidth = function (element) {
  return toInt(dom.css(element, 'width')) +
         toInt(dom.css(element, 'paddingLeft')) +
         toInt(dom.css(element, 'paddingRight')) +
         toInt(dom.css(element, 'borderLeftWidth')) +
         toInt(dom.css(element, 'borderRightWidth'));
};

exports.startScrolling = function (element, axis) {
  cls.add(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.add(element, 'ps-' + axis);
  } else {
    cls.add(element, 'ps-x');
    cls.add(element, 'ps-y');
  }
};

exports.stopScrolling = function (element, axis) {
  cls.remove(element, 'ps-in-scrolling');
  if (typeof axis !== 'undefined') {
    cls.remove(element, 'ps-' + axis);
  } else {
    cls.remove(element, 'ps-x');
    cls.remove(element, 'ps-y');
  }
};

exports.env = {
  isWebKit: 'WebkitAppearance' in document.documentElement.style,
  supportsTouch: (('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch),
  supportsIePointer: window.navigator.msMaxTouchPoints !== null
};

},{"./class":4,"./dom":5}],9:[function(require,module,exports){
'use strict';

var destroy = require('./plugin/destroy');
var initialize = require('./plugin/initialize');
var update = require('./plugin/update');

module.exports = {
  initialize: initialize,
  update: update,
  destroy: destroy
};

},{"./plugin/destroy":11,"./plugin/initialize":19,"./plugin/update":23}],10:[function(require,module,exports){
'use strict';

module.exports = {
  handlers: ['click-rail', 'drag-scrollbar', 'keyboard', 'wheel', 'touch'],
  maxScrollbarLength: null,
  minScrollbarLength: null,
  scrollXMarginOffset: 0,
  scrollYMarginOffset: 0,
  suppressScrollX: false,
  suppressScrollY: false,
  swipePropagation: true,
  useBothWheelAxes: false,
  wheelPropagation: false,
  wheelSpeed: 1,
  theme: 'default'
};

},{}],11:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var dom = require('../lib/dom');
var instances = require('./instances');

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  i.event.unbindAll();
  dom.remove(i.scrollbarX);
  dom.remove(i.scrollbarY);
  dom.remove(i.scrollbarXRail);
  dom.remove(i.scrollbarYRail);
  _.removePsClasses(element);

  instances.remove(element);
};

},{"../lib/dom":5,"../lib/helper":8,"./instances":20}],12:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindClickRailHandler(element, i) {
  function pageOffset(el) {
    return el.getBoundingClientRect();
  }
  var stopPropagation = function (e) { e.stopPropagation(); };

  i.event.bind(i.scrollbarY, 'click', stopPropagation);
  i.event.bind(i.scrollbarYRail, 'click', function (e) {
    var positionTop = e.pageY - window.pageYOffset - pageOffset(i.scrollbarYRail).top;
    var direction = positionTop > i.scrollbarYTop ? 1 : -1;

    updateScroll(element, 'top', element.scrollTop + direction * i.containerHeight);
    updateGeometry(element);

    e.stopPropagation();
  });

  i.event.bind(i.scrollbarX, 'click', stopPropagation);
  i.event.bind(i.scrollbarXRail, 'click', function (e) {
    var positionLeft = e.pageX - window.pageXOffset - pageOffset(i.scrollbarXRail).left;
    var direction = positionLeft > i.scrollbarXLeft ? 1 : -1;

    updateScroll(element, 'left', element.scrollLeft + direction * i.containerWidth);
    updateGeometry(element);

    e.stopPropagation();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindClickRailHandler(element, i);
};

},{"../instances":20,"../update-geometry":21,"../update-scroll":22}],13:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var dom = require('../../lib/dom');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindMouseScrollXHandler(element, i) {
  var currentLeft = null;
  var currentPageX = null;

  function updateScrollLeft(deltaX) {
    var newLeft = currentLeft + (deltaX * i.railXRatio);
    var maxLeft = Math.max(0, i.scrollbarXRail.getBoundingClientRect().left) + (i.railXRatio * (i.railXWidth - i.scrollbarXWidth));

    if (newLeft < 0) {
      i.scrollbarXLeft = 0;
    } else if (newLeft > maxLeft) {
      i.scrollbarXLeft = maxLeft;
    } else {
      i.scrollbarXLeft = newLeft;
    }

    var scrollLeft = _.toInt(i.scrollbarXLeft * (i.contentWidth - i.containerWidth) / (i.containerWidth - (i.railXRatio * i.scrollbarXWidth))) - i.negativeScrollAdjustment;
    updateScroll(element, 'left', scrollLeft);
  }

  var mouseMoveHandler = function (e) {
    updateScrollLeft(e.pageX - currentPageX);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'x');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarX, 'mousedown', function (e) {
    currentPageX = e.pageX;
    currentLeft = _.toInt(dom.css(i.scrollbarX, 'left')) * i.railXRatio;
    _.startScrolling(element, 'x');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

function bindMouseScrollYHandler(element, i) {
  var currentTop = null;
  var currentPageY = null;

  function updateScrollTop(deltaY) {
    var newTop = currentTop + (deltaY * i.railYRatio);
    var maxTop = Math.max(0, i.scrollbarYRail.getBoundingClientRect().top) + (i.railYRatio * (i.railYHeight - i.scrollbarYHeight));

    if (newTop < 0) {
      i.scrollbarYTop = 0;
    } else if (newTop > maxTop) {
      i.scrollbarYTop = maxTop;
    } else {
      i.scrollbarYTop = newTop;
    }

    var scrollTop = _.toInt(i.scrollbarYTop * (i.contentHeight - i.containerHeight) / (i.containerHeight - (i.railYRatio * i.scrollbarYHeight)));
    updateScroll(element, 'top', scrollTop);
  }

  var mouseMoveHandler = function (e) {
    updateScrollTop(e.pageY - currentPageY);
    updateGeometry(element);
    e.stopPropagation();
    e.preventDefault();
  };

  var mouseUpHandler = function () {
    _.stopScrolling(element, 'y');
    i.event.unbind(i.ownerDocument, 'mousemove', mouseMoveHandler);
  };

  i.event.bind(i.scrollbarY, 'mousedown', function (e) {
    currentPageY = e.pageY;
    currentTop = _.toInt(dom.css(i.scrollbarY, 'top')) * i.railYRatio;
    _.startScrolling(element, 'y');

    i.event.bind(i.ownerDocument, 'mousemove', mouseMoveHandler);
    i.event.once(i.ownerDocument, 'mouseup', mouseUpHandler);

    e.stopPropagation();
    e.preventDefault();
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseScrollXHandler(element, i);
  bindMouseScrollYHandler(element, i);
};

},{"../../lib/dom":5,"../../lib/helper":8,"../instances":20,"../update-geometry":21,"../update-scroll":22}],14:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var dom = require('../../lib/dom');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindKeyboardHandler(element, i) {
  var hovered = false;
  i.event.bind(element, 'mouseenter', function () {
    hovered = true;
  });
  i.event.bind(element, 'mouseleave', function () {
    hovered = false;
  });

  var shouldPrevent = false;
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  i.event.bind(i.ownerDocument, 'keydown', function (e) {
    if ((e.isDefaultPrevented && e.isDefaultPrevented()) || e.defaultPrevented) {
      return;
    }

    var focused = dom.matches(i.scrollbarX, ':focus') ||
                  dom.matches(i.scrollbarY, ':focus');

    if (!hovered && !focused) {
      return;
    }

    var activeElement = document.activeElement ? document.activeElement : i.ownerDocument.activeElement;
    if (activeElement) {
      if (activeElement.tagName === 'IFRAME') {
        activeElement = activeElement.contentDocument.activeElement;
      } else {
        // go deeper if element is a webcomponent
        while (activeElement.shadowRoot) {
          activeElement = activeElement.shadowRoot.activeElement;
        }
      }
      if (_.isEditable(activeElement)) {
        return;
      }
    }

    var deltaX = 0;
    var deltaY = 0;

    switch (e.which) {
    case 37: // left
      if (e.metaKey) {
        deltaX = -i.contentWidth;
      } else if (e.altKey) {
        deltaX = -i.containerWidth;
      } else {
        deltaX = -30;
      }
      break;
    case 38: // up
      if (e.metaKey) {
        deltaY = i.contentHeight;
      } else if (e.altKey) {
        deltaY = i.containerHeight;
      } else {
        deltaY = 30;
      }
      break;
    case 39: // right
      if (e.metaKey) {
        deltaX = i.contentWidth;
      } else if (e.altKey) {
        deltaX = i.containerWidth;
      } else {
        deltaX = 30;
      }
      break;
    case 40: // down
      if (e.metaKey) {
        deltaY = -i.contentHeight;
      } else if (e.altKey) {
        deltaY = -i.containerHeight;
      } else {
        deltaY = -30;
      }
      break;
    case 33: // page up
      deltaY = 90;
      break;
    case 32: // space bar
      if (e.shiftKey) {
        deltaY = 90;
      } else {
        deltaY = -90;
      }
      break;
    case 34: // page down
      deltaY = -90;
      break;
    case 35: // end
      if (e.ctrlKey) {
        deltaY = -i.contentHeight;
      } else {
        deltaY = -i.containerHeight;
      }
      break;
    case 36: // home
      if (e.ctrlKey) {
        deltaY = element.scrollTop;
      } else {
        deltaY = i.containerHeight;
      }
      break;
    default:
      return;
    }

    updateScroll(element, 'top', element.scrollTop - deltaY);
    updateScroll(element, 'left', element.scrollLeft + deltaX);
    updateGeometry(element);

    shouldPrevent = shouldPreventDefault(deltaX, deltaY);
    if (shouldPrevent) {
      e.preventDefault();
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindKeyboardHandler(element, i);
};

},{"../../lib/dom":5,"../../lib/helper":8,"../instances":20,"../update-geometry":21,"../update-scroll":22}],15:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindMouseWheelHandler(element, i) {
  var shouldPrevent = false;

  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    if (deltaX === 0) {
      if (!i.scrollbarYActive) {
        return false;
      }
      if ((scrollTop === 0 && deltaY > 0) || (scrollTop >= i.contentHeight - i.containerHeight && deltaY < 0)) {
        return !i.settings.wheelPropagation;
      }
    }

    var scrollLeft = element.scrollLeft;
    if (deltaY === 0) {
      if (!i.scrollbarXActive) {
        return false;
      }
      if ((scrollLeft === 0 && deltaX < 0) || (scrollLeft >= i.contentWidth - i.containerWidth && deltaX > 0)) {
        return !i.settings.wheelPropagation;
      }
    }
    return true;
  }

  function getDeltaFromEvent(e) {
    var deltaX = e.deltaX;
    var deltaY = -1 * e.deltaY;

    if (typeof deltaX === "undefined" || typeof deltaY === "undefined") {
      // OS X Safari
      deltaX = -1 * e.wheelDeltaX / 6;
      deltaY = e.wheelDeltaY / 6;
    }

    if (e.deltaMode && e.deltaMode === 1) {
      // Firefox in deltaMode 1: Line scrolling
      deltaX *= 10;
      deltaY *= 10;
    }

    if (deltaX !== deltaX && deltaY !== deltaY/* NaN checks */) {
      // IE in some mouse drivers
      deltaX = 0;
      deltaY = e.wheelDelta;
    }

    if (e.shiftKey) {
      // reverse axis with shift key
      return [-deltaY, -deltaX];
    }
    return [deltaX, deltaY];
  }

  function shouldBeConsumedByChild(deltaX, deltaY) {
    var child = element.querySelector('textarea:hover, select[multiple]:hover, .ps-child:hover');
    if (child) {
      if (!window.getComputedStyle(child).overflow.match(/(scroll|auto)/)) {
        // if not scrollable
        return false;
      }

      var maxScrollTop = child.scrollHeight - child.clientHeight;
      if (maxScrollTop > 0) {
        if (!(child.scrollTop === 0 && deltaY > 0) && !(child.scrollTop === maxScrollTop && deltaY < 0)) {
          return true;
        }
      }
      var maxScrollLeft = child.scrollLeft - child.clientWidth;
      if (maxScrollLeft > 0) {
        if (!(child.scrollLeft === 0 && deltaX < 0) && !(child.scrollLeft === maxScrollLeft && deltaX > 0)) {
          return true;
        }
      }
    }
    return false;
  }

  function mousewheelHandler(e) {
    var delta = getDeltaFromEvent(e);

    var deltaX = delta[0];
    var deltaY = delta[1];

    if (shouldBeConsumedByChild(deltaX, deltaY)) {
      return;
    }

    shouldPrevent = false;
    if (!i.settings.useBothWheelAxes) {
      // deltaX will only be used for horizontal scrolling and deltaY will
      // only be used for vertical scrolling - this is the default
      updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
    } else if (i.scrollbarYActive && !i.scrollbarXActive) {
      // only vertical scrollbar is active and useBothWheelAxes option is
      // active, so let's scroll vertical bar using both mouse wheel axes
      if (deltaY) {
        updateScroll(element, 'top', element.scrollTop - (deltaY * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'top', element.scrollTop + (deltaX * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    } else if (i.scrollbarXActive && !i.scrollbarYActive) {
      // useBothWheelAxes and only horizontal bar is active, so use both
      // wheel axes for horizontal bar
      if (deltaX) {
        updateScroll(element, 'left', element.scrollLeft + (deltaX * i.settings.wheelSpeed));
      } else {
        updateScroll(element, 'left', element.scrollLeft - (deltaY * i.settings.wheelSpeed));
      }
      shouldPrevent = true;
    }

    updateGeometry(element);

    shouldPrevent = (shouldPrevent || shouldPreventDefault(deltaX, deltaY));
    if (shouldPrevent) {
      e.stopPropagation();
      e.preventDefault();
    }
  }

  if (typeof window.onwheel !== "undefined") {
    i.event.bind(element, 'wheel', mousewheelHandler);
  } else if (typeof window.onmousewheel !== "undefined") {
    i.event.bind(element, 'mousewheel', mousewheelHandler);
  }
}

module.exports = function (element) {
  var i = instances.get(element);
  bindMouseWheelHandler(element, i);
};

},{"../instances":20,"../update-geometry":21,"../update-scroll":22}],16:[function(require,module,exports){
'use strict';

var instances = require('../instances');
var updateGeometry = require('../update-geometry');

function bindNativeScrollHandler(element, i) {
  i.event.bind(element, 'scroll', function () {
    updateGeometry(element);
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindNativeScrollHandler(element, i);
};

},{"../instances":20,"../update-geometry":21}],17:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindSelectionHandler(element, i) {
  function getRangeNode() {
    var selection = window.getSelection ? window.getSelection() :
                    document.getSelection ? document.getSelection() : '';
    if (selection.toString().length === 0) {
      return null;
    } else {
      return selection.getRangeAt(0).commonAncestorContainer;
    }
  }

  var scrollingLoop = null;
  var scrollDiff = {top: 0, left: 0};
  function startScrolling() {
    if (!scrollingLoop) {
      scrollingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(scrollingLoop);
          return;
        }

        updateScroll(element, 'top', element.scrollTop + scrollDiff.top);
        updateScroll(element, 'left', element.scrollLeft + scrollDiff.left);
        updateGeometry(element);
      }, 50); // every .1 sec
    }
  }
  function stopScrolling() {
    if (scrollingLoop) {
      clearInterval(scrollingLoop);
      scrollingLoop = null;
    }
    _.stopScrolling(element);
  }

  var isSelected = false;
  i.event.bind(i.ownerDocument, 'selectionchange', function () {
    if (element.contains(getRangeNode())) {
      isSelected = true;
    } else {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'mouseup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });
  i.event.bind(window, 'keyup', function () {
    if (isSelected) {
      isSelected = false;
      stopScrolling();
    }
  });

  i.event.bind(window, 'mousemove', function (e) {
    if (isSelected) {
      var mousePosition = {x: e.pageX, y: e.pageY};
      var containerGeometry = {
        left: element.offsetLeft,
        right: element.offsetLeft + element.offsetWidth,
        top: element.offsetTop,
        bottom: element.offsetTop + element.offsetHeight
      };

      if (mousePosition.x < containerGeometry.left + 3) {
        scrollDiff.left = -5;
        _.startScrolling(element, 'x');
      } else if (mousePosition.x > containerGeometry.right - 3) {
        scrollDiff.left = 5;
        _.startScrolling(element, 'x');
      } else {
        scrollDiff.left = 0;
      }

      if (mousePosition.y < containerGeometry.top + 3) {
        if (containerGeometry.top + 3 - mousePosition.y < 5) {
          scrollDiff.top = -5;
        } else {
          scrollDiff.top = -20;
        }
        _.startScrolling(element, 'y');
      } else if (mousePosition.y > containerGeometry.bottom - 3) {
        if (mousePosition.y - containerGeometry.bottom + 3 < 5) {
          scrollDiff.top = 5;
        } else {
          scrollDiff.top = 20;
        }
        _.startScrolling(element, 'y');
      } else {
        scrollDiff.top = 0;
      }

      if (scrollDiff.top === 0 && scrollDiff.left === 0) {
        stopScrolling();
      } else {
        startScrolling();
      }
    }
  });
}

module.exports = function (element) {
  var i = instances.get(element);
  bindSelectionHandler(element, i);
};

},{"../../lib/helper":8,"../instances":20,"../update-geometry":21,"../update-scroll":22}],18:[function(require,module,exports){
'use strict';

var _ = require('../../lib/helper');
var instances = require('../instances');
var updateGeometry = require('../update-geometry');
var updateScroll = require('../update-scroll');

function bindTouchHandler(element, i, supportsTouch, supportsIePointer) {
  function shouldPreventDefault(deltaX, deltaY) {
    var scrollTop = element.scrollTop;
    var scrollLeft = element.scrollLeft;
    var magnitudeX = Math.abs(deltaX);
    var magnitudeY = Math.abs(deltaY);

    if (magnitudeY > magnitudeX) {
      // user is perhaps trying to swipe up/down the page

      if (((deltaY < 0) && (scrollTop === i.contentHeight - i.containerHeight)) ||
          ((deltaY > 0) && (scrollTop === 0))) {
        return !i.settings.swipePropagation;
      }
    } else if (magnitudeX > magnitudeY) {
      // user is perhaps trying to swipe left/right across the page

      if (((deltaX < 0) && (scrollLeft === i.contentWidth - i.containerWidth)) ||
          ((deltaX > 0) && (scrollLeft === 0))) {
        return !i.settings.swipePropagation;
      }
    }

    return true;
  }

  function applyTouchMove(differenceX, differenceY) {
    updateScroll(element, 'top', element.scrollTop - differenceY);
    updateScroll(element, 'left', element.scrollLeft - differenceX);

    updateGeometry(element);
  }

  var startOffset = {};
  var startTime = 0;
  var speed = {};
  var easingLoop = null;
  var inGlobalTouch = false;
  var inLocalTouch = false;

  function globalTouchStart() {
    inGlobalTouch = true;
  }
  function globalTouchEnd() {
    inGlobalTouch = false;
  }

  function getTouch(e) {
    if (e.targetTouches) {
      return e.targetTouches[0];
    } else {
      // Maybe IE pointer
      return e;
    }
  }
  function shouldHandle(e) {
    if (e.targetTouches && e.targetTouches.length === 1) {
      return true;
    }
    if (e.pointerType && e.pointerType !== 'mouse' && e.pointerType !== e.MSPOINTER_TYPE_MOUSE) {
      return true;
    }
    return false;
  }
  function touchStart(e) {
    if (shouldHandle(e)) {
      inLocalTouch = true;

      var touch = getTouch(e);

      startOffset.pageX = touch.pageX;
      startOffset.pageY = touch.pageY;

      startTime = (new Date()).getTime();

      if (easingLoop !== null) {
        clearInterval(easingLoop);
      }

      e.stopPropagation();
    }
  }
  function touchMove(e) {
    if (!inLocalTouch && i.settings.swipePropagation) {
      touchStart(e);
    }
    if (!inGlobalTouch && inLocalTouch && shouldHandle(e)) {
      var touch = getTouch(e);

      var currentOffset = {pageX: touch.pageX, pageY: touch.pageY};

      var differenceX = currentOffset.pageX - startOffset.pageX;
      var differenceY = currentOffset.pageY - startOffset.pageY;

      applyTouchMove(differenceX, differenceY);
      startOffset = currentOffset;

      var currentTime = (new Date()).getTime();

      var timeGap = currentTime - startTime;
      if (timeGap > 0) {
        speed.x = differenceX / timeGap;
        speed.y = differenceY / timeGap;
        startTime = currentTime;
      }

      if (shouldPreventDefault(differenceX, differenceY)) {
        e.stopPropagation();
        e.preventDefault();
      }
    }
  }
  function touchEnd() {
    if (!inGlobalTouch && inLocalTouch) {
      inLocalTouch = false;

      clearInterval(easingLoop);
      easingLoop = setInterval(function () {
        if (!instances.get(element)) {
          clearInterval(easingLoop);
          return;
        }

        if (!speed.x && !speed.y) {
          clearInterval(easingLoop);
          return;
        }

        if (Math.abs(speed.x) < 0.01 && Math.abs(speed.y) < 0.01) {
          clearInterval(easingLoop);
          return;
        }

        applyTouchMove(speed.x * 30, speed.y * 30);

        speed.x *= 0.8;
        speed.y *= 0.8;
      }, 10);
    }
  }

  if (supportsTouch) {
    i.event.bind(window, 'touchstart', globalTouchStart);
    i.event.bind(window, 'touchend', globalTouchEnd);
    i.event.bind(element, 'touchstart', touchStart);
    i.event.bind(element, 'touchmove', touchMove);
    i.event.bind(element, 'touchend', touchEnd);
  } else if (supportsIePointer) {
    if (window.PointerEvent) {
      i.event.bind(window, 'pointerdown', globalTouchStart);
      i.event.bind(window, 'pointerup', globalTouchEnd);
      i.event.bind(element, 'pointerdown', touchStart);
      i.event.bind(element, 'pointermove', touchMove);
      i.event.bind(element, 'pointerup', touchEnd);
    } else if (window.MSPointerEvent) {
      i.event.bind(window, 'MSPointerDown', globalTouchStart);
      i.event.bind(window, 'MSPointerUp', globalTouchEnd);
      i.event.bind(element, 'MSPointerDown', touchStart);
      i.event.bind(element, 'MSPointerMove', touchMove);
      i.event.bind(element, 'MSPointerUp', touchEnd);
    }
  }
}

module.exports = function (element) {
  if (!_.env.supportsTouch && !_.env.supportsIePointer) {
    return;
  }

  var i = instances.get(element);
  bindTouchHandler(element, i, _.env.supportsTouch, _.env.supportsIePointer);
};

},{"../../lib/helper":8,"../instances":20,"../update-geometry":21,"../update-scroll":22}],19:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var cls = require('../lib/class');
var instances = require('./instances');
var updateGeometry = require('./update-geometry');

// Handlers
var handlers = {
  'click-rail': require('./handler/click-rail'),
  'drag-scrollbar': require('./handler/drag-scrollbar'),
  'keyboard': require('./handler/keyboard'),
  'wheel': require('./handler/mouse-wheel'),
  'touch': require('./handler/touch'),
  'selection': require('./handler/selection')
};
var nativeScrollHandler = require('./handler/native-scroll');

module.exports = function (element, userSettings) {
  userSettings = typeof userSettings === 'object' ? userSettings : {};

  cls.add(element, 'ps-container');

  // Create a plugin instance.
  var i = instances.add(element);

  i.settings = _.extend(i.settings, userSettings);
  cls.add(element, 'ps-theme-' + i.settings.theme);

  i.settings.handlers.forEach(function (handlerName) {
    handlers[handlerName](element);
  });

  nativeScrollHandler(element);

  updateGeometry(element);
};

},{"../lib/class":4,"../lib/helper":8,"./handler/click-rail":12,"./handler/drag-scrollbar":13,"./handler/keyboard":14,"./handler/mouse-wheel":15,"./handler/native-scroll":16,"./handler/selection":17,"./handler/touch":18,"./instances":20,"./update-geometry":21}],20:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var cls = require('../lib/class');
var defaultSettings = require('./default-setting');
var dom = require('../lib/dom');
var EventManager = require('../lib/event-manager');
var guid = require('../lib/guid');

var instances = {};

function Instance(element) {
  var i = this;

  i.settings = _.clone(defaultSettings);
  i.containerWidth = null;
  i.containerHeight = null;
  i.contentWidth = null;
  i.contentHeight = null;

  i.isRtl = dom.css(element, 'direction') === "rtl";
  i.isNegativeScroll = (function () {
    var originalScrollLeft = element.scrollLeft;
    var result = null;
    element.scrollLeft = -1;
    result = element.scrollLeft < 0;
    element.scrollLeft = originalScrollLeft;
    return result;
  })();
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;
  i.event = new EventManager();
  i.ownerDocument = element.ownerDocument || document;

  function focus() {
    cls.add(element, 'ps-focus');
  }

  function blur() {
    cls.remove(element, 'ps-focus');
  }

  i.scrollbarXRail = dom.appendTo(dom.e('div', 'ps-scrollbar-x-rail'), element);
  i.scrollbarX = dom.appendTo(dom.e('div', 'ps-scrollbar-x'), i.scrollbarXRail);
  i.scrollbarX.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarX, 'focus', focus);
  i.event.bind(i.scrollbarX, 'blur', blur);
  i.scrollbarXActive = null;
  i.scrollbarXWidth = null;
  i.scrollbarXLeft = null;
  i.scrollbarXBottom = _.toInt(dom.css(i.scrollbarXRail, 'bottom'));
  i.isScrollbarXUsingBottom = i.scrollbarXBottom === i.scrollbarXBottom; // !isNaN
  i.scrollbarXTop = i.isScrollbarXUsingBottom ? null : _.toInt(dom.css(i.scrollbarXRail, 'top'));
  i.railBorderXWidth = _.toInt(dom.css(i.scrollbarXRail, 'borderLeftWidth')) + _.toInt(dom.css(i.scrollbarXRail, 'borderRightWidth'));
  // Set rail to display:block to calculate margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  dom.css(i.scrollbarXRail, 'display', '');
  i.railXWidth = null;
  i.railXRatio = null;

  i.scrollbarYRail = dom.appendTo(dom.e('div', 'ps-scrollbar-y-rail'), element);
  i.scrollbarY = dom.appendTo(dom.e('div', 'ps-scrollbar-y'), i.scrollbarYRail);
  i.scrollbarY.setAttribute('tabindex', 0);
  i.event.bind(i.scrollbarY, 'focus', focus);
  i.event.bind(i.scrollbarY, 'blur', blur);
  i.scrollbarYActive = null;
  i.scrollbarYHeight = null;
  i.scrollbarYTop = null;
  i.scrollbarYRight = _.toInt(dom.css(i.scrollbarYRail, 'right'));
  i.isScrollbarYUsingRight = i.scrollbarYRight === i.scrollbarYRight; // !isNaN
  i.scrollbarYLeft = i.isScrollbarYUsingRight ? null : _.toInt(dom.css(i.scrollbarYRail, 'left'));
  i.scrollbarYOuterWidth = i.isRtl ? _.outerWidth(i.scrollbarY) : null;
  i.railBorderYWidth = _.toInt(dom.css(i.scrollbarYRail, 'borderTopWidth')) + _.toInt(dom.css(i.scrollbarYRail, 'borderBottomWidth'));
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));
  dom.css(i.scrollbarYRail, 'display', '');
  i.railYHeight = null;
  i.railYRatio = null;
}

function getId(element) {
  return element.getAttribute('data-ps-id');
}

function setId(element, id) {
  element.setAttribute('data-ps-id', id);
}

function removeId(element) {
  element.removeAttribute('data-ps-id');
}

exports.add = function (element) {
  var newId = guid();
  setId(element, newId);
  instances[newId] = new Instance(element);
  return instances[newId];
};

exports.remove = function (element) {
  delete instances[getId(element)];
  removeId(element);
};

exports.get = function (element) {
  return instances[getId(element)];
};

},{"../lib/class":4,"../lib/dom":5,"../lib/event-manager":6,"../lib/guid":7,"../lib/helper":8,"./default-setting":10}],21:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var cls = require('../lib/class');
var dom = require('../lib/dom');
var instances = require('./instances');
var updateScroll = require('./update-scroll');

function getThumbSize(i, thumbSize) {
  if (i.settings.minScrollbarLength) {
    thumbSize = Math.max(thumbSize, i.settings.minScrollbarLength);
  }
  if (i.settings.maxScrollbarLength) {
    thumbSize = Math.min(thumbSize, i.settings.maxScrollbarLength);
  }
  return thumbSize;
}

function updateCss(element, i) {
  var xRailOffset = {width: i.railXWidth};
  if (i.isRtl) {
    xRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth - i.contentWidth;
  } else {
    xRailOffset.left = element.scrollLeft;
  }
  if (i.isScrollbarXUsingBottom) {
    xRailOffset.bottom = i.scrollbarXBottom - element.scrollTop;
  } else {
    xRailOffset.top = i.scrollbarXTop + element.scrollTop;
  }
  dom.css(i.scrollbarXRail, xRailOffset);

  var yRailOffset = {top: element.scrollTop, height: i.railYHeight};
  if (i.isScrollbarYUsingRight) {
    if (i.isRtl) {
      yRailOffset.right = i.contentWidth - (i.negativeScrollAdjustment + element.scrollLeft) - i.scrollbarYRight - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.right = i.scrollbarYRight - element.scrollLeft;
    }
  } else {
    if (i.isRtl) {
      yRailOffset.left = i.negativeScrollAdjustment + element.scrollLeft + i.containerWidth * 2 - i.contentWidth - i.scrollbarYLeft - i.scrollbarYOuterWidth;
    } else {
      yRailOffset.left = i.scrollbarYLeft + element.scrollLeft;
    }
  }
  dom.css(i.scrollbarYRail, yRailOffset);

  dom.css(i.scrollbarX, {left: i.scrollbarXLeft, width: i.scrollbarXWidth - i.railBorderXWidth});
  dom.css(i.scrollbarY, {top: i.scrollbarYTop, height: i.scrollbarYHeight - i.railBorderYWidth});
}

module.exports = function (element) {
  var i = instances.get(element);

  i.containerWidth = element.clientWidth;
  i.containerHeight = element.clientHeight;
  i.contentWidth = element.scrollWidth;
  i.contentHeight = element.scrollHeight;

  var existingRails;
  if (!element.contains(i.scrollbarXRail)) {
    existingRails = dom.queryChildren(element, '.ps-scrollbar-x-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarXRail, element);
  }
  if (!element.contains(i.scrollbarYRail)) {
    existingRails = dom.queryChildren(element, '.ps-scrollbar-y-rail');
    if (existingRails.length > 0) {
      existingRails.forEach(function (rail) {
        dom.remove(rail);
      });
    }
    dom.appendTo(i.scrollbarYRail, element);
  }

  if (!i.settings.suppressScrollX && i.containerWidth + i.settings.scrollXMarginOffset < i.contentWidth) {
    i.scrollbarXActive = true;
    i.railXWidth = i.containerWidth - i.railXMarginWidth;
    i.railXRatio = i.containerWidth / i.railXWidth;
    i.scrollbarXWidth = getThumbSize(i, _.toInt(i.railXWidth * i.containerWidth / i.contentWidth));
    i.scrollbarXLeft = _.toInt((i.negativeScrollAdjustment + element.scrollLeft) * (i.railXWidth - i.scrollbarXWidth) / (i.contentWidth - i.containerWidth));
  } else {
    i.scrollbarXActive = false;
  }

  if (!i.settings.suppressScrollY && i.containerHeight + i.settings.scrollYMarginOffset < i.contentHeight) {
    i.scrollbarYActive = true;
    i.railYHeight = i.containerHeight - i.railYMarginHeight;
    i.railYRatio = i.containerHeight / i.railYHeight;
    i.scrollbarYHeight = getThumbSize(i, _.toInt(i.railYHeight * i.containerHeight / i.contentHeight));
    i.scrollbarYTop = _.toInt(element.scrollTop * (i.railYHeight - i.scrollbarYHeight) / (i.contentHeight - i.containerHeight));
  } else {
    i.scrollbarYActive = false;
  }

  if (i.scrollbarXLeft >= i.railXWidth - i.scrollbarXWidth) {
    i.scrollbarXLeft = i.railXWidth - i.scrollbarXWidth;
  }
  if (i.scrollbarYTop >= i.railYHeight - i.scrollbarYHeight) {
    i.scrollbarYTop = i.railYHeight - i.scrollbarYHeight;
  }

  updateCss(element, i);

  if (i.scrollbarXActive) {
    cls.add(element, 'ps-active-x');
  } else {
    cls.remove(element, 'ps-active-x');
    i.scrollbarXWidth = 0;
    i.scrollbarXLeft = 0;
    updateScroll(element, 'left', 0);
  }
  if (i.scrollbarYActive) {
    cls.add(element, 'ps-active-y');
  } else {
    cls.remove(element, 'ps-active-y');
    i.scrollbarYHeight = 0;
    i.scrollbarYTop = 0;
    updateScroll(element, 'top', 0);
  }
};

},{"../lib/class":4,"../lib/dom":5,"../lib/helper":8,"./instances":20,"./update-scroll":22}],22:[function(require,module,exports){
'use strict';

var instances = require('./instances');

var lastTop;
var lastLeft;

var createDOMEvent = function (name) {
  var event = document.createEvent("Event");
  event.initEvent(name, true, true);
  return event;
};

module.exports = function (element, axis, value) {
  if (typeof element === 'undefined') {
    throw 'You must provide an element to the update-scroll function';
  }

  if (typeof axis === 'undefined') {
    throw 'You must provide an axis to the update-scroll function';
  }

  if (typeof value === 'undefined') {
    throw 'You must provide a value to the update-scroll function';
  }

  if (axis === 'top' && value <= 0) {
    element.scrollTop = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-y-reach-start'));
  }

  if (axis === 'left' && value <= 0) {
    element.scrollLeft = value = 0; // don't allow negative scroll
    element.dispatchEvent(createDOMEvent('ps-x-reach-start'));
  }

  var i = instances.get(element);

  if (axis === 'top' && value >= i.contentHeight - i.containerHeight) {
    // don't allow scroll past container
    value = i.contentHeight - i.containerHeight;
    if (value - element.scrollTop <= 1) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollTop;
    } else {
      element.scrollTop = value;
    }
    element.dispatchEvent(createDOMEvent('ps-y-reach-end'));
  }

  if (axis === 'left' && value >= i.contentWidth - i.containerWidth) {
    // don't allow scroll past container
    value = i.contentWidth - i.containerWidth;
    if (value - element.scrollLeft <= 1) {
      // mitigates rounding errors on non-subpixel scroll values
      value = element.scrollLeft;
    } else {
      element.scrollLeft = value;
    }
    element.dispatchEvent(createDOMEvent('ps-x-reach-end'));
  }

  if (!lastTop) {
    lastTop = element.scrollTop;
  }

  if (!lastLeft) {
    lastLeft = element.scrollLeft;
  }

  if (axis === 'top' && value < lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-up'));
  }

  if (axis === 'top' && value > lastTop) {
    element.dispatchEvent(createDOMEvent('ps-scroll-down'));
  }

  if (axis === 'left' && value < lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-left'));
  }

  if (axis === 'left' && value > lastLeft) {
    element.dispatchEvent(createDOMEvent('ps-scroll-right'));
  }

  if (axis === 'top') {
    element.scrollTop = lastTop = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-y'));
  }

  if (axis === 'left') {
    element.scrollLeft = lastLeft = value;
    element.dispatchEvent(createDOMEvent('ps-scroll-x'));
  }

};

},{"./instances":20}],23:[function(require,module,exports){
'use strict';

var _ = require('../lib/helper');
var dom = require('../lib/dom');
var instances = require('./instances');
var updateGeometry = require('./update-geometry');
var updateScroll = require('./update-scroll');

module.exports = function (element) {
  var i = instances.get(element);

  if (!i) {
    return;
  }

  // Recalcuate negative scrollLeft adjustment
  i.negativeScrollAdjustment = i.isNegativeScroll ? element.scrollWidth - element.clientWidth : 0;

  // Recalculate rail margins
  dom.css(i.scrollbarXRail, 'display', 'block');
  dom.css(i.scrollbarYRail, 'display', 'block');
  i.railXMarginWidth = _.toInt(dom.css(i.scrollbarXRail, 'marginLeft')) + _.toInt(dom.css(i.scrollbarXRail, 'marginRight'));
  i.railYMarginHeight = _.toInt(dom.css(i.scrollbarYRail, 'marginTop')) + _.toInt(dom.css(i.scrollbarYRail, 'marginBottom'));

  // Hide scrollbars not to affect scrollWidth and scrollHeight
  dom.css(i.scrollbarXRail, 'display', 'none');
  dom.css(i.scrollbarYRail, 'display', 'none');

  updateGeometry(element);

  // Update top/left scroll to trigger events
  updateScroll(element, 'top', element.scrollTop);
  updateScroll(element, 'left', element.scrollLeft);

  dom.css(i.scrollbarXRail, 'display', '');
  dom.css(i.scrollbarYRail, 'display', '');
};

},{"../lib/dom":5,"../lib/helper":8,"./instances":20,"./update-geometry":21,"./update-scroll":22}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9qcXVlcnkuanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL2FkYXB0b3IvanF1ZXJ5LmpzIiwibm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL3NyYy9qcy9saWIvY2xhc3MuanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL2xpYi9kb20uanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL2xpYi9ldmVudC1tYW5hZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL3NyYy9qcy9saWIvZ3VpZC5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvbGliL2hlbHBlci5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvcGx1Z2luL2RlZmF1bHQtc2V0dGluZy5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvcGx1Z2luL2Rlc3Ryb3kuanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL3BsdWdpbi9oYW5kbGVyL2NsaWNrLXJhaWwuanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL3BsdWdpbi9oYW5kbGVyL2RyYWctc2Nyb2xsYmFyLmpzIiwibm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL3NyYy9qcy9wbHVnaW4vaGFuZGxlci9rZXlib2FyZC5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvcGx1Z2luL2hhbmRsZXIvbW91c2Utd2hlZWwuanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL3BsdWdpbi9oYW5kbGVyL25hdGl2ZS1zY3JvbGwuanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL3BsdWdpbi9oYW5kbGVyL3NlbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvcGx1Z2luL2hhbmRsZXIvdG91Y2guanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL3BsdWdpbi9pbml0aWFsaXplLmpzIiwibm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL3NyYy9qcy9wbHVnaW4vaW5zdGFuY2VzLmpzIiwibm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL3NyYy9qcy9wbHVnaW4vdXBkYXRlLWdlb21ldHJ5LmpzIiwibm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL3NyYy9qcy9wbHVnaW4vdXBkYXRlLXNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvcGx1Z2luL3VwZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcklBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXG5cbi8vICQgPSByZXF1aXJlKCdqcXVlcnknKTtcbnJlcXVpcmUoJ3BlcmZlY3Qtc2Nyb2xsYmFyL2pxdWVyeScpKCQpO1xuLy8gcmVxdWlyZSgnL25vZGVfbW9kdWxlcy9zbGljay1jYXJvdXNlbC9zbGljay9zbGljay5taW4nKSgkKTtcbnZhciBmcm9udCA9IHtcbiAgICBGdWxsUGFnZTpmdW5jdGlvbiAoYmxvY2spIHtcbiAgICAgICAgYmxvY2suZnVsbHBhZ2Uoe1xuICAgICAgICAgICAgZml4ZWRFbGVtZW50czogJyNmdWxsLXBhZ2UtbmF2JyxcbiAgICAgICAgICAgIHJlc2l6ZSA6IHRydWUsXG4gICAgICAgICAgICBhbmNob3JzOlsnaW50cm8nLCAnZ2FtZXMnLCdhYm91dC11cycsICdjb250YWN0cyddLFxuICAgICAgICAgICAgbWVudTogJyNmdWxsLXBhZ2UtbmF2JyxcbiAgICAgICAgICAgIGFuaW1hdGVBbmNob3I6IGZhbHNlLFxuICAgICAgICAgICAgY3NzMzp0cnVlXG4gICAgICAgICAgICAvLyBzY3JvbGxCYXI6dHJ1ZVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIFNsaWRlcjp7XG4gICAgICAgIGludHJvOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICQoJy5qcy1zbGlkZXItaW50cm8nKS5zbGljayh7XG4gICAgICAgICAgICAgICAgYXJyb3dzOmZhbHNlLFxuICAgICAgICAgICAgICAgIGRvdHM6ZmFsc2UsXG4gICAgICAgICAgICAgICAgYXV0b3BsYXk6dHJ1ZSxcbiAgICAgICAgICAgICAgICBpbmZpbml0ZTp0cnVlXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBtZW51QnRuOmZ1bmN0aW9uICgpIHtcbiAgICAgICQoJy5qcy1tZW51LWJ0bicpLm9uKCdjbGljaycsZnVuY3Rpb24gKCkge1xuICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ29wZW4nKTtcbiAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICB9KTtcblxuICAgICAgJCgnI2Z1bGwtcGFnZS1uYXYgbGknKS5vbignY2xpY2snLGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKCcuanMtbWVudS1idG4nKS50b2dnbGVDbGFzcygnb3BlbicpLnBhcmVudCgpLnRvZ2dsZUNsYXNzKCdvcGVuJyk7XG4gICAgICAgICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPCAxMDAwICl7XG4gICAgICAgICAgICAgIHZhciBsaW5rID0gJCh0aGlzKS5hdHRyKCdkYXRhLW1lbnVhbmNob3InKTtcbiAgICAgICAgICAgICAgdmFyIHRvcCA9ICQoJ1tkYXRhLWFuY2hvcj1cIicrbGluaysnXCJdJykub2Zmc2V0KCkudG9wO1xuICAgICAgICAgICAgICAkKCdodG1sLGJvZHknKS5hbmltYXRlKHtzY3JvbGxUb3A6dG9wfSw1MDApO1xuICAgICAgICAgIH1cbiAgICAgIH0pXG4gICAgfSxcbiAgICBTY3JvbGw6ZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgYmxvY2sgPSAkKCcuanMtcGYtc2Nyb2xsJyk7XG4gICAgICAgIGJsb2NrLnBlcmZlY3RTY3JvbGxiYXIoe1xuICAgICAgICAgICAgYXV0b1Njcm9sbGluZzogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIGlmKCQod2luZG93KS53aWR0aCgpIDwgMTAwMCl7XG5cbiAgICAgICAgICAgIC8vICQuZm4uZnVsbHBhZ2UucmVCdWlsZCgpO1xuICAgICAgICAgICAgJC5mbi5mdWxscGFnZS5kZXN0cm95KCdhbGwnKTtcbiAgICAgICAgICAgICQuZm4uZnVsbHBhZ2Uuc2V0QXV0b1Njcm9sbGluZyhmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIHNsaWRlQmc6ZnVuY3Rpb24gKCkge1xuICAgICAgICAkLmVhY2goJCgnLmpzLXNsaWRlLWJnJyksZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNyYyA9ICQodGhpcykuZmluZCgnaW1nJykuYXR0cignZGF0YS1zcmMnKTtcbiAgICAgICAgICAgICQodGhpcykuY3NzKHtcbiAgICAgICAgICAgICAgICAnYmFja2dyb3VuZC1pbWFnZSc6J3VybChcIicrc3JjKydcIiknXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICB9LFxuICAgIFBhcnRpY2xlczpmdW5jdGlvbiAoKSB7XG4gICAgICAgIHBhcnRpY2xlc0pTLmxvYWQoJ3BhcnRpY2xlcy1qcycsICdhc3NldHMvanNvbi9wYXJ0aWNsZXNqcy1jb25maWcuanNvbicsIGZ1bmN0aW9uKCkge30pO1xuICAgIH0sXG4gICAgcG9wdXA6e1xuICAgICAgICBhYm91dDpmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAkKCcuanMtb3Blbi1tb2RhbCcpLm9uKCdjbGljaycsZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gJCh0aGlzKS5hdHRyKCdkYXRhLW1vZGFsLWxpbmsnKTtcbiAgICAgICAgICAgICAgICAkKCdbZGF0YS1tb2RhbD1cIicrZGF0YSsnXCJdJykuZmFkZUluKCk7XG4gICAgICAgICAgICAgICAgJCgnLmFib3V0JykuYWRkQ2xhc3MoJ29wZW4tbW9kYWwnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCgnLmpzLWNsb3NlLW1vZGFsJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICQodGhpcykuY2xvc2VzdCgnLmpzLW1vZGFsJykuZmFkZU91dCgpO1xuICAgICAgICAgICAgICAgICQoJy5hYm91dCcpLnJlbW92ZUNsYXNzKCdvcGVuLW1vZGFsJyk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfSxcbiAgICBzbGRpZURvd25UaXRsZTpmdW5jdGlvbiAoKSB7XG4gICAgICAkKCcuanMtc2xpZGUtZG93biBhJykub24oJ2NsaWNrJyxmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYoJCh3aW5kb3cpLndpZHRoKCkgPCAxMDAwICl7XG4gICAgICAgICAgICAgIHZhciB0b3AgPSAkKCdbZGF0YS1hbmNob3I9XCJnYW1lc1wiXScpLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgJCgnaHRtbCxib2R5JykuYW5pbWF0ZSh7c2Nyb2xsVG9wOnRvcH0sNTAwKTtcbiAgICAgICAgICB9XG4gICAgICB9KVxuICAgIH0sXG4gICAgcmVsb2FkOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHcgPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgIHZhciBhZnRlcncgPSAkKHdpbmRvdykud2lkdGgoKTtcbiAgICAgICAgICAgaWYodyA+IDEzNTApe1xuICAgICAgICAgICAgICAgaWYoYWZ0ZXJ3IDwgMTM1MCl7XG4gICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1lbHNlIGlmKHc+MTAwMCl7XG4gICAgICAgICAgICAgICBpZihhZnRlcncgPCAxMDAwIHx8IGFmdGVydyA+IDEzNTApe1xuICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICB9ZWxzZSBpZih3PjU3MCl7XG4gICAgICAgICAgICAgICBpZihhZnRlcncgPCA1NzAgfHwgYWZ0ZXJ3ID4gMTAwMCl7XG4gICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1lbHNlIGlmKHc8NTcwKXtcbiAgICAgICAgICAgICAgIGlmKGFmdGVydyA+IDU3MCl7XG4gICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cblxuXG5cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuU2xpZGVyLmludHJvKCk7XG4gICAgICAgIHRoaXMuc2xpZGVCZygpO1xuICAgICAgICB0aGlzLm1lbnVCdG4oKTtcbiAgICAgICAgdGhpcy5GdWxsUGFnZSgkKCcjZnVsbHBhZ2UnKSk7XG4gICAgICAgIC8vIHRoaXMuUGFydGljbGVzKCk7XG4gICAgICAgIHRoaXMuU2Nyb2xsKCk7XG4gICAgICAgIHRoaXMucG9wdXAuYWJvdXQoKTtcbiAgICAgICAgdGhpcy5yZWxvYWQoKTtcbiAgICAgICAgdGhpcy5zbGRpZURvd25UaXRsZSgpO1xuXG4gICAgfVxufTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgZnJvbnQuaW5pdCgpO1xufSk7XG5cbi8vIEUyOUQ0RFxuXG5cbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NyYy9qcy9hZGFwdG9yL2pxdWVyeScpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgcHMgPSByZXF1aXJlKCcuLi9tYWluJyk7XG52YXIgcHNJbnN0YW5jZXMgPSByZXF1aXJlKCcuLi9wbHVnaW4vaW5zdGFuY2VzJyk7XG5cbmZ1bmN0aW9uIG1vdW50SlF1ZXJ5KGpRdWVyeSkge1xuICBqUXVlcnkuZm4ucGVyZmVjdFNjcm9sbGJhciA9IGZ1bmN0aW9uIChzZXR0aW5nT3JDb21tYW5kKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAodHlwZW9mIHNldHRpbmdPckNvbW1hbmQgPT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgdHlwZW9mIHNldHRpbmdPckNvbW1hbmQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIElmIGl0J3MgYW4gb2JqZWN0IG9yIG5vbmUsIGluaXRpYWxpemUuXG4gICAgICAgIHZhciBzZXR0aW5ncyA9IHNldHRpbmdPckNvbW1hbmQ7XG5cbiAgICAgICAgaWYgKCFwc0luc3RhbmNlcy5nZXQodGhpcykpIHtcbiAgICAgICAgICBwcy5pbml0aWFsaXplKHRoaXMsIHNldHRpbmdzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gVW5sZXNzLCBpdCBtYXkgYmUgYSBjb21tYW5kLlxuICAgICAgICB2YXIgY29tbWFuZCA9IHNldHRpbmdPckNvbW1hbmQ7XG5cbiAgICAgICAgaWYgKGNvbW1hbmQgPT09ICd1cGRhdGUnKSB7XG4gICAgICAgICAgcHMudXBkYXRlKHRoaXMpO1xuICAgICAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09ICdkZXN0cm95Jykge1xuICAgICAgICAgIHBzLmRlc3Ryb3kodGhpcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbn1cblxuaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gIGRlZmluZShbJ2pxdWVyeSddLCBtb3VudEpRdWVyeSk7XG59IGVsc2Uge1xuICB2YXIganEgPSB3aW5kb3cualF1ZXJ5ID8gd2luZG93LmpRdWVyeSA6IHdpbmRvdy4kO1xuICBpZiAodHlwZW9mIGpxICE9PSAndW5kZWZpbmVkJykge1xuICAgIG1vdW50SlF1ZXJ5KGpxKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1vdW50SlF1ZXJ5O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBvbGRBZGQoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIHZhciBjbGFzc2VzID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgaWYgKGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpIDwgMCkge1xuICAgIGNsYXNzZXMucHVzaChjbGFzc05hbWUpO1xuICB9XG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XG59XG5cbmZ1bmN0aW9uIG9sZFJlbW92ZShlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgdmFyIGNsYXNzZXMgPSBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICB2YXIgaWR4ID0gY2xhc3Nlcy5pbmRleE9mKGNsYXNzTmFtZSk7XG4gIGlmIChpZHggPj0gMCkge1xuICAgIGNsYXNzZXMuc3BsaWNlKGlkeCwgMSk7XG4gIH1cbiAgZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc2VzLmpvaW4oJyAnKTtcbn1cblxuZXhwb3J0cy5hZGQgPSBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIG9sZEFkZChlbGVtZW50LCBjbGFzc05hbWUpO1xuICB9XG59O1xuXG5leHBvcnRzLnJlbW92ZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBjbGFzc05hbWUpIHtcbiAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0KSB7XG4gICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgb2xkUmVtb3ZlKGVsZW1lbnQsIGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cbmV4cG9ydHMubGlzdCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuYXBwbHkoZWxlbWVudC5jbGFzc0xpc3QpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgRE9NID0ge307XG5cbkRPTS5lID0gZnVuY3Rpb24gKHRhZ05hbWUsIGNsYXNzTmFtZSkge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lO1xuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbkRPTS5hcHBlbmRUbyA9IGZ1bmN0aW9uIChjaGlsZCwgcGFyZW50KSB7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gIHJldHVybiBjaGlsZDtcbn07XG5cbmZ1bmN0aW9uIGNzc0dldChlbGVtZW50LCBzdHlsZU5hbWUpIHtcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpW3N0eWxlTmFtZV07XG59XG5cbmZ1bmN0aW9uIGNzc1NldChlbGVtZW50LCBzdHlsZU5hbWUsIHN0eWxlVmFsdWUpIHtcbiAgaWYgKHR5cGVvZiBzdHlsZVZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHN0eWxlVmFsdWUgPSBzdHlsZVZhbHVlLnRvU3RyaW5nKCkgKyAncHgnO1xuICB9XG4gIGVsZW1lbnQuc3R5bGVbc3R5bGVOYW1lXSA9IHN0eWxlVmFsdWU7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5mdW5jdGlvbiBjc3NNdWx0aVNldChlbGVtZW50LCBvYmopIHtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIHZhciB2YWwgPSBvYmpba2V5XTtcbiAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHZhbCA9IHZhbC50b1N0cmluZygpICsgJ3B4JztcbiAgICB9XG4gICAgZWxlbWVudC5zdHlsZVtrZXldID0gdmFsO1xuICB9XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5ET00uY3NzID0gZnVuY3Rpb24gKGVsZW1lbnQsIHN0eWxlTmFtZU9yT2JqZWN0LCBzdHlsZVZhbHVlKSB7XG4gIGlmICh0eXBlb2Ygc3R5bGVOYW1lT3JPYmplY3QgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gbXVsdGlwbGUgc2V0IHdpdGggb2JqZWN0XG4gICAgcmV0dXJuIGNzc011bHRpU2V0KGVsZW1lbnQsIHN0eWxlTmFtZU9yT2JqZWN0KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIHN0eWxlVmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gY3NzR2V0KGVsZW1lbnQsIHN0eWxlTmFtZU9yT2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNzc1NldChlbGVtZW50LCBzdHlsZU5hbWVPck9iamVjdCwgc3R5bGVWYWx1ZSk7XG4gICAgfVxuICB9XG59O1xuXG5ET00ubWF0Y2hlcyA9IGZ1bmN0aW9uIChlbGVtZW50LCBxdWVyeSkge1xuICBpZiAodHlwZW9mIGVsZW1lbnQubWF0Y2hlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gZWxlbWVudC5tYXRjaGVzKHF1ZXJ5KTtcbiAgfSBlbHNlIHtcbiAgICBpZiAodHlwZW9mIGVsZW1lbnQubWF0Y2hlc1NlbGVjdG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnQubWF0Y2hlc1NlbGVjdG9yKHF1ZXJ5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50LndlYmtpdE1hdGNoZXNTZWxlY3RvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBlbGVtZW50LndlYmtpdE1hdGNoZXNTZWxlY3RvcihxdWVyeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5tb3pNYXRjaGVzU2VsZWN0b3IocXVlcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC5tc01hdGNoZXNTZWxlY3RvcihxdWVyeSk7XG4gICAgfVxuICB9XG59O1xuXG5ET00ucmVtb3ZlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgaWYgKHR5cGVvZiBlbGVtZW50LnJlbW92ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbGVtZW50LnJlbW92ZSgpO1xuICB9IGVsc2Uge1xuICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICAgIGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KTtcbiAgICB9XG4gIH1cbn07XG5cbkRPTS5xdWVyeUNoaWxkcmVuID0gZnVuY3Rpb24gKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZWxlbWVudC5jaGlsZE5vZGVzLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICByZXR1cm4gRE9NLm1hdGNoZXMoY2hpbGQsIHNlbGVjdG9yKTtcbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IERPTTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIEV2ZW50RWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gIHRoaXMuZXZlbnRzID0ge307XG59O1xuXG5FdmVudEVsZW1lbnQucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gIGlmICh0eXBlb2YgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW107XG4gIH1cbiAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGhhbmRsZXIpO1xuICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhhbmRsZXIsIGZhbHNlKTtcbn07XG5cbkV2ZW50RWxlbWVudC5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICB2YXIgaXNIYW5kbGVyUHJvdmlkZWQgPSAodHlwZW9mIGhhbmRsZXIgIT09ICd1bmRlZmluZWQnKTtcbiAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uZmlsdGVyKGZ1bmN0aW9uIChoZGxyKSB7XG4gICAgaWYgKGlzSGFuZGxlclByb3ZpZGVkICYmIGhkbHIgIT09IGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICB0aGlzLmVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGhkbHIsIGZhbHNlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sIHRoaXMpO1xufTtcblxuRXZlbnRFbGVtZW50LnByb3RvdHlwZS51bmJpbmRBbGwgPSBmdW5jdGlvbiAoKSB7XG4gIGZvciAodmFyIG5hbWUgaW4gdGhpcy5ldmVudHMpIHtcbiAgICB0aGlzLnVuYmluZChuYW1lKTtcbiAgfVxufTtcblxudmFyIEV2ZW50TWFuYWdlciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5ldmVudEVsZW1lbnRzID0gW107XG59O1xuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLmV2ZW50RWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHZhciBlZSA9IHRoaXMuZXZlbnRFbGVtZW50cy5maWx0ZXIoZnVuY3Rpb24gKGV2ZW50RWxlbWVudCkge1xuICAgIHJldHVybiBldmVudEVsZW1lbnQuZWxlbWVudCA9PT0gZWxlbWVudDtcbiAgfSlbMF07XG4gIGlmICh0eXBlb2YgZWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZWUgPSBuZXcgRXZlbnRFbGVtZW50KGVsZW1lbnQpO1xuICAgIHRoaXMuZXZlbnRFbGVtZW50cy5wdXNoKGVlKTtcbiAgfVxuICByZXR1cm4gZWU7XG59O1xuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gIHRoaXMuZXZlbnRFbGVtZW50KGVsZW1lbnQpLmJpbmQoZXZlbnROYW1lLCBoYW5kbGVyKTtcbn07XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICB0aGlzLmV2ZW50RWxlbWVudChlbGVtZW50KS51bmJpbmQoZXZlbnROYW1lLCBoYW5kbGVyKTtcbn07XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUudW5iaW5kQWxsID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZXZlbnRFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHRoaXMuZXZlbnRFbGVtZW50c1tpXS51bmJpbmRBbGwoKTtcbiAgfVxufTtcblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICB2YXIgZWUgPSB0aGlzLmV2ZW50RWxlbWVudChlbGVtZW50KTtcbiAgdmFyIG9uY2VIYW5kbGVyID0gZnVuY3Rpb24gKGUpIHtcbiAgICBlZS51bmJpbmQoZXZlbnROYW1lLCBvbmNlSGFuZGxlcik7XG4gICAgaGFuZGxlcihlKTtcbiAgfTtcbiAgZWUuYmluZChldmVudE5hbWUsIG9uY2VIYW5kbGVyKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRNYW5hZ2VyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHM0KCkge1xuICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcbiAgICAgICAgICAgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgfTtcbn0pKCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjbHMgPSByZXF1aXJlKCcuL2NsYXNzJyk7XG52YXIgZG9tID0gcmVxdWlyZSgnLi9kb20nKTtcblxudmFyIHRvSW50ID0gZXhwb3J0cy50b0ludCA9IGZ1bmN0aW9uICh4KSB7XG4gIHJldHVybiBwYXJzZUludCh4LCAxMCkgfHwgMDtcbn07XG5cbnZhciBjbG9uZSA9IGV4cG9ydHMuY2xvbmUgPSBmdW5jdGlvbiAob2JqKSB7XG4gIGlmICghb2JqKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0gZWxzZSBpZiAob2JqLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgIHJldHVybiBvYmoubWFwKGNsb25lKTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICByZXN1bHRba2V5XSA9IGNsb25lKG9ialtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG59O1xuXG5leHBvcnRzLmV4dGVuZCA9IGZ1bmN0aW9uIChvcmlnaW5hbCwgc291cmNlKSB7XG4gIHZhciByZXN1bHQgPSBjbG9uZShvcmlnaW5hbCk7XG4gIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICByZXN1bHRba2V5XSA9IGNsb25lKHNvdXJjZVtrZXldKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0cy5pc0VkaXRhYmxlID0gZnVuY3Rpb24gKGVsKSB7XG4gIHJldHVybiBkb20ubWF0Y2hlcyhlbCwgXCJpbnB1dCxbY29udGVudGVkaXRhYmxlXVwiKSB8fFxuICAgICAgICAgZG9tLm1hdGNoZXMoZWwsIFwic2VsZWN0LFtjb250ZW50ZWRpdGFibGVdXCIpIHx8XG4gICAgICAgICBkb20ubWF0Y2hlcyhlbCwgXCJ0ZXh0YXJlYSxbY29udGVudGVkaXRhYmxlXVwiKSB8fFxuICAgICAgICAgZG9tLm1hdGNoZXMoZWwsIFwiYnV0dG9uLFtjb250ZW50ZWRpdGFibGVdXCIpO1xufTtcblxuZXhwb3J0cy5yZW1vdmVQc0NsYXNzZXMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgY2xzTGlzdCA9IGNscy5saXN0KGVsZW1lbnQpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNsc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgY2xhc3NOYW1lID0gY2xzTGlzdFtpXTtcbiAgICBpZiAoY2xhc3NOYW1lLmluZGV4T2YoJ3BzLScpID09PSAwKSB7XG4gICAgICBjbHMucmVtb3ZlKGVsZW1lbnQsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9XG59O1xuXG5leHBvcnRzLm91dGVyV2lkdGggPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICByZXR1cm4gdG9JbnQoZG9tLmNzcyhlbGVtZW50LCAnd2lkdGgnKSkgK1xuICAgICAgICAgdG9JbnQoZG9tLmNzcyhlbGVtZW50LCAncGFkZGluZ0xlZnQnKSkgK1xuICAgICAgICAgdG9JbnQoZG9tLmNzcyhlbGVtZW50LCAncGFkZGluZ1JpZ2h0JykpICtcbiAgICAgICAgIHRvSW50KGRvbS5jc3MoZWxlbWVudCwgJ2JvcmRlckxlZnRXaWR0aCcpKSArXG4gICAgICAgICB0b0ludChkb20uY3NzKGVsZW1lbnQsICdib3JkZXJSaWdodFdpZHRoJykpO1xufTtcblxuZXhwb3J0cy5zdGFydFNjcm9sbGluZyA9IGZ1bmN0aW9uIChlbGVtZW50LCBheGlzKSB7XG4gIGNscy5hZGQoZWxlbWVudCwgJ3BzLWluLXNjcm9sbGluZycpO1xuICBpZiAodHlwZW9mIGF4aXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY2xzLmFkZChlbGVtZW50LCAncHMtJyArIGF4aXMpO1xuICB9IGVsc2Uge1xuICAgIGNscy5hZGQoZWxlbWVudCwgJ3BzLXgnKTtcbiAgICBjbHMuYWRkKGVsZW1lbnQsICdwcy15Jyk7XG4gIH1cbn07XG5cbmV4cG9ydHMuc3RvcFNjcm9sbGluZyA9IGZ1bmN0aW9uIChlbGVtZW50LCBheGlzKSB7XG4gIGNscy5yZW1vdmUoZWxlbWVudCwgJ3BzLWluLXNjcm9sbGluZycpO1xuICBpZiAodHlwZW9mIGF4aXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgY2xzLnJlbW92ZShlbGVtZW50LCAncHMtJyArIGF4aXMpO1xuICB9IGVsc2Uge1xuICAgIGNscy5yZW1vdmUoZWxlbWVudCwgJ3BzLXgnKTtcbiAgICBjbHMucmVtb3ZlKGVsZW1lbnQsICdwcy15Jyk7XG4gIH1cbn07XG5cbmV4cG9ydHMuZW52ID0ge1xuICBpc1dlYktpdDogJ1dlYmtpdEFwcGVhcmFuY2UnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSxcbiAgc3VwcG9ydHNUb3VjaDogKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpLFxuICBzdXBwb3J0c0llUG9pbnRlcjogd2luZG93Lm5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzICE9PSBudWxsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGVzdHJveSA9IHJlcXVpcmUoJy4vcGx1Z2luL2Rlc3Ryb3knKTtcbnZhciBpbml0aWFsaXplID0gcmVxdWlyZSgnLi9wbHVnaW4vaW5pdGlhbGl6ZScpO1xudmFyIHVwZGF0ZSA9IHJlcXVpcmUoJy4vcGx1Z2luL3VwZGF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaW5pdGlhbGl6ZTogaW5pdGlhbGl6ZSxcbiAgdXBkYXRlOiB1cGRhdGUsXG4gIGRlc3Ryb3k6IGRlc3Ryb3lcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBoYW5kbGVyczogWydjbGljay1yYWlsJywgJ2RyYWctc2Nyb2xsYmFyJywgJ2tleWJvYXJkJywgJ3doZWVsJywgJ3RvdWNoJ10sXG4gIG1heFNjcm9sbGJhckxlbmd0aDogbnVsbCxcbiAgbWluU2Nyb2xsYmFyTGVuZ3RoOiBudWxsLFxuICBzY3JvbGxYTWFyZ2luT2Zmc2V0OiAwLFxuICBzY3JvbGxZTWFyZ2luT2Zmc2V0OiAwLFxuICBzdXBwcmVzc1Njcm9sbFg6IGZhbHNlLFxuICBzdXBwcmVzc1Njcm9sbFk6IGZhbHNlLFxuICBzd2lwZVByb3BhZ2F0aW9uOiB0cnVlLFxuICB1c2VCb3RoV2hlZWxBeGVzOiBmYWxzZSxcbiAgd2hlZWxQcm9wYWdhdGlvbjogZmFsc2UsXG4gIHdoZWVsU3BlZWQ6IDEsXG4gIHRoZW1lOiAnZGVmYXVsdCdcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vbGliL2hlbHBlcicpO1xudmFyIGRvbSA9IHJlcXVpcmUoJy4uL2xpYi9kb20nKTtcbnZhciBpbnN0YW5jZXMgPSByZXF1aXJlKCcuL2luc3RhbmNlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHZhciBpID0gaW5zdGFuY2VzLmdldChlbGVtZW50KTtcblxuICBpZiAoIWkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpLmV2ZW50LnVuYmluZEFsbCgpO1xuICBkb20ucmVtb3ZlKGkuc2Nyb2xsYmFyWCk7XG4gIGRvbS5yZW1vdmUoaS5zY3JvbGxiYXJZKTtcbiAgZG9tLnJlbW92ZShpLnNjcm9sbGJhclhSYWlsKTtcbiAgZG9tLnJlbW92ZShpLnNjcm9sbGJhcllSYWlsKTtcbiAgXy5yZW1vdmVQc0NsYXNzZXMoZWxlbWVudCk7XG5cbiAgaW5zdGFuY2VzLnJlbW92ZShlbGVtZW50KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbnN0YW5jZXMgPSByZXF1aXJlKCcuLi9pbnN0YW5jZXMnKTtcbnZhciB1cGRhdGVHZW9tZXRyeSA9IHJlcXVpcmUoJy4uL3VwZGF0ZS1nZW9tZXRyeScpO1xudmFyIHVwZGF0ZVNjcm9sbCA9IHJlcXVpcmUoJy4uL3VwZGF0ZS1zY3JvbGwnKTtcblxuZnVuY3Rpb24gYmluZENsaWNrUmFpbEhhbmRsZXIoZWxlbWVudCwgaSkge1xuICBmdW5jdGlvbiBwYWdlT2Zmc2V0KGVsKSB7XG4gICAgcmV0dXJuIGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG4gIHZhciBzdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoZSkgeyBlLnN0b3BQcm9wYWdhdGlvbigpOyB9O1xuXG4gIGkuZXZlbnQuYmluZChpLnNjcm9sbGJhclksICdjbGljaycsIHN0b3BQcm9wYWdhdGlvbik7XG4gIGkuZXZlbnQuYmluZChpLnNjcm9sbGJhcllSYWlsLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBwb3NpdGlvblRvcCA9IGUucGFnZVkgLSB3aW5kb3cucGFnZVlPZmZzZXQgLSBwYWdlT2Zmc2V0KGkuc2Nyb2xsYmFyWVJhaWwpLnRvcDtcbiAgICB2YXIgZGlyZWN0aW9uID0gcG9zaXRpb25Ub3AgPiBpLnNjcm9sbGJhcllUb3AgPyAxIDogLTE7XG5cbiAgICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ3RvcCcsIGVsZW1lbnQuc2Nyb2xsVG9wICsgZGlyZWN0aW9uICogaS5jb250YWluZXJIZWlnaHQpO1xuICAgIHVwZGF0ZUdlb21ldHJ5KGVsZW1lbnQpO1xuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgaS5ldmVudC5iaW5kKGkuc2Nyb2xsYmFyWCwgJ2NsaWNrJywgc3RvcFByb3BhZ2F0aW9uKTtcbiAgaS5ldmVudC5iaW5kKGkuc2Nyb2xsYmFyWFJhaWwsICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHBvc2l0aW9uTGVmdCA9IGUucGFnZVggLSB3aW5kb3cucGFnZVhPZmZzZXQgLSBwYWdlT2Zmc2V0KGkuc2Nyb2xsYmFyWFJhaWwpLmxlZnQ7XG4gICAgdmFyIGRpcmVjdGlvbiA9IHBvc2l0aW9uTGVmdCA+IGkuc2Nyb2xsYmFyWExlZnQgPyAxIDogLTE7XG5cbiAgICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ2xlZnQnLCBlbGVtZW50LnNjcm9sbExlZnQgKyBkaXJlY3Rpb24gKiBpLmNvbnRhaW5lcldpZHRoKTtcbiAgICB1cGRhdGVHZW9tZXRyeShlbGVtZW50KTtcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHZhciBpID0gaW5zdGFuY2VzLmdldChlbGVtZW50KTtcbiAgYmluZENsaWNrUmFpbEhhbmRsZXIoZWxlbWVudCwgaSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uLy4uL2xpYi9oZWxwZXInKTtcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9saWIvZG9tJyk7XG52YXIgaW5zdGFuY2VzID0gcmVxdWlyZSgnLi4vaW5zdGFuY2VzJyk7XG52YXIgdXBkYXRlR2VvbWV0cnkgPSByZXF1aXJlKCcuLi91cGRhdGUtZ2VvbWV0cnknKTtcbnZhciB1cGRhdGVTY3JvbGwgPSByZXF1aXJlKCcuLi91cGRhdGUtc2Nyb2xsJyk7XG5cbmZ1bmN0aW9uIGJpbmRNb3VzZVNjcm9sbFhIYW5kbGVyKGVsZW1lbnQsIGkpIHtcbiAgdmFyIGN1cnJlbnRMZWZ0ID0gbnVsbDtcbiAgdmFyIGN1cnJlbnRQYWdlWCA9IG51bGw7XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2Nyb2xsTGVmdChkZWx0YVgpIHtcbiAgICB2YXIgbmV3TGVmdCA9IGN1cnJlbnRMZWZ0ICsgKGRlbHRhWCAqIGkucmFpbFhSYXRpbyk7XG4gICAgdmFyIG1heExlZnQgPSBNYXRoLm1heCgwLCBpLnNjcm9sbGJhclhSYWlsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQpICsgKGkucmFpbFhSYXRpbyAqIChpLnJhaWxYV2lkdGggLSBpLnNjcm9sbGJhclhXaWR0aCkpO1xuXG4gICAgaWYgKG5ld0xlZnQgPCAwKSB7XG4gICAgICBpLnNjcm9sbGJhclhMZWZ0ID0gMDtcbiAgICB9IGVsc2UgaWYgKG5ld0xlZnQgPiBtYXhMZWZ0KSB7XG4gICAgICBpLnNjcm9sbGJhclhMZWZ0ID0gbWF4TGVmdDtcbiAgICB9IGVsc2Uge1xuICAgICAgaS5zY3JvbGxiYXJYTGVmdCA9IG5ld0xlZnQ7XG4gICAgfVxuXG4gICAgdmFyIHNjcm9sbExlZnQgPSBfLnRvSW50KGkuc2Nyb2xsYmFyWExlZnQgKiAoaS5jb250ZW50V2lkdGggLSBpLmNvbnRhaW5lcldpZHRoKSAvIChpLmNvbnRhaW5lcldpZHRoIC0gKGkucmFpbFhSYXRpbyAqIGkuc2Nyb2xsYmFyWFdpZHRoKSkpIC0gaS5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQ7XG4gICAgdXBkYXRlU2Nyb2xsKGVsZW1lbnQsICdsZWZ0Jywgc2Nyb2xsTGVmdCk7XG4gIH1cblxuICB2YXIgbW91c2VNb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdXBkYXRlU2Nyb2xsTGVmdChlLnBhZ2VYIC0gY3VycmVudFBhZ2VYKTtcbiAgICB1cGRhdGVHZW9tZXRyeShlbGVtZW50KTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfTtcblxuICB2YXIgbW91c2VVcEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgXy5zdG9wU2Nyb2xsaW5nKGVsZW1lbnQsICd4Jyk7XG4gICAgaS5ldmVudC51bmJpbmQoaS5vd25lckRvY3VtZW50LCAnbW91c2Vtb3ZlJywgbW91c2VNb3ZlSGFuZGxlcik7XG4gIH07XG5cbiAgaS5ldmVudC5iaW5kKGkuc2Nyb2xsYmFyWCwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgY3VycmVudFBhZ2VYID0gZS5wYWdlWDtcbiAgICBjdXJyZW50TGVmdCA9IF8udG9JbnQoZG9tLmNzcyhpLnNjcm9sbGJhclgsICdsZWZ0JykpICogaS5yYWlsWFJhdGlvO1xuICAgIF8uc3RhcnRTY3JvbGxpbmcoZWxlbWVudCwgJ3gnKTtcblxuICAgIGkuZXZlbnQuYmluZChpLm93bmVyRG9jdW1lbnQsICdtb3VzZW1vdmUnLCBtb3VzZU1vdmVIYW5kbGVyKTtcbiAgICBpLmV2ZW50Lm9uY2UoaS5vd25lckRvY3VtZW50LCAnbW91c2V1cCcsIG1vdXNlVXBIYW5kbGVyKTtcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gYmluZE1vdXNlU2Nyb2xsWUhhbmRsZXIoZWxlbWVudCwgaSkge1xuICB2YXIgY3VycmVudFRvcCA9IG51bGw7XG4gIHZhciBjdXJyZW50UGFnZVkgPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbFRvcChkZWx0YVkpIHtcbiAgICB2YXIgbmV3VG9wID0gY3VycmVudFRvcCArIChkZWx0YVkgKiBpLnJhaWxZUmF0aW8pO1xuICAgIHZhciBtYXhUb3AgPSBNYXRoLm1heCgwLCBpLnNjcm9sbGJhcllSYWlsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCkgKyAoaS5yYWlsWVJhdGlvICogKGkucmFpbFlIZWlnaHQgLSBpLnNjcm9sbGJhcllIZWlnaHQpKTtcblxuICAgIGlmIChuZXdUb3AgPCAwKSB7XG4gICAgICBpLnNjcm9sbGJhcllUb3AgPSAwO1xuICAgIH0gZWxzZSBpZiAobmV3VG9wID4gbWF4VG9wKSB7XG4gICAgICBpLnNjcm9sbGJhcllUb3AgPSBtYXhUb3A7XG4gICAgfSBlbHNlIHtcbiAgICAgIGkuc2Nyb2xsYmFyWVRvcCA9IG5ld1RvcDtcbiAgICB9XG5cbiAgICB2YXIgc2Nyb2xsVG9wID0gXy50b0ludChpLnNjcm9sbGJhcllUb3AgKiAoaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQpIC8gKGkuY29udGFpbmVySGVpZ2h0IC0gKGkucmFpbFlSYXRpbyAqIGkuc2Nyb2xsYmFyWUhlaWdodCkpKTtcbiAgICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ3RvcCcsIHNjcm9sbFRvcCk7XG4gIH1cblxuICB2YXIgbW91c2VNb3ZlSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgdXBkYXRlU2Nyb2xsVG9wKGUucGFnZVkgLSBjdXJyZW50UGFnZVkpO1xuICAgIHVwZGF0ZUdlb21ldHJ5KGVsZW1lbnQpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9O1xuXG4gIHZhciBtb3VzZVVwSGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICBfLnN0b3BTY3JvbGxpbmcoZWxlbWVudCwgJ3knKTtcbiAgICBpLmV2ZW50LnVuYmluZChpLm93bmVyRG9jdW1lbnQsICdtb3VzZW1vdmUnLCBtb3VzZU1vdmVIYW5kbGVyKTtcbiAgfTtcblxuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJZLCAnbW91c2Vkb3duJywgZnVuY3Rpb24gKGUpIHtcbiAgICBjdXJyZW50UGFnZVkgPSBlLnBhZ2VZO1xuICAgIGN1cnJlbnRUb3AgPSBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJZLCAndG9wJykpICogaS5yYWlsWVJhdGlvO1xuICAgIF8uc3RhcnRTY3JvbGxpbmcoZWxlbWVudCwgJ3knKTtcblxuICAgIGkuZXZlbnQuYmluZChpLm93bmVyRG9jdW1lbnQsICdtb3VzZW1vdmUnLCBtb3VzZU1vdmVIYW5kbGVyKTtcbiAgICBpLmV2ZW50Lm9uY2UoaS5vd25lckRvY3VtZW50LCAnbW91c2V1cCcsIG1vdXNlVXBIYW5kbGVyKTtcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgaSA9IGluc3RhbmNlcy5nZXQoZWxlbWVudCk7XG4gIGJpbmRNb3VzZVNjcm9sbFhIYW5kbGVyKGVsZW1lbnQsIGkpO1xuICBiaW5kTW91c2VTY3JvbGxZSGFuZGxlcihlbGVtZW50LCBpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vLi4vbGliL2hlbHBlcicpO1xudmFyIGRvbSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9kb20nKTtcbnZhciBpbnN0YW5jZXMgPSByZXF1aXJlKCcuLi9pbnN0YW5jZXMnKTtcbnZhciB1cGRhdGVHZW9tZXRyeSA9IHJlcXVpcmUoJy4uL3VwZGF0ZS1nZW9tZXRyeScpO1xudmFyIHVwZGF0ZVNjcm9sbCA9IHJlcXVpcmUoJy4uL3VwZGF0ZS1zY3JvbGwnKTtcblxuZnVuY3Rpb24gYmluZEtleWJvYXJkSGFuZGxlcihlbGVtZW50LCBpKSB7XG4gIHZhciBob3ZlcmVkID0gZmFsc2U7XG4gIGkuZXZlbnQuYmluZChlbGVtZW50LCAnbW91c2VlbnRlcicsIGZ1bmN0aW9uICgpIHtcbiAgICBob3ZlcmVkID0gdHJ1ZTtcbiAgfSk7XG4gIGkuZXZlbnQuYmluZChlbGVtZW50LCAnbW91c2VsZWF2ZScsIGZ1bmN0aW9uICgpIHtcbiAgICBob3ZlcmVkID0gZmFsc2U7XG4gIH0pO1xuXG4gIHZhciBzaG91bGRQcmV2ZW50ID0gZmFsc2U7XG4gIGZ1bmN0aW9uIHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgdmFyIHNjcm9sbFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChkZWx0YVggPT09IDApIHtcbiAgICAgIGlmICghaS5zY3JvbGxiYXJZQWN0aXZlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICgoc2Nyb2xsVG9wID09PSAwICYmIGRlbHRhWSA+IDApIHx8IChzY3JvbGxUb3AgPj0gaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQgJiYgZGVsdGFZIDwgMCkpIHtcbiAgICAgICAgcmV0dXJuICFpLnNldHRpbmdzLndoZWVsUHJvcGFnYXRpb247XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNjcm9sbExlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgaWYgKGRlbHRhWSA9PT0gMCkge1xuICAgICAgaWYgKCFpLnNjcm9sbGJhclhBY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKChzY3JvbGxMZWZ0ID09PSAwICYmIGRlbHRhWCA8IDApIHx8IChzY3JvbGxMZWZ0ID49IGkuY29udGVudFdpZHRoIC0gaS5jb250YWluZXJXaWR0aCAmJiBkZWx0YVggPiAwKSkge1xuICAgICAgICByZXR1cm4gIWkuc2V0dGluZ3Mud2hlZWxQcm9wYWdhdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpLmV2ZW50LmJpbmQoaS5vd25lckRvY3VtZW50LCAna2V5ZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKChlLmlzRGVmYXVsdFByZXZlbnRlZCAmJiBlLmlzRGVmYXVsdFByZXZlbnRlZCgpKSB8fCBlLmRlZmF1bHRQcmV2ZW50ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgZm9jdXNlZCA9IGRvbS5tYXRjaGVzKGkuc2Nyb2xsYmFyWCwgJzpmb2N1cycpIHx8XG4gICAgICAgICAgICAgICAgICBkb20ubWF0Y2hlcyhpLnNjcm9sbGJhclksICc6Zm9jdXMnKTtcblxuICAgIGlmICghaG92ZXJlZCAmJiAhZm9jdXNlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBhY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA/IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgOiBpLm93bmVyRG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAoYWN0aXZlRWxlbWVudCkge1xuICAgICAgaWYgKGFjdGl2ZUVsZW1lbnQudGFnTmFtZSA9PT0gJ0lGUkFNRScpIHtcbiAgICAgICAgYWN0aXZlRWxlbWVudCA9IGFjdGl2ZUVsZW1lbnQuY29udGVudERvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBnbyBkZWVwZXIgaWYgZWxlbWVudCBpcyBhIHdlYmNvbXBvbmVudFxuICAgICAgICB3aGlsZSAoYWN0aXZlRWxlbWVudC5zaGFkb3dSb290KSB7XG4gICAgICAgICAgYWN0aXZlRWxlbWVudCA9IGFjdGl2ZUVsZW1lbnQuc2hhZG93Um9vdC5hY3RpdmVFbGVtZW50O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoXy5pc0VkaXRhYmxlKGFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZGVsdGFYID0gMDtcbiAgICB2YXIgZGVsdGFZID0gMDtcblxuICAgIHN3aXRjaCAoZS53aGljaCkge1xuICAgIGNhc2UgMzc6IC8vIGxlZnRcbiAgICAgIGlmIChlLm1ldGFLZXkpIHtcbiAgICAgICAgZGVsdGFYID0gLWkuY29udGVudFdpZHRoO1xuICAgICAgfSBlbHNlIGlmIChlLmFsdEtleSkge1xuICAgICAgICBkZWx0YVggPSAtaS5jb250YWluZXJXaWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbHRhWCA9IC0zMDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzg6IC8vIHVwXG4gICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgIGRlbHRhWSA9IGkuY29udGVudEhlaWdodDtcbiAgICAgIH0gZWxzZSBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgZGVsdGFZID0gaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWx0YVkgPSAzMDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzk6IC8vIHJpZ2h0XG4gICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgIGRlbHRhWCA9IGkuY29udGVudFdpZHRoO1xuICAgICAgfSBlbHNlIGlmIChlLmFsdEtleSkge1xuICAgICAgICBkZWx0YVggPSBpLmNvbnRhaW5lcldpZHRoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsdGFYID0gMzA7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIDQwOiAvLyBkb3duXG4gICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgIGRlbHRhWSA9IC1pLmNvbnRlbnRIZWlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgIGRlbHRhWSA9IC1pLmNvbnRhaW5lckhlaWdodDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbHRhWSA9IC0zMDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzM6IC8vIHBhZ2UgdXBcbiAgICAgIGRlbHRhWSA9IDkwO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzMjogLy8gc3BhY2UgYmFyXG4gICAgICBpZiAoZS5zaGlmdEtleSkge1xuICAgICAgICBkZWx0YVkgPSA5MDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbHRhWSA9IC05MDtcbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzQ6IC8vIHBhZ2UgZG93blxuICAgICAgZGVsdGFZID0gLTkwO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzNTogLy8gZW5kXG4gICAgICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgICAgIGRlbHRhWSA9IC1pLmNvbnRlbnRIZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWx0YVkgPSAtaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM2OiAvLyBob21lXG4gICAgICBpZiAoZS5jdHJsS2V5KSB7XG4gICAgICAgIGRlbHRhWSA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsdGFZID0gaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAndG9wJywgZWxlbWVudC5zY3JvbGxUb3AgLSBkZWx0YVkpO1xuICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAnbGVmdCcsIGVsZW1lbnQuc2Nyb2xsTGVmdCArIGRlbHRhWCk7XG4gICAgdXBkYXRlR2VvbWV0cnkoZWxlbWVudCk7XG5cbiAgICBzaG91bGRQcmV2ZW50ID0gc2hvdWxkUHJldmVudERlZmF1bHQoZGVsdGFYLCBkZWx0YVkpO1xuICAgIGlmIChzaG91bGRQcmV2ZW50KSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgaSA9IGluc3RhbmNlcy5nZXQoZWxlbWVudCk7XG4gIGJpbmRLZXlib2FyZEhhbmRsZXIoZWxlbWVudCwgaSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5zdGFuY2VzID0gcmVxdWlyZSgnLi4vaW5zdGFuY2VzJyk7XG52YXIgdXBkYXRlR2VvbWV0cnkgPSByZXF1aXJlKCcuLi91cGRhdGUtZ2VvbWV0cnknKTtcbnZhciB1cGRhdGVTY3JvbGwgPSByZXF1aXJlKCcuLi91cGRhdGUtc2Nyb2xsJyk7XG5cbmZ1bmN0aW9uIGJpbmRNb3VzZVdoZWVsSGFuZGxlcihlbGVtZW50LCBpKSB7XG4gIHZhciBzaG91bGRQcmV2ZW50ID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gc2hvdWxkUHJldmVudERlZmF1bHQoZGVsdGFYLCBkZWx0YVkpIHtcbiAgICB2YXIgc2Nyb2xsVG9wID0gZWxlbWVudC5zY3JvbGxUb3A7XG4gICAgaWYgKGRlbHRhWCA9PT0gMCkge1xuICAgICAgaWYgKCFpLnNjcm9sbGJhcllBY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKChzY3JvbGxUb3AgPT09IDAgJiYgZGVsdGFZID4gMCkgfHwgKHNjcm9sbFRvcCA+PSBpLmNvbnRlbnRIZWlnaHQgLSBpLmNvbnRhaW5lckhlaWdodCAmJiBkZWx0YVkgPCAwKSkge1xuICAgICAgICByZXR1cm4gIWkuc2V0dGluZ3Mud2hlZWxQcm9wYWdhdGlvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2Nyb2xsTGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICBpZiAoZGVsdGFZID09PSAwKSB7XG4gICAgICBpZiAoIWkuc2Nyb2xsYmFyWEFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoKHNjcm9sbExlZnQgPT09IDAgJiYgZGVsdGFYIDwgMCkgfHwgKHNjcm9sbExlZnQgPj0gaS5jb250ZW50V2lkdGggLSBpLmNvbnRhaW5lcldpZHRoICYmIGRlbHRhWCA+IDApKSB7XG4gICAgICAgIHJldHVybiAhaS5zZXR0aW5ncy53aGVlbFByb3BhZ2F0aW9uO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERlbHRhRnJvbUV2ZW50KGUpIHtcbiAgICB2YXIgZGVsdGFYID0gZS5kZWx0YVg7XG4gICAgdmFyIGRlbHRhWSA9IC0xICogZS5kZWx0YVk7XG5cbiAgICBpZiAodHlwZW9mIGRlbHRhWCA9PT0gXCJ1bmRlZmluZWRcIiB8fCB0eXBlb2YgZGVsdGFZID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAvLyBPUyBYIFNhZmFyaVxuICAgICAgZGVsdGFYID0gLTEgKiBlLndoZWVsRGVsdGFYIC8gNjtcbiAgICAgIGRlbHRhWSA9IGUud2hlZWxEZWx0YVkgLyA2O1xuICAgIH1cblxuICAgIGlmIChlLmRlbHRhTW9kZSAmJiBlLmRlbHRhTW9kZSA9PT0gMSkge1xuICAgICAgLy8gRmlyZWZveCBpbiBkZWx0YU1vZGUgMTogTGluZSBzY3JvbGxpbmdcbiAgICAgIGRlbHRhWCAqPSAxMDtcbiAgICAgIGRlbHRhWSAqPSAxMDtcbiAgICB9XG5cbiAgICBpZiAoZGVsdGFYICE9PSBkZWx0YVggJiYgZGVsdGFZICE9PSBkZWx0YVkvKiBOYU4gY2hlY2tzICovKSB7XG4gICAgICAvLyBJRSBpbiBzb21lIG1vdXNlIGRyaXZlcnNcbiAgICAgIGRlbHRhWCA9IDA7XG4gICAgICBkZWx0YVkgPSBlLndoZWVsRGVsdGE7XG4gICAgfVxuXG4gICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgIC8vIHJldmVyc2UgYXhpcyB3aXRoIHNoaWZ0IGtleVxuICAgICAgcmV0dXJuIFstZGVsdGFZLCAtZGVsdGFYXTtcbiAgICB9XG4gICAgcmV0dXJuIFtkZWx0YVgsIGRlbHRhWV07XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRCZUNvbnN1bWVkQnlDaGlsZChkZWx0YVgsIGRlbHRhWSkge1xuICAgIHZhciBjaGlsZCA9IGVsZW1lbnQucXVlcnlTZWxlY3RvcigndGV4dGFyZWE6aG92ZXIsIHNlbGVjdFttdWx0aXBsZV06aG92ZXIsIC5wcy1jaGlsZDpob3ZlcicpO1xuICAgIGlmIChjaGlsZCkge1xuICAgICAgaWYgKCF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjaGlsZCkub3ZlcmZsb3cubWF0Y2goLyhzY3JvbGx8YXV0bykvKSkge1xuICAgICAgICAvLyBpZiBub3Qgc2Nyb2xsYWJsZVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHZhciBtYXhTY3JvbGxUb3AgPSBjaGlsZC5zY3JvbGxIZWlnaHQgLSBjaGlsZC5jbGllbnRIZWlnaHQ7XG4gICAgICBpZiAobWF4U2Nyb2xsVG9wID4gMCkge1xuICAgICAgICBpZiAoIShjaGlsZC5zY3JvbGxUb3AgPT09IDAgJiYgZGVsdGFZID4gMCkgJiYgIShjaGlsZC5zY3JvbGxUb3AgPT09IG1heFNjcm9sbFRvcCAmJiBkZWx0YVkgPCAwKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgbWF4U2Nyb2xsTGVmdCA9IGNoaWxkLnNjcm9sbExlZnQgLSBjaGlsZC5jbGllbnRXaWR0aDtcbiAgICAgIGlmIChtYXhTY3JvbGxMZWZ0ID4gMCkge1xuICAgICAgICBpZiAoIShjaGlsZC5zY3JvbGxMZWZ0ID09PSAwICYmIGRlbHRhWCA8IDApICYmICEoY2hpbGQuc2Nyb2xsTGVmdCA9PT0gbWF4U2Nyb2xsTGVmdCAmJiBkZWx0YVggPiAwKSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdXNld2hlZWxIYW5kbGVyKGUpIHtcbiAgICB2YXIgZGVsdGEgPSBnZXREZWx0YUZyb21FdmVudChlKTtcblxuICAgIHZhciBkZWx0YVggPSBkZWx0YVswXTtcbiAgICB2YXIgZGVsdGFZID0gZGVsdGFbMV07XG5cbiAgICBpZiAoc2hvdWxkQmVDb25zdW1lZEJ5Q2hpbGQoZGVsdGFYLCBkZWx0YVkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2hvdWxkUHJldmVudCA9IGZhbHNlO1xuICAgIGlmICghaS5zZXR0aW5ncy51c2VCb3RoV2hlZWxBeGVzKSB7XG4gICAgICAvLyBkZWx0YVggd2lsbCBvbmx5IGJlIHVzZWQgZm9yIGhvcml6b250YWwgc2Nyb2xsaW5nIGFuZCBkZWx0YVkgd2lsbFxuICAgICAgLy8gb25seSBiZSB1c2VkIGZvciB2ZXJ0aWNhbCBzY3JvbGxpbmcgLSB0aGlzIGlzIHRoZSBkZWZhdWx0XG4gICAgICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ3RvcCcsIGVsZW1lbnQuc2Nyb2xsVG9wIC0gKGRlbHRhWSAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZCkpO1xuICAgICAgdXBkYXRlU2Nyb2xsKGVsZW1lbnQsICdsZWZ0JywgZWxlbWVudC5zY3JvbGxMZWZ0ICsgKGRlbHRhWCAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZCkpO1xuICAgIH0gZWxzZSBpZiAoaS5zY3JvbGxiYXJZQWN0aXZlICYmICFpLnNjcm9sbGJhclhBY3RpdmUpIHtcbiAgICAgIC8vIG9ubHkgdmVydGljYWwgc2Nyb2xsYmFyIGlzIGFjdGl2ZSBhbmQgdXNlQm90aFdoZWVsQXhlcyBvcHRpb24gaXNcbiAgICAgIC8vIGFjdGl2ZSwgc28gbGV0J3Mgc2Nyb2xsIHZlcnRpY2FsIGJhciB1c2luZyBib3RoIG1vdXNlIHdoZWVsIGF4ZXNcbiAgICAgIGlmIChkZWx0YVkpIHtcbiAgICAgICAgdXBkYXRlU2Nyb2xsKGVsZW1lbnQsICd0b3AnLCBlbGVtZW50LnNjcm9sbFRvcCAtIChkZWx0YVkgKiBpLnNldHRpbmdzLndoZWVsU3BlZWQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAndG9wJywgZWxlbWVudC5zY3JvbGxUb3AgKyAoZGVsdGFYICogaS5zZXR0aW5ncy53aGVlbFNwZWVkKSk7XG4gICAgICB9XG4gICAgICBzaG91bGRQcmV2ZW50ID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGkuc2Nyb2xsYmFyWEFjdGl2ZSAmJiAhaS5zY3JvbGxiYXJZQWN0aXZlKSB7XG4gICAgICAvLyB1c2VCb3RoV2hlZWxBeGVzIGFuZCBvbmx5IGhvcml6b250YWwgYmFyIGlzIGFjdGl2ZSwgc28gdXNlIGJvdGhcbiAgICAgIC8vIHdoZWVsIGF4ZXMgZm9yIGhvcml6b250YWwgYmFyXG4gICAgICBpZiAoZGVsdGFYKSB7XG4gICAgICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAnbGVmdCcsIGVsZW1lbnQuc2Nyb2xsTGVmdCArIChkZWx0YVggKiBpLnNldHRpbmdzLndoZWVsU3BlZWQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAnbGVmdCcsIGVsZW1lbnQuc2Nyb2xsTGVmdCAtIChkZWx0YVkgKiBpLnNldHRpbmdzLndoZWVsU3BlZWQpKTtcbiAgICAgIH1cbiAgICAgIHNob3VsZFByZXZlbnQgPSB0cnVlO1xuICAgIH1cblxuICAgIHVwZGF0ZUdlb21ldHJ5KGVsZW1lbnQpO1xuXG4gICAgc2hvdWxkUHJldmVudCA9IChzaG91bGRQcmV2ZW50IHx8IHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhWCwgZGVsdGFZKSk7XG4gICAgaWYgKHNob3VsZFByZXZlbnQpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cub253aGVlbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAnd2hlZWwnLCBtb3VzZXdoZWVsSGFuZGxlcik7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdy5vbm1vdXNld2hlZWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ21vdXNld2hlZWwnLCBtb3VzZXdoZWVsSGFuZGxlcik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgaSA9IGluc3RhbmNlcy5nZXQoZWxlbWVudCk7XG4gIGJpbmRNb3VzZVdoZWVsSGFuZGxlcihlbGVtZW50LCBpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbnN0YW5jZXMgPSByZXF1aXJlKCcuLi9pbnN0YW5jZXMnKTtcbnZhciB1cGRhdGVHZW9tZXRyeSA9IHJlcXVpcmUoJy4uL3VwZGF0ZS1nZW9tZXRyeScpO1xuXG5mdW5jdGlvbiBiaW5kTmF0aXZlU2Nyb2xsSGFuZGxlcihlbGVtZW50LCBpKSB7XG4gIGkuZXZlbnQuYmluZChlbGVtZW50LCAnc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgIHVwZGF0ZUdlb21ldHJ5KGVsZW1lbnQpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgaSA9IGluc3RhbmNlcy5nZXQoZWxlbWVudCk7XG4gIGJpbmROYXRpdmVTY3JvbGxIYW5kbGVyKGVsZW1lbnQsIGkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF8gPSByZXF1aXJlKCcuLi8uLi9saWIvaGVscGVyJyk7XG52YXIgaW5zdGFuY2VzID0gcmVxdWlyZSgnLi4vaW5zdGFuY2VzJyk7XG52YXIgdXBkYXRlR2VvbWV0cnkgPSByZXF1aXJlKCcuLi91cGRhdGUtZ2VvbWV0cnknKTtcbnZhciB1cGRhdGVTY3JvbGwgPSByZXF1aXJlKCcuLi91cGRhdGUtc2Nyb2xsJyk7XG5cbmZ1bmN0aW9uIGJpbmRTZWxlY3Rpb25IYW5kbGVyKGVsZW1lbnQsIGkpIHtcbiAgZnVuY3Rpb24gZ2V0UmFuZ2VOb2RlKCkge1xuICAgIHZhciBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uID8gd2luZG93LmdldFNlbGVjdGlvbigpIDpcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0U2VsZWN0aW9uID8gZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKCkgOiAnJztcbiAgICBpZiAoc2VsZWN0aW9uLnRvU3RyaW5nKCkubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApLmNvbW1vbkFuY2VzdG9yQ29udGFpbmVyO1xuICAgIH1cbiAgfVxuXG4gIHZhciBzY3JvbGxpbmdMb29wID0gbnVsbDtcbiAgdmFyIHNjcm9sbERpZmYgPSB7dG9wOiAwLCBsZWZ0OiAwfTtcbiAgZnVuY3Rpb24gc3RhcnRTY3JvbGxpbmcoKSB7XG4gICAgaWYgKCFzY3JvbGxpbmdMb29wKSB7XG4gICAgICBzY3JvbGxpbmdMb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWluc3RhbmNlcy5nZXQoZWxlbWVudCkpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKHNjcm9sbGluZ0xvb3ApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAndG9wJywgZWxlbWVudC5zY3JvbGxUb3AgKyBzY3JvbGxEaWZmLnRvcCk7XG4gICAgICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAnbGVmdCcsIGVsZW1lbnQuc2Nyb2xsTGVmdCArIHNjcm9sbERpZmYubGVmdCk7XG4gICAgICAgIHVwZGF0ZUdlb21ldHJ5KGVsZW1lbnQpO1xuICAgICAgfSwgNTApOyAvLyBldmVyeSAuMSBzZWNcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gc3RvcFNjcm9sbGluZygpIHtcbiAgICBpZiAoc2Nyb2xsaW5nTG9vcCkge1xuICAgICAgY2xlYXJJbnRlcnZhbChzY3JvbGxpbmdMb29wKTtcbiAgICAgIHNjcm9sbGluZ0xvb3AgPSBudWxsO1xuICAgIH1cbiAgICBfLnN0b3BTY3JvbGxpbmcoZWxlbWVudCk7XG4gIH1cblxuICB2YXIgaXNTZWxlY3RlZCA9IGZhbHNlO1xuICBpLmV2ZW50LmJpbmQoaS5vd25lckRvY3VtZW50LCAnc2VsZWN0aW9uY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgIGlmIChlbGVtZW50LmNvbnRhaW5zKGdldFJhbmdlTm9kZSgpKSkge1xuICAgICAgaXNTZWxlY3RlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHN0b3BTY3JvbGxpbmcoKTtcbiAgICB9XG4gIH0pO1xuICBpLmV2ZW50LmJpbmQod2luZG93LCAnbW91c2V1cCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgc3RvcFNjcm9sbGluZygpO1xuICAgIH1cbiAgfSk7XG4gIGkuZXZlbnQuYmluZCh3aW5kb3csICdrZXl1cCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoaXNTZWxlY3RlZCkge1xuICAgICAgaXNTZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgc3RvcFNjcm9sbGluZygpO1xuICAgIH1cbiAgfSk7XG5cbiAgaS5ldmVudC5iaW5kKHdpbmRvdywgJ21vdXNlbW92ZScsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIHZhciBtb3VzZVBvc2l0aW9uID0ge3g6IGUucGFnZVgsIHk6IGUucGFnZVl9O1xuICAgICAgdmFyIGNvbnRhaW5lckdlb21ldHJ5ID0ge1xuICAgICAgICBsZWZ0OiBlbGVtZW50Lm9mZnNldExlZnQsXG4gICAgICAgIHJpZ2h0OiBlbGVtZW50Lm9mZnNldExlZnQgKyBlbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgICAgICB0b3A6IGVsZW1lbnQub2Zmc2V0VG9wLFxuICAgICAgICBib3R0b206IGVsZW1lbnQub2Zmc2V0VG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgICAgIH07XG5cbiAgICAgIGlmIChtb3VzZVBvc2l0aW9uLnggPCBjb250YWluZXJHZW9tZXRyeS5sZWZ0ICsgMykge1xuICAgICAgICBzY3JvbGxEaWZmLmxlZnQgPSAtNTtcbiAgICAgICAgXy5zdGFydFNjcm9sbGluZyhlbGVtZW50LCAneCcpO1xuICAgICAgfSBlbHNlIGlmIChtb3VzZVBvc2l0aW9uLnggPiBjb250YWluZXJHZW9tZXRyeS5yaWdodCAtIDMpIHtcbiAgICAgICAgc2Nyb2xsRGlmZi5sZWZ0ID0gNTtcbiAgICAgICAgXy5zdGFydFNjcm9sbGluZyhlbGVtZW50LCAneCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsRGlmZi5sZWZ0ID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKG1vdXNlUG9zaXRpb24ueSA8IGNvbnRhaW5lckdlb21ldHJ5LnRvcCArIDMpIHtcbiAgICAgICAgaWYgKGNvbnRhaW5lckdlb21ldHJ5LnRvcCArIDMgLSBtb3VzZVBvc2l0aW9uLnkgPCA1KSB7XG4gICAgICAgICAgc2Nyb2xsRGlmZi50b3AgPSAtNTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzY3JvbGxEaWZmLnRvcCA9IC0yMDtcbiAgICAgICAgfVxuICAgICAgICBfLnN0YXJ0U2Nyb2xsaW5nKGVsZW1lbnQsICd5Jyk7XG4gICAgICB9IGVsc2UgaWYgKG1vdXNlUG9zaXRpb24ueSA+IGNvbnRhaW5lckdlb21ldHJ5LmJvdHRvbSAtIDMpIHtcbiAgICAgICAgaWYgKG1vdXNlUG9zaXRpb24ueSAtIGNvbnRhaW5lckdlb21ldHJ5LmJvdHRvbSArIDMgPCA1KSB7XG4gICAgICAgICAgc2Nyb2xsRGlmZi50b3AgPSA1O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNjcm9sbERpZmYudG9wID0gMjA7XG4gICAgICAgIH1cbiAgICAgICAgXy5zdGFydFNjcm9sbGluZyhlbGVtZW50LCAneScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2Nyb2xsRGlmZi50b3AgPSAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2Nyb2xsRGlmZi50b3AgPT09IDAgJiYgc2Nyb2xsRGlmZi5sZWZ0ID09PSAwKSB7XG4gICAgICAgIHN0b3BTY3JvbGxpbmcoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0YXJ0U2Nyb2xsaW5nKCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgaSA9IGluc3RhbmNlcy5nZXQoZWxlbWVudCk7XG4gIGJpbmRTZWxlY3Rpb25IYW5kbGVyKGVsZW1lbnQsIGkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF8gPSByZXF1aXJlKCcuLi8uLi9saWIvaGVscGVyJyk7XG52YXIgaW5zdGFuY2VzID0gcmVxdWlyZSgnLi4vaW5zdGFuY2VzJyk7XG52YXIgdXBkYXRlR2VvbWV0cnkgPSByZXF1aXJlKCcuLi91cGRhdGUtZ2VvbWV0cnknKTtcbnZhciB1cGRhdGVTY3JvbGwgPSByZXF1aXJlKCcuLi91cGRhdGUtc2Nyb2xsJyk7XG5cbmZ1bmN0aW9uIGJpbmRUb3VjaEhhbmRsZXIoZWxlbWVudCwgaSwgc3VwcG9ydHNUb3VjaCwgc3VwcG9ydHNJZVBvaW50ZXIpIHtcbiAgZnVuY3Rpb24gc2hvdWxkUHJldmVudERlZmF1bHQoZGVsdGFYLCBkZWx0YVkpIHtcbiAgICB2YXIgc2Nyb2xsVG9wID0gZWxlbWVudC5zY3JvbGxUb3A7XG4gICAgdmFyIHNjcm9sbExlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgdmFyIG1hZ25pdHVkZVggPSBNYXRoLmFicyhkZWx0YVgpO1xuICAgIHZhciBtYWduaXR1ZGVZID0gTWF0aC5hYnMoZGVsdGFZKTtcblxuICAgIGlmIChtYWduaXR1ZGVZID4gbWFnbml0dWRlWCkge1xuICAgICAgLy8gdXNlciBpcyBwZXJoYXBzIHRyeWluZyB0byBzd2lwZSB1cC9kb3duIHRoZSBwYWdlXG5cbiAgICAgIGlmICgoKGRlbHRhWSA8IDApICYmIChzY3JvbGxUb3AgPT09IGkuY29udGVudEhlaWdodCAtIGkuY29udGFpbmVySGVpZ2h0KSkgfHxcbiAgICAgICAgICAoKGRlbHRhWSA+IDApICYmIChzY3JvbGxUb3AgPT09IDApKSkge1xuICAgICAgICByZXR1cm4gIWkuc2V0dGluZ3Muc3dpcGVQcm9wYWdhdGlvbjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG1hZ25pdHVkZVggPiBtYWduaXR1ZGVZKSB7XG4gICAgICAvLyB1c2VyIGlzIHBlcmhhcHMgdHJ5aW5nIHRvIHN3aXBlIGxlZnQvcmlnaHQgYWNyb3NzIHRoZSBwYWdlXG5cbiAgICAgIGlmICgoKGRlbHRhWCA8IDApICYmIChzY3JvbGxMZWZ0ID09PSBpLmNvbnRlbnRXaWR0aCAtIGkuY29udGFpbmVyV2lkdGgpKSB8fFxuICAgICAgICAgICgoZGVsdGFYID4gMCkgJiYgKHNjcm9sbExlZnQgPT09IDApKSkge1xuICAgICAgICByZXR1cm4gIWkuc2V0dGluZ3Muc3dpcGVQcm9wYWdhdGlvbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5VG91Y2hNb3ZlKGRpZmZlcmVuY2VYLCBkaWZmZXJlbmNlWSkge1xuICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAndG9wJywgZWxlbWVudC5zY3JvbGxUb3AgLSBkaWZmZXJlbmNlWSk7XG4gICAgdXBkYXRlU2Nyb2xsKGVsZW1lbnQsICdsZWZ0JywgZWxlbWVudC5zY3JvbGxMZWZ0IC0gZGlmZmVyZW5jZVgpO1xuXG4gICAgdXBkYXRlR2VvbWV0cnkoZWxlbWVudCk7XG4gIH1cblxuICB2YXIgc3RhcnRPZmZzZXQgPSB7fTtcbiAgdmFyIHN0YXJ0VGltZSA9IDA7XG4gIHZhciBzcGVlZCA9IHt9O1xuICB2YXIgZWFzaW5nTG9vcCA9IG51bGw7XG4gIHZhciBpbkdsb2JhbFRvdWNoID0gZmFsc2U7XG4gIHZhciBpbkxvY2FsVG91Y2ggPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnbG9iYWxUb3VjaFN0YXJ0KCkge1xuICAgIGluR2xvYmFsVG91Y2ggPSB0cnVlO1xuICB9XG4gIGZ1bmN0aW9uIGdsb2JhbFRvdWNoRW5kKCkge1xuICAgIGluR2xvYmFsVG91Y2ggPSBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRvdWNoKGUpIHtcbiAgICBpZiAoZS50YXJnZXRUb3VjaGVzKSB7XG4gICAgICByZXR1cm4gZS50YXJnZXRUb3VjaGVzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBNYXliZSBJRSBwb2ludGVyXG4gICAgICByZXR1cm4gZTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gc2hvdWxkSGFuZGxlKGUpIHtcbiAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoZS5wb2ludGVyVHlwZSAmJiBlLnBvaW50ZXJUeXBlICE9PSAnbW91c2UnICYmIGUucG9pbnRlclR5cGUgIT09IGUuTVNQT0lOVEVSX1RZUEVfTU9VU0UpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gdG91Y2hTdGFydChlKSB7XG4gICAgaWYgKHNob3VsZEhhbmRsZShlKSkge1xuICAgICAgaW5Mb2NhbFRvdWNoID0gdHJ1ZTtcblxuICAgICAgdmFyIHRvdWNoID0gZ2V0VG91Y2goZSk7XG5cbiAgICAgIHN0YXJ0T2Zmc2V0LnBhZ2VYID0gdG91Y2gucGFnZVg7XG4gICAgICBzdGFydE9mZnNldC5wYWdlWSA9IHRvdWNoLnBhZ2VZO1xuXG4gICAgICBzdGFydFRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4gICAgICBpZiAoZWFzaW5nTG9vcCAhPT0gbnVsbCkge1xuICAgICAgICBjbGVhckludGVydmFsKGVhc2luZ0xvb3ApO1xuICAgICAgfVxuXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB0b3VjaE1vdmUoZSkge1xuICAgIGlmICghaW5Mb2NhbFRvdWNoICYmIGkuc2V0dGluZ3Muc3dpcGVQcm9wYWdhdGlvbikge1xuICAgICAgdG91Y2hTdGFydChlKTtcbiAgICB9XG4gICAgaWYgKCFpbkdsb2JhbFRvdWNoICYmIGluTG9jYWxUb3VjaCAmJiBzaG91bGRIYW5kbGUoZSkpIHtcbiAgICAgIHZhciB0b3VjaCA9IGdldFRvdWNoKGUpO1xuXG4gICAgICB2YXIgY3VycmVudE9mZnNldCA9IHtwYWdlWDogdG91Y2gucGFnZVgsIHBhZ2VZOiB0b3VjaC5wYWdlWX07XG5cbiAgICAgIHZhciBkaWZmZXJlbmNlWCA9IGN1cnJlbnRPZmZzZXQucGFnZVggLSBzdGFydE9mZnNldC5wYWdlWDtcbiAgICAgIHZhciBkaWZmZXJlbmNlWSA9IGN1cnJlbnRPZmZzZXQucGFnZVkgLSBzdGFydE9mZnNldC5wYWdlWTtcblxuICAgICAgYXBwbHlUb3VjaE1vdmUoZGlmZmVyZW5jZVgsIGRpZmZlcmVuY2VZKTtcbiAgICAgIHN0YXJ0T2Zmc2V0ID0gY3VycmVudE9mZnNldDtcblxuICAgICAgdmFyIGN1cnJlbnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICAgdmFyIHRpbWVHYXAgPSBjdXJyZW50VGltZSAtIHN0YXJ0VGltZTtcbiAgICAgIGlmICh0aW1lR2FwID4gMCkge1xuICAgICAgICBzcGVlZC54ID0gZGlmZmVyZW5jZVggLyB0aW1lR2FwO1xuICAgICAgICBzcGVlZC55ID0gZGlmZmVyZW5jZVkgLyB0aW1lR2FwO1xuICAgICAgICBzdGFydFRpbWUgPSBjdXJyZW50VGltZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNob3VsZFByZXZlbnREZWZhdWx0KGRpZmZlcmVuY2VYLCBkaWZmZXJlbmNlWSkpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB0b3VjaEVuZCgpIHtcbiAgICBpZiAoIWluR2xvYmFsVG91Y2ggJiYgaW5Mb2NhbFRvdWNoKSB7XG4gICAgICBpbkxvY2FsVG91Y2ggPSBmYWxzZTtcblxuICAgICAgY2xlYXJJbnRlcnZhbChlYXNpbmdMb29wKTtcbiAgICAgIGVhc2luZ0xvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghaW5zdGFuY2VzLmdldChlbGVtZW50KSkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFzcGVlZC54ICYmICFzcGVlZC55KSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChlYXNpbmdMb29wKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTWF0aC5hYnMoc3BlZWQueCkgPCAwLjAxICYmIE1hdGguYWJzKHNwZWVkLnkpIDwgMC4wMSkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlUb3VjaE1vdmUoc3BlZWQueCAqIDMwLCBzcGVlZC55ICogMzApO1xuXG4gICAgICAgIHNwZWVkLnggKj0gMC44O1xuICAgICAgICBzcGVlZC55ICo9IDAuODtcbiAgICAgIH0sIDEwKTtcbiAgICB9XG4gIH1cblxuICBpZiAoc3VwcG9ydHNUb3VjaCkge1xuICAgIGkuZXZlbnQuYmluZCh3aW5kb3csICd0b3VjaHN0YXJ0JywgZ2xvYmFsVG91Y2hTdGFydCk7XG4gICAgaS5ldmVudC5iaW5kKHdpbmRvdywgJ3RvdWNoZW5kJywgZ2xvYmFsVG91Y2hFbmQpO1xuICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAndG91Y2hzdGFydCcsIHRvdWNoU3RhcnQpO1xuICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAndG91Y2htb3ZlJywgdG91Y2hNb3ZlKTtcbiAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3RvdWNoZW5kJywgdG91Y2hFbmQpO1xuICB9IGVsc2UgaWYgKHN1cHBvcnRzSWVQb2ludGVyKSB7XG4gICAgaWYgKHdpbmRvdy5Qb2ludGVyRXZlbnQpIHtcbiAgICAgIGkuZXZlbnQuYmluZCh3aW5kb3csICdwb2ludGVyZG93bicsIGdsb2JhbFRvdWNoU3RhcnQpO1xuICAgICAgaS5ldmVudC5iaW5kKHdpbmRvdywgJ3BvaW50ZXJ1cCcsIGdsb2JhbFRvdWNoRW5kKTtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAncG9pbnRlcmRvd24nLCB0b3VjaFN0YXJ0KTtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAncG9pbnRlcm1vdmUnLCB0b3VjaE1vdmUpO1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdwb2ludGVydXAnLCB0b3VjaEVuZCk7XG4gICAgfSBlbHNlIGlmICh3aW5kb3cuTVNQb2ludGVyRXZlbnQpIHtcbiAgICAgIGkuZXZlbnQuYmluZCh3aW5kb3csICdNU1BvaW50ZXJEb3duJywgZ2xvYmFsVG91Y2hTdGFydCk7XG4gICAgICBpLmV2ZW50LmJpbmQod2luZG93LCAnTVNQb2ludGVyVXAnLCBnbG9iYWxUb3VjaEVuZCk7XG4gICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ01TUG9pbnRlckRvd24nLCB0b3VjaFN0YXJ0KTtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAnTVNQb2ludGVyTW92ZScsIHRvdWNoTW92ZSk7XG4gICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ01TUG9pbnRlclVwJywgdG91Y2hFbmQpO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIGlmICghXy5lbnYuc3VwcG9ydHNUb3VjaCAmJiAhXy5lbnYuc3VwcG9ydHNJZVBvaW50ZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgaSA9IGluc3RhbmNlcy5nZXQoZWxlbWVudCk7XG4gIGJpbmRUb3VjaEhhbmRsZXIoZWxlbWVudCwgaSwgXy5lbnYuc3VwcG9ydHNUb3VjaCwgXy5lbnYuc3VwcG9ydHNJZVBvaW50ZXIpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF8gPSByZXF1aXJlKCcuLi9saWIvaGVscGVyJyk7XG52YXIgY2xzID0gcmVxdWlyZSgnLi4vbGliL2NsYXNzJyk7XG52YXIgaW5zdGFuY2VzID0gcmVxdWlyZSgnLi9pbnN0YW5jZXMnKTtcbnZhciB1cGRhdGVHZW9tZXRyeSA9IHJlcXVpcmUoJy4vdXBkYXRlLWdlb21ldHJ5Jyk7XG5cbi8vIEhhbmRsZXJzXG52YXIgaGFuZGxlcnMgPSB7XG4gICdjbGljay1yYWlsJzogcmVxdWlyZSgnLi9oYW5kbGVyL2NsaWNrLXJhaWwnKSxcbiAgJ2RyYWctc2Nyb2xsYmFyJzogcmVxdWlyZSgnLi9oYW5kbGVyL2RyYWctc2Nyb2xsYmFyJyksXG4gICdrZXlib2FyZCc6IHJlcXVpcmUoJy4vaGFuZGxlci9rZXlib2FyZCcpLFxuICAnd2hlZWwnOiByZXF1aXJlKCcuL2hhbmRsZXIvbW91c2Utd2hlZWwnKSxcbiAgJ3RvdWNoJzogcmVxdWlyZSgnLi9oYW5kbGVyL3RvdWNoJyksXG4gICdzZWxlY3Rpb24nOiByZXF1aXJlKCcuL2hhbmRsZXIvc2VsZWN0aW9uJylcbn07XG52YXIgbmF0aXZlU2Nyb2xsSGFuZGxlciA9IHJlcXVpcmUoJy4vaGFuZGxlci9uYXRpdmUtc2Nyb2xsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnQsIHVzZXJTZXR0aW5ncykge1xuICB1c2VyU2V0dGluZ3MgPSB0eXBlb2YgdXNlclNldHRpbmdzID09PSAnb2JqZWN0JyA/IHVzZXJTZXR0aW5ncyA6IHt9O1xuXG4gIGNscy5hZGQoZWxlbWVudCwgJ3BzLWNvbnRhaW5lcicpO1xuXG4gIC8vIENyZWF0ZSBhIHBsdWdpbiBpbnN0YW5jZS5cbiAgdmFyIGkgPSBpbnN0YW5jZXMuYWRkKGVsZW1lbnQpO1xuXG4gIGkuc2V0dGluZ3MgPSBfLmV4dGVuZChpLnNldHRpbmdzLCB1c2VyU2V0dGluZ3MpO1xuICBjbHMuYWRkKGVsZW1lbnQsICdwcy10aGVtZS0nICsgaS5zZXR0aW5ncy50aGVtZSk7XG5cbiAgaS5zZXR0aW5ncy5oYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyTmFtZSkge1xuICAgIGhhbmRsZXJzW2hhbmRsZXJOYW1lXShlbGVtZW50KTtcbiAgfSk7XG5cbiAgbmF0aXZlU2Nyb2xsSGFuZGxlcihlbGVtZW50KTtcblxuICB1cGRhdGVHZW9tZXRyeShlbGVtZW50KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vbGliL2hlbHBlcicpO1xudmFyIGNscyA9IHJlcXVpcmUoJy4uL2xpYi9jbGFzcycpO1xudmFyIGRlZmF1bHRTZXR0aW5ncyA9IHJlcXVpcmUoJy4vZGVmYXVsdC1zZXR0aW5nJyk7XG52YXIgZG9tID0gcmVxdWlyZSgnLi4vbGliL2RvbScpO1xudmFyIEV2ZW50TWFuYWdlciA9IHJlcXVpcmUoJy4uL2xpYi9ldmVudC1tYW5hZ2VyJyk7XG52YXIgZ3VpZCA9IHJlcXVpcmUoJy4uL2xpYi9ndWlkJyk7XG5cbnZhciBpbnN0YW5jZXMgPSB7fTtcblxuZnVuY3Rpb24gSW5zdGFuY2UoZWxlbWVudCkge1xuICB2YXIgaSA9IHRoaXM7XG5cbiAgaS5zZXR0aW5ncyA9IF8uY2xvbmUoZGVmYXVsdFNldHRpbmdzKTtcbiAgaS5jb250YWluZXJXaWR0aCA9IG51bGw7XG4gIGkuY29udGFpbmVySGVpZ2h0ID0gbnVsbDtcbiAgaS5jb250ZW50V2lkdGggPSBudWxsO1xuICBpLmNvbnRlbnRIZWlnaHQgPSBudWxsO1xuXG4gIGkuaXNSdGwgPSBkb20uY3NzKGVsZW1lbnQsICdkaXJlY3Rpb24nKSA9PT0gXCJydGxcIjtcbiAgaS5pc05lZ2F0aXZlU2Nyb2xsID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3JpZ2luYWxTY3JvbGxMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIHZhciByZXN1bHQgPSBudWxsO1xuICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCA9IC0xO1xuICAgIHJlc3VsdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdCA8IDA7XG4gICAgZWxlbWVudC5zY3JvbGxMZWZ0ID0gb3JpZ2luYWxTY3JvbGxMZWZ0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pKCk7XG4gIGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ID0gaS5pc05lZ2F0aXZlU2Nyb2xsID8gZWxlbWVudC5zY3JvbGxXaWR0aCAtIGVsZW1lbnQuY2xpZW50V2lkdGggOiAwO1xuICBpLmV2ZW50ID0gbmV3IEV2ZW50TWFuYWdlcigpO1xuICBpLm93bmVyRG9jdW1lbnQgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQgfHwgZG9jdW1lbnQ7XG5cbiAgZnVuY3Rpb24gZm9jdXMoKSB7XG4gICAgY2xzLmFkZChlbGVtZW50LCAncHMtZm9jdXMnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJsdXIoKSB7XG4gICAgY2xzLnJlbW92ZShlbGVtZW50LCAncHMtZm9jdXMnKTtcbiAgfVxuXG4gIGkuc2Nyb2xsYmFyWFJhaWwgPSBkb20uYXBwZW5kVG8oZG9tLmUoJ2RpdicsICdwcy1zY3JvbGxiYXIteC1yYWlsJyksIGVsZW1lbnQpO1xuICBpLnNjcm9sbGJhclggPSBkb20uYXBwZW5kVG8oZG9tLmUoJ2RpdicsICdwcy1zY3JvbGxiYXIteCcpLCBpLnNjcm9sbGJhclhSYWlsKTtcbiAgaS5zY3JvbGxiYXJYLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgaS5ldmVudC5iaW5kKGkuc2Nyb2xsYmFyWCwgJ2ZvY3VzJywgZm9jdXMpO1xuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJYLCAnYmx1cicsIGJsdXIpO1xuICBpLnNjcm9sbGJhclhBY3RpdmUgPSBudWxsO1xuICBpLnNjcm9sbGJhclhXaWR0aCA9IG51bGw7XG4gIGkuc2Nyb2xsYmFyWExlZnQgPSBudWxsO1xuICBpLnNjcm9sbGJhclhCb3R0b20gPSBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJYUmFpbCwgJ2JvdHRvbScpKTtcbiAgaS5pc1Njcm9sbGJhclhVc2luZ0JvdHRvbSA9IGkuc2Nyb2xsYmFyWEJvdHRvbSA9PT0gaS5zY3JvbGxiYXJYQm90dG9tOyAvLyAhaXNOYU5cbiAgaS5zY3JvbGxiYXJYVG9wID0gaS5pc1Njcm9sbGJhclhVc2luZ0JvdHRvbSA/IG51bGwgOiBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJYUmFpbCwgJ3RvcCcpKTtcbiAgaS5yYWlsQm9yZGVyWFdpZHRoID0gXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsICdib3JkZXJMZWZ0V2lkdGgnKSkgKyBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJYUmFpbCwgJ2JvcmRlclJpZ2h0V2lkdGgnKSk7XG4gIC8vIFNldCByYWlsIHRvIGRpc3BsYXk6YmxvY2sgdG8gY2FsY3VsYXRlIG1hcmdpbnNcbiAgZG9tLmNzcyhpLnNjcm9sbGJhclhSYWlsLCAnZGlzcGxheScsICdibG9jaycpO1xuICBpLnJhaWxYTWFyZ2luV2lkdGggPSBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJYUmFpbCwgJ21hcmdpbkxlZnQnKSkgKyBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJYUmFpbCwgJ21hcmdpblJpZ2h0JykpO1xuICBkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsICdkaXNwbGF5JywgJycpO1xuICBpLnJhaWxYV2lkdGggPSBudWxsO1xuICBpLnJhaWxYUmF0aW8gPSBudWxsO1xuXG4gIGkuc2Nyb2xsYmFyWVJhaWwgPSBkb20uYXBwZW5kVG8oZG9tLmUoJ2RpdicsICdwcy1zY3JvbGxiYXIteS1yYWlsJyksIGVsZW1lbnQpO1xuICBpLnNjcm9sbGJhclkgPSBkb20uYXBwZW5kVG8oZG9tLmUoJ2RpdicsICdwcy1zY3JvbGxiYXIteScpLCBpLnNjcm9sbGJhcllSYWlsKTtcbiAgaS5zY3JvbGxiYXJZLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAwKTtcbiAgaS5ldmVudC5iaW5kKGkuc2Nyb2xsYmFyWSwgJ2ZvY3VzJywgZm9jdXMpO1xuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJZLCAnYmx1cicsIGJsdXIpO1xuICBpLnNjcm9sbGJhcllBY3RpdmUgPSBudWxsO1xuICBpLnNjcm9sbGJhcllIZWlnaHQgPSBudWxsO1xuICBpLnNjcm9sbGJhcllUb3AgPSBudWxsO1xuICBpLnNjcm9sbGJhcllSaWdodCA9IF8udG9JbnQoZG9tLmNzcyhpLnNjcm9sbGJhcllSYWlsLCAncmlnaHQnKSk7XG4gIGkuaXNTY3JvbGxiYXJZVXNpbmdSaWdodCA9IGkuc2Nyb2xsYmFyWVJpZ2h0ID09PSBpLnNjcm9sbGJhcllSaWdodDsgLy8gIWlzTmFOXG4gIGkuc2Nyb2xsYmFyWUxlZnQgPSBpLmlzU2Nyb2xsYmFyWVVzaW5nUmlnaHQgPyBudWxsIDogXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWVJhaWwsICdsZWZ0JykpO1xuICBpLnNjcm9sbGJhcllPdXRlcldpZHRoID0gaS5pc1J0bCA/IF8ub3V0ZXJXaWR0aChpLnNjcm9sbGJhclkpIDogbnVsbDtcbiAgaS5yYWlsQm9yZGVyWVdpZHRoID0gXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWVJhaWwsICdib3JkZXJUb3BXaWR0aCcpKSArIF8udG9JbnQoZG9tLmNzcyhpLnNjcm9sbGJhcllSYWlsLCAnYm9yZGVyQm90dG9tV2lkdGgnKSk7XG4gIGRvbS5jc3MoaS5zY3JvbGxiYXJZUmFpbCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgaS5yYWlsWU1hcmdpbkhlaWdodCA9IF8udG9JbnQoZG9tLmNzcyhpLnNjcm9sbGJhcllSYWlsLCAnbWFyZ2luVG9wJykpICsgXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWVJhaWwsICdtYXJnaW5Cb3R0b20nKSk7XG4gIGRvbS5jc3MoaS5zY3JvbGxiYXJZUmFpbCwgJ2Rpc3BsYXknLCAnJyk7XG4gIGkucmFpbFlIZWlnaHQgPSBudWxsO1xuICBpLnJhaWxZUmF0aW8gPSBudWxsO1xufVxuXG5mdW5jdGlvbiBnZXRJZChlbGVtZW50KSB7XG4gIHJldHVybiBlbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1wcy1pZCcpO1xufVxuXG5mdW5jdGlvbiBzZXRJZChlbGVtZW50LCBpZCkge1xuICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1wcy1pZCcsIGlkKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlSWQoZWxlbWVudCkge1xuICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1wcy1pZCcpO1xufVxuXG5leHBvcnRzLmFkZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHZhciBuZXdJZCA9IGd1aWQoKTtcbiAgc2V0SWQoZWxlbWVudCwgbmV3SWQpO1xuICBpbnN0YW5jZXNbbmV3SWRdID0gbmV3IEluc3RhbmNlKGVsZW1lbnQpO1xuICByZXR1cm4gaW5zdGFuY2VzW25ld0lkXTtcbn07XG5cbmV4cG9ydHMucmVtb3ZlID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgZGVsZXRlIGluc3RhbmNlc1tnZXRJZChlbGVtZW50KV07XG4gIHJlbW92ZUlkKGVsZW1lbnQpO1xufTtcblxuZXhwb3J0cy5nZXQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICByZXR1cm4gaW5zdGFuY2VzW2dldElkKGVsZW1lbnQpXTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vbGliL2hlbHBlcicpO1xudmFyIGNscyA9IHJlcXVpcmUoJy4uL2xpYi9jbGFzcycpO1xudmFyIGRvbSA9IHJlcXVpcmUoJy4uL2xpYi9kb20nKTtcbnZhciBpbnN0YW5jZXMgPSByZXF1aXJlKCcuL2luc3RhbmNlcycpO1xudmFyIHVwZGF0ZVNjcm9sbCA9IHJlcXVpcmUoJy4vdXBkYXRlLXNjcm9sbCcpO1xuXG5mdW5jdGlvbiBnZXRUaHVtYlNpemUoaSwgdGh1bWJTaXplKSB7XG4gIGlmIChpLnNldHRpbmdzLm1pblNjcm9sbGJhckxlbmd0aCkge1xuICAgIHRodW1iU2l6ZSA9IE1hdGgubWF4KHRodW1iU2l6ZSwgaS5zZXR0aW5ncy5taW5TY3JvbGxiYXJMZW5ndGgpO1xuICB9XG4gIGlmIChpLnNldHRpbmdzLm1heFNjcm9sbGJhckxlbmd0aCkge1xuICAgIHRodW1iU2l6ZSA9IE1hdGgubWluKHRodW1iU2l6ZSwgaS5zZXR0aW5ncy5tYXhTY3JvbGxiYXJMZW5ndGgpO1xuICB9XG4gIHJldHVybiB0aHVtYlNpemU7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNzcyhlbGVtZW50LCBpKSB7XG4gIHZhciB4UmFpbE9mZnNldCA9IHt3aWR0aDogaS5yYWlsWFdpZHRofTtcbiAgaWYgKGkuaXNSdGwpIHtcbiAgICB4UmFpbE9mZnNldC5sZWZ0ID0gaS5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgKyBlbGVtZW50LnNjcm9sbExlZnQgKyBpLmNvbnRhaW5lcldpZHRoIC0gaS5jb250ZW50V2lkdGg7XG4gIH0gZWxzZSB7XG4gICAgeFJhaWxPZmZzZXQubGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgfVxuICBpZiAoaS5pc1Njcm9sbGJhclhVc2luZ0JvdHRvbSkge1xuICAgIHhSYWlsT2Zmc2V0LmJvdHRvbSA9IGkuc2Nyb2xsYmFyWEJvdHRvbSAtIGVsZW1lbnQuc2Nyb2xsVG9wO1xuICB9IGVsc2Uge1xuICAgIHhSYWlsT2Zmc2V0LnRvcCA9IGkuc2Nyb2xsYmFyWFRvcCArIGVsZW1lbnQuc2Nyb2xsVG9wO1xuICB9XG4gIGRvbS5jc3MoaS5zY3JvbGxiYXJYUmFpbCwgeFJhaWxPZmZzZXQpO1xuXG4gIHZhciB5UmFpbE9mZnNldCA9IHt0b3A6IGVsZW1lbnQuc2Nyb2xsVG9wLCBoZWlnaHQ6IGkucmFpbFlIZWlnaHR9O1xuICBpZiAoaS5pc1Njcm9sbGJhcllVc2luZ1JpZ2h0KSB7XG4gICAgaWYgKGkuaXNSdGwpIHtcbiAgICAgIHlSYWlsT2Zmc2V0LnJpZ2h0ID0gaS5jb250ZW50V2lkdGggLSAoaS5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgKyBlbGVtZW50LnNjcm9sbExlZnQpIC0gaS5zY3JvbGxiYXJZUmlnaHQgLSBpLnNjcm9sbGJhcllPdXRlcldpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICB5UmFpbE9mZnNldC5yaWdodCA9IGkuc2Nyb2xsYmFyWVJpZ2h0IC0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaS5pc1J0bCkge1xuICAgICAgeVJhaWxPZmZzZXQubGVmdCA9IGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICsgZWxlbWVudC5zY3JvbGxMZWZ0ICsgaS5jb250YWluZXJXaWR0aCAqIDIgLSBpLmNvbnRlbnRXaWR0aCAtIGkuc2Nyb2xsYmFyWUxlZnQgLSBpLnNjcm9sbGJhcllPdXRlcldpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICB5UmFpbE9mZnNldC5sZWZ0ID0gaS5zY3JvbGxiYXJZTGVmdCArIGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICB9XG4gIH1cbiAgZG9tLmNzcyhpLnNjcm9sbGJhcllSYWlsLCB5UmFpbE9mZnNldCk7XG5cbiAgZG9tLmNzcyhpLnNjcm9sbGJhclgsIHtsZWZ0OiBpLnNjcm9sbGJhclhMZWZ0LCB3aWR0aDogaS5zY3JvbGxiYXJYV2lkdGggLSBpLnJhaWxCb3JkZXJYV2lkdGh9KTtcbiAgZG9tLmNzcyhpLnNjcm9sbGJhclksIHt0b3A6IGkuc2Nyb2xsYmFyWVRvcCwgaGVpZ2h0OiBpLnNjcm9sbGJhcllIZWlnaHQgLSBpLnJhaWxCb3JkZXJZV2lkdGh9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgaSA9IGluc3RhbmNlcy5nZXQoZWxlbWVudCk7XG5cbiAgaS5jb250YWluZXJXaWR0aCA9IGVsZW1lbnQuY2xpZW50V2lkdGg7XG4gIGkuY29udGFpbmVySGVpZ2h0ID0gZWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIGkuY29udGVudFdpZHRoID0gZWxlbWVudC5zY3JvbGxXaWR0aDtcbiAgaS5jb250ZW50SGVpZ2h0ID0gZWxlbWVudC5zY3JvbGxIZWlnaHQ7XG5cbiAgdmFyIGV4aXN0aW5nUmFpbHM7XG4gIGlmICghZWxlbWVudC5jb250YWlucyhpLnNjcm9sbGJhclhSYWlsKSkge1xuICAgIGV4aXN0aW5nUmFpbHMgPSBkb20ucXVlcnlDaGlsZHJlbihlbGVtZW50LCAnLnBzLXNjcm9sbGJhci14LXJhaWwnKTtcbiAgICBpZiAoZXhpc3RpbmdSYWlscy5sZW5ndGggPiAwKSB7XG4gICAgICBleGlzdGluZ1JhaWxzLmZvckVhY2goZnVuY3Rpb24gKHJhaWwpIHtcbiAgICAgICAgZG9tLnJlbW92ZShyYWlsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb20uYXBwZW5kVG8oaS5zY3JvbGxiYXJYUmFpbCwgZWxlbWVudCk7XG4gIH1cbiAgaWYgKCFlbGVtZW50LmNvbnRhaW5zKGkuc2Nyb2xsYmFyWVJhaWwpKSB7XG4gICAgZXhpc3RpbmdSYWlscyA9IGRvbS5xdWVyeUNoaWxkcmVuKGVsZW1lbnQsICcucHMtc2Nyb2xsYmFyLXktcmFpbCcpO1xuICAgIGlmIChleGlzdGluZ1JhaWxzLmxlbmd0aCA+IDApIHtcbiAgICAgIGV4aXN0aW5nUmFpbHMuZm9yRWFjaChmdW5jdGlvbiAocmFpbCkge1xuICAgICAgICBkb20ucmVtb3ZlKHJhaWwpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGRvbS5hcHBlbmRUbyhpLnNjcm9sbGJhcllSYWlsLCBlbGVtZW50KTtcbiAgfVxuXG4gIGlmICghaS5zZXR0aW5ncy5zdXBwcmVzc1Njcm9sbFggJiYgaS5jb250YWluZXJXaWR0aCArIGkuc2V0dGluZ3Muc2Nyb2xsWE1hcmdpbk9mZnNldCA8IGkuY29udGVudFdpZHRoKSB7XG4gICAgaS5zY3JvbGxiYXJYQWN0aXZlID0gdHJ1ZTtcbiAgICBpLnJhaWxYV2lkdGggPSBpLmNvbnRhaW5lcldpZHRoIC0gaS5yYWlsWE1hcmdpbldpZHRoO1xuICAgIGkucmFpbFhSYXRpbyA9IGkuY29udGFpbmVyV2lkdGggLyBpLnJhaWxYV2lkdGg7XG4gICAgaS5zY3JvbGxiYXJYV2lkdGggPSBnZXRUaHVtYlNpemUoaSwgXy50b0ludChpLnJhaWxYV2lkdGggKiBpLmNvbnRhaW5lcldpZHRoIC8gaS5jb250ZW50V2lkdGgpKTtcbiAgICBpLnNjcm9sbGJhclhMZWZ0ID0gXy50b0ludCgoaS5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgKyBlbGVtZW50LnNjcm9sbExlZnQpICogKGkucmFpbFhXaWR0aCAtIGkuc2Nyb2xsYmFyWFdpZHRoKSAvIChpLmNvbnRlbnRXaWR0aCAtIGkuY29udGFpbmVyV2lkdGgpKTtcbiAgfSBlbHNlIHtcbiAgICBpLnNjcm9sbGJhclhBY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmICghaS5zZXR0aW5ncy5zdXBwcmVzc1Njcm9sbFkgJiYgaS5jb250YWluZXJIZWlnaHQgKyBpLnNldHRpbmdzLnNjcm9sbFlNYXJnaW5PZmZzZXQgPCBpLmNvbnRlbnRIZWlnaHQpIHtcbiAgICBpLnNjcm9sbGJhcllBY3RpdmUgPSB0cnVlO1xuICAgIGkucmFpbFlIZWlnaHQgPSBpLmNvbnRhaW5lckhlaWdodCAtIGkucmFpbFlNYXJnaW5IZWlnaHQ7XG4gICAgaS5yYWlsWVJhdGlvID0gaS5jb250YWluZXJIZWlnaHQgLyBpLnJhaWxZSGVpZ2h0O1xuICAgIGkuc2Nyb2xsYmFyWUhlaWdodCA9IGdldFRodW1iU2l6ZShpLCBfLnRvSW50KGkucmFpbFlIZWlnaHQgKiBpLmNvbnRhaW5lckhlaWdodCAvIGkuY29udGVudEhlaWdodCkpO1xuICAgIGkuc2Nyb2xsYmFyWVRvcCA9IF8udG9JbnQoZWxlbWVudC5zY3JvbGxUb3AgKiAoaS5yYWlsWUhlaWdodCAtIGkuc2Nyb2xsYmFyWUhlaWdodCkgLyAoaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQpKTtcbiAgfSBlbHNlIHtcbiAgICBpLnNjcm9sbGJhcllBY3RpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIGlmIChpLnNjcm9sbGJhclhMZWZ0ID49IGkucmFpbFhXaWR0aCAtIGkuc2Nyb2xsYmFyWFdpZHRoKSB7XG4gICAgaS5zY3JvbGxiYXJYTGVmdCA9IGkucmFpbFhXaWR0aCAtIGkuc2Nyb2xsYmFyWFdpZHRoO1xuICB9XG4gIGlmIChpLnNjcm9sbGJhcllUb3AgPj0gaS5yYWlsWUhlaWdodCAtIGkuc2Nyb2xsYmFyWUhlaWdodCkge1xuICAgIGkuc2Nyb2xsYmFyWVRvcCA9IGkucmFpbFlIZWlnaHQgLSBpLnNjcm9sbGJhcllIZWlnaHQ7XG4gIH1cblxuICB1cGRhdGVDc3MoZWxlbWVudCwgaSk7XG5cbiAgaWYgKGkuc2Nyb2xsYmFyWEFjdGl2ZSkge1xuICAgIGNscy5hZGQoZWxlbWVudCwgJ3BzLWFjdGl2ZS14Jyk7XG4gIH0gZWxzZSB7XG4gICAgY2xzLnJlbW92ZShlbGVtZW50LCAncHMtYWN0aXZlLXgnKTtcbiAgICBpLnNjcm9sbGJhclhXaWR0aCA9IDA7XG4gICAgaS5zY3JvbGxiYXJYTGVmdCA9IDA7XG4gICAgdXBkYXRlU2Nyb2xsKGVsZW1lbnQsICdsZWZ0JywgMCk7XG4gIH1cbiAgaWYgKGkuc2Nyb2xsYmFyWUFjdGl2ZSkge1xuICAgIGNscy5hZGQoZWxlbWVudCwgJ3BzLWFjdGl2ZS15Jyk7XG4gIH0gZWxzZSB7XG4gICAgY2xzLnJlbW92ZShlbGVtZW50LCAncHMtYWN0aXZlLXknKTtcbiAgICBpLnNjcm9sbGJhcllIZWlnaHQgPSAwO1xuICAgIGkuc2Nyb2xsYmFyWVRvcCA9IDA7XG4gICAgdXBkYXRlU2Nyb2xsKGVsZW1lbnQsICd0b3AnLCAwKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluc3RhbmNlcyA9IHJlcXVpcmUoJy4vaW5zdGFuY2VzJyk7XG5cbnZhciBsYXN0VG9wO1xudmFyIGxhc3RMZWZ0O1xuXG52YXIgY3JlYXRlRE9NRXZlbnQgPSBmdW5jdGlvbiAobmFtZSkge1xuICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50XCIpO1xuICBldmVudC5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSk7XG4gIHJldHVybiBldmVudDtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF4aXMsIHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyAnWW91IG11c3QgcHJvdmlkZSBhbiBlbGVtZW50IHRvIHRoZSB1cGRhdGUtc2Nyb2xsIGZ1bmN0aW9uJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgYXhpcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyAnWW91IG11c3QgcHJvdmlkZSBhbiBheGlzIHRvIHRoZSB1cGRhdGUtc2Nyb2xsIGZ1bmN0aW9uJztcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgJ1lvdSBtdXN0IHByb3ZpZGUgYSB2YWx1ZSB0byB0aGUgdXBkYXRlLXNjcm9sbCBmdW5jdGlvbic7XG4gIH1cblxuICBpZiAoYXhpcyA9PT0gJ3RvcCcgJiYgdmFsdWUgPD0gMCkge1xuICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gdmFsdWUgPSAwOyAvLyBkb24ndCBhbGxvdyBuZWdhdGl2ZSBzY3JvbGxcbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRE9NRXZlbnQoJ3BzLXktcmVhY2gtc3RhcnQnKSk7XG4gIH1cblxuICBpZiAoYXhpcyA9PT0gJ2xlZnQnICYmIHZhbHVlIDw9IDApIHtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgPSB2YWx1ZSA9IDA7IC8vIGRvbid0IGFsbG93IG5lZ2F0aXZlIHNjcm9sbFxuICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVET01FdmVudCgncHMteC1yZWFjaC1zdGFydCcpKTtcbiAgfVxuXG4gIHZhciBpID0gaW5zdGFuY2VzLmdldChlbGVtZW50KTtcblxuICBpZiAoYXhpcyA9PT0gJ3RvcCcgJiYgdmFsdWUgPj0gaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQpIHtcbiAgICAvLyBkb24ndCBhbGxvdyBzY3JvbGwgcGFzdCBjb250YWluZXJcbiAgICB2YWx1ZSA9IGkuY29udGVudEhlaWdodCAtIGkuY29udGFpbmVySGVpZ2h0O1xuICAgIGlmICh2YWx1ZSAtIGVsZW1lbnQuc2Nyb2xsVG9wIDw9IDEpIHtcbiAgICAgIC8vIG1pdGlnYXRlcyByb3VuZGluZyBlcnJvcnMgb24gbm9uLXN1YnBpeGVsIHNjcm9sbCB2YWx1ZXNcbiAgICAgIHZhbHVlID0gZWxlbWVudC5zY3JvbGxUb3A7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gdmFsdWU7XG4gICAgfVxuICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVET01FdmVudCgncHMteS1yZWFjaC1lbmQnKSk7XG4gIH1cblxuICBpZiAoYXhpcyA9PT0gJ2xlZnQnICYmIHZhbHVlID49IGkuY29udGVudFdpZHRoIC0gaS5jb250YWluZXJXaWR0aCkge1xuICAgIC8vIGRvbid0IGFsbG93IHNjcm9sbCBwYXN0IGNvbnRhaW5lclxuICAgIHZhbHVlID0gaS5jb250ZW50V2lkdGggLSBpLmNvbnRhaW5lcldpZHRoO1xuICAgIGlmICh2YWx1ZSAtIGVsZW1lbnQuc2Nyb2xsTGVmdCA8PSAxKSB7XG4gICAgICAvLyBtaXRpZ2F0ZXMgcm91bmRpbmcgZXJyb3JzIG9uIG5vbi1zdWJwaXhlbCBzY3JvbGwgdmFsdWVzXG4gICAgICB2YWx1ZSA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5zY3JvbGxMZWZ0ID0gdmFsdWU7XG4gICAgfVxuICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVET01FdmVudCgncHMteC1yZWFjaC1lbmQnKSk7XG4gIH1cblxuICBpZiAoIWxhc3RUb3ApIHtcbiAgICBsYXN0VG9wID0gZWxlbWVudC5zY3JvbGxUb3A7XG4gIH1cblxuICBpZiAoIWxhc3RMZWZ0KSB7XG4gICAgbGFzdExlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gIH1cblxuICBpZiAoYXhpcyA9PT0gJ3RvcCcgJiYgdmFsdWUgPCBsYXN0VG9wKSB7XG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZURPTUV2ZW50KCdwcy1zY3JvbGwtdXAnKSk7XG4gIH1cblxuICBpZiAoYXhpcyA9PT0gJ3RvcCcgJiYgdmFsdWUgPiBsYXN0VG9wKSB7XG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZURPTUV2ZW50KCdwcy1zY3JvbGwtZG93bicpKTtcbiAgfVxuXG4gIGlmIChheGlzID09PSAnbGVmdCcgJiYgdmFsdWUgPCBsYXN0TGVmdCkge1xuICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVET01FdmVudCgncHMtc2Nyb2xsLWxlZnQnKSk7XG4gIH1cblxuICBpZiAoYXhpcyA9PT0gJ2xlZnQnICYmIHZhbHVlID4gbGFzdExlZnQpIHtcbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRE9NRXZlbnQoJ3BzLXNjcm9sbC1yaWdodCcpKTtcbiAgfVxuXG4gIGlmIChheGlzID09PSAndG9wJykge1xuICAgIGVsZW1lbnQuc2Nyb2xsVG9wID0gbGFzdFRvcCA9IHZhbHVlO1xuICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVET01FdmVudCgncHMtc2Nyb2xsLXknKSk7XG4gIH1cblxuICBpZiAoYXhpcyA9PT0gJ2xlZnQnKSB7XG4gICAgZWxlbWVudC5zY3JvbGxMZWZ0ID0gbGFzdExlZnQgPSB2YWx1ZTtcbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRE9NRXZlbnQoJ3BzLXNjcm9sbC14JykpO1xuICB9XG5cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vbGliL2hlbHBlcicpO1xudmFyIGRvbSA9IHJlcXVpcmUoJy4uL2xpYi9kb20nKTtcbnZhciBpbnN0YW5jZXMgPSByZXF1aXJlKCcuL2luc3RhbmNlcycpO1xudmFyIHVwZGF0ZUdlb21ldHJ5ID0gcmVxdWlyZSgnLi91cGRhdGUtZ2VvbWV0cnknKTtcbnZhciB1cGRhdGVTY3JvbGwgPSByZXF1aXJlKCcuL3VwZGF0ZS1zY3JvbGwnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgaSA9IGluc3RhbmNlcy5nZXQoZWxlbWVudCk7XG5cbiAgaWYgKCFpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gUmVjYWxjdWF0ZSBuZWdhdGl2ZSBzY3JvbGxMZWZ0IGFkanVzdG1lbnRcbiAgaS5uZWdhdGl2ZVNjcm9sbEFkanVzdG1lbnQgPSBpLmlzTmVnYXRpdmVTY3JvbGwgPyBlbGVtZW50LnNjcm9sbFdpZHRoIC0gZWxlbWVudC5jbGllbnRXaWR0aCA6IDA7XG5cbiAgLy8gUmVjYWxjdWxhdGUgcmFpbCBtYXJnaW5zXG4gIGRvbS5jc3MoaS5zY3JvbGxiYXJYUmFpbCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgZG9tLmNzcyhpLnNjcm9sbGJhcllSYWlsLCAnZGlzcGxheScsICdibG9jaycpO1xuICBpLnJhaWxYTWFyZ2luV2lkdGggPSBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJYUmFpbCwgJ21hcmdpbkxlZnQnKSkgKyBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJYUmFpbCwgJ21hcmdpblJpZ2h0JykpO1xuICBpLnJhaWxZTWFyZ2luSGVpZ2h0ID0gXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWVJhaWwsICdtYXJnaW5Ub3AnKSkgKyBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJZUmFpbCwgJ21hcmdpbkJvdHRvbScpKTtcblxuICAvLyBIaWRlIHNjcm9sbGJhcnMgbm90IHRvIGFmZmVjdCBzY3JvbGxXaWR0aCBhbmQgc2Nyb2xsSGVpZ2h0XG4gIGRvbS5jc3MoaS5zY3JvbGxiYXJYUmFpbCwgJ2Rpc3BsYXknLCAnbm9uZScpO1xuICBkb20uY3NzKGkuc2Nyb2xsYmFyWVJhaWwsICdkaXNwbGF5JywgJ25vbmUnKTtcblxuICB1cGRhdGVHZW9tZXRyeShlbGVtZW50KTtcblxuICAvLyBVcGRhdGUgdG9wL2xlZnQgc2Nyb2xsIHRvIHRyaWdnZXIgZXZlbnRzXG4gIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAndG9wJywgZWxlbWVudC5zY3JvbGxUb3ApO1xuICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ2xlZnQnLCBlbGVtZW50LnNjcm9sbExlZnQpO1xuXG4gIGRvbS5jc3MoaS5zY3JvbGxiYXJYUmFpbCwgJ2Rpc3BsYXknLCAnJyk7XG4gIGRvbS5jc3MoaS5zY3JvbGxiYXJZUmFpbCwgJ2Rpc3BsYXknLCAnJyk7XG59O1xuIl19

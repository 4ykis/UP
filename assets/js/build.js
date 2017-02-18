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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvanMvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9qcXVlcnkuanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL2FkYXB0b3IvanF1ZXJ5LmpzIiwibm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL3NyYy9qcy9saWIvY2xhc3MuanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL2xpYi9kb20uanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL2xpYi9ldmVudC1tYW5hZ2VyLmpzIiwibm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL3NyYy9qcy9saWIvZ3VpZC5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvbGliL2hlbHBlci5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvbWFpbi5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvcGx1Z2luL2RlZmF1bHQtc2V0dGluZy5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvcGx1Z2luL2Rlc3Ryb3kuanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL3BsdWdpbi9oYW5kbGVyL2NsaWNrLXJhaWwuanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL3BsdWdpbi9oYW5kbGVyL2RyYWctc2Nyb2xsYmFyLmpzIiwibm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL3NyYy9qcy9wbHVnaW4vaGFuZGxlci9rZXlib2FyZC5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvcGx1Z2luL2hhbmRsZXIvbW91c2Utd2hlZWwuanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL3BsdWdpbi9oYW5kbGVyL25hdGl2ZS1zY3JvbGwuanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL3BsdWdpbi9oYW5kbGVyL3NlbGVjdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvcGx1Z2luL2hhbmRsZXIvdG91Y2guanMiLCJub2RlX21vZHVsZXMvcGVyZmVjdC1zY3JvbGxiYXIvc3JjL2pzL3BsdWdpbi9pbml0aWFsaXplLmpzIiwibm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL3NyYy9qcy9wbHVnaW4vaW5zdGFuY2VzLmpzIiwibm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL3NyYy9qcy9wbHVnaW4vdXBkYXRlLWdlb21ldHJ5LmpzIiwibm9kZV9tb2R1bGVzL3BlcmZlY3Qtc2Nyb2xsYmFyL3NyYy9qcy9wbHVnaW4vdXBkYXRlLXNjcm9sbC5qcyIsIm5vZGVfbW9kdWxlcy9wZXJmZWN0LXNjcm9sbGJhci9zcmMvanMvcGx1Z2luL3VwZGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcblxuLy8gJCA9IHJlcXVpcmUoJ2pxdWVyeScpO1xucmVxdWlyZSgncGVyZmVjdC1zY3JvbGxiYXIvanF1ZXJ5JykoJCk7XG4vLyByZXF1aXJlKCcvbm9kZV9tb2R1bGVzL3NsaWNrLWNhcm91c2VsL3NsaWNrL3NsaWNrLm1pbicpKCQpO1xudmFyIGZyb250ID0ge1xuICAgIEZ1bGxQYWdlOmZ1bmN0aW9uIChibG9jaykge1xuICAgICAgICBibG9jay5mdWxscGFnZSh7XG4gICAgICAgICAgICBmaXhlZEVsZW1lbnRzOiAnI2Z1bGwtcGFnZS1uYXYnLFxuICAgICAgICAgICAgcmVzaXplIDogdHJ1ZSxcbiAgICAgICAgICAgIGFuY2hvcnM6WydpbnRybycsICdnYW1lcycsJ2Fib3V0LXVzJywgJ2NvbnRhY3RzJ10sXG4gICAgICAgICAgICBtZW51OiAnI2Z1bGwtcGFnZS1uYXYnLFxuICAgICAgICAgICAgYW5pbWF0ZUFuY2hvcjogZmFsc2UsXG4gICAgICAgICAgICBjc3MzOnRydWVcbiAgICAgICAgICAgIC8vIHNjcm9sbEJhcjp0cnVlXG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgU2xpZGVyOntcbiAgICAgIGludHJvOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkKCcuanMtc2xpZGVyLWludHJvJykuc2xpY2soe1xuICAgICAgICAgICAgICBhcnJvd3M6ZmFsc2UsXG4gICAgICAgICAgICAgIGRvdHM6ZmFsc2UsXG4gICAgICAgICAgICAgIGF1dG9wbGF5OnRydWUsXG4gICAgICAgICAgICAgIGluZmluaXRlOnRydWVcbiAgICAgICAgICB9KVxuICAgICAgfVxuICAgIH0sXG4gICAgU2Nyb2xsOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgJCgnLmpzLXBmLXNjcm9sbCcpLnBlcmZlY3RTY3JvbGxiYXIoKTtcbiAgICB9LFxuICAgIE1hc29ucnk6ZnVuY3Rpb24gKCkge1xuICAgICAgICAkKCcuanMtbWFzLWdhbWVzJykud2F0ZXJmYWxsKCk7XG4gICAgfSxcbiAgICBzbGlkZUJnOmZ1bmN0aW9uICgpIHtcbiAgICAgICAgJC5lYWNoKCQoJy5qcy1zbGlkZS1iZycpLGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzcmMgPSAkKHRoaXMpLmZpbmQoJ2ltZycpLmF0dHIoJ2RhdGEtc3JjJyk7XG4gICAgICAgICAgICAkKHRoaXMpLmNzcyh7XG4gICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtaW1hZ2UnOid1cmwoXCInK3NyYysnXCIpJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBQYXJ0aWNsZXM6ZnVuY3Rpb24gKCkge1xuICAgICAgICBwYXJ0aWNsZXNKUy5sb2FkKCdwYXJ0aWNsZXMtanMnLCAnYXNzZXRzL2pzb24vcGFydGljbGVzanMtY29uZmlnLmpzb24nLCBmdW5jdGlvbigpIHt9KTtcbiAgICB9LFxuICAgIHBvcHVwOntcbiAgICAgICAgYWJvdXQ6ZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgJCgnLmpzLW9wZW4tbW9kYWwnKS5vbignY2xpY2snLGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9ICQodGhpcykuYXR0cignZGF0YS1tb2RhbC1saW5rJyk7XG4gICAgICAgICAgICAgICAgJCgnW2RhdGEtbW9kYWw9XCInK2RhdGErJ1wiXScpLmZhZGVJbigpO1xuICAgICAgICAgICAgICAgICQoJy5hYm91dCcpLmFkZENsYXNzKCdvcGVuLW1vZGFsJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQoJy5qcy1jbG9zZS1tb2RhbCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNsb3Nlc3QoJy5qcy1tb2RhbCcpLmZhZGVPdXQoKTtcbiAgICAgICAgICAgICAgICAkKCcuYWJvdXQnKS5yZW1vdmVDbGFzcygnb3Blbi1tb2RhbCcpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH0sXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLlNsaWRlci5pbnRybygpO1xuICAgICAgICB0aGlzLnNsaWRlQmcoKTtcbiAgICAgICAgdGhpcy5GdWxsUGFnZSgkKCcjZnVsbHBhZ2UnKSk7XG4gICAgICAgIHRoaXMuTWFzb25yeSgpO1xuICAgICAgICB0aGlzLlBhcnRpY2xlcygpO1xuICAgICAgICB0aGlzLlNjcm9sbCgpO1xuICAgICAgICB0aGlzLnBvcHVwLmFib3V0KCk7XG4gICAgfVxufTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgZnJvbnQuaW5pdCgpO1xuXG59KTtcblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zcmMvanMvYWRhcHRvci9qcXVlcnknKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHBzID0gcmVxdWlyZSgnLi4vbWFpbicpO1xudmFyIHBzSW5zdGFuY2VzID0gcmVxdWlyZSgnLi4vcGx1Z2luL2luc3RhbmNlcycpO1xuXG5mdW5jdGlvbiBtb3VudEpRdWVyeShqUXVlcnkpIHtcbiAgalF1ZXJ5LmZuLnBlcmZlY3RTY3JvbGxiYXIgPSBmdW5jdGlvbiAoc2V0dGluZ09yQ29tbWFuZCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKHR5cGVvZiBzZXR0aW5nT3JDb21tYW5kID09PSAnb2JqZWN0JyB8fFxuICAgICAgICAgIHR5cGVvZiBzZXR0aW5nT3JDb21tYW5kID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAvLyBJZiBpdCdzIGFuIG9iamVjdCBvciBub25lLCBpbml0aWFsaXplLlxuICAgICAgICB2YXIgc2V0dGluZ3MgPSBzZXR0aW5nT3JDb21tYW5kO1xuXG4gICAgICAgIGlmICghcHNJbnN0YW5jZXMuZ2V0KHRoaXMpKSB7XG4gICAgICAgICAgcHMuaW5pdGlhbGl6ZSh0aGlzLCBzZXR0aW5ncyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFVubGVzcywgaXQgbWF5IGJlIGEgY29tbWFuZC5cbiAgICAgICAgdmFyIGNvbW1hbmQgPSBzZXR0aW5nT3JDb21tYW5kO1xuXG4gICAgICAgIGlmIChjb21tYW5kID09PSAndXBkYXRlJykge1xuICAgICAgICAgIHBzLnVwZGF0ZSh0aGlzKTtcbiAgICAgICAgfSBlbHNlIGlmIChjb21tYW5kID09PSAnZGVzdHJveScpIHtcbiAgICAgICAgICBwcy5kZXN0cm95KHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59XG5cbmlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICBkZWZpbmUoWydqcXVlcnknXSwgbW91bnRKUXVlcnkpO1xufSBlbHNlIHtcbiAgdmFyIGpxID0gd2luZG93LmpRdWVyeSA/IHdpbmRvdy5qUXVlcnkgOiB3aW5kb3cuJDtcbiAgaWYgKHR5cGVvZiBqcSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBtb3VudEpRdWVyeShqcSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtb3VudEpRdWVyeTtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb2xkQWRkKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICB2YXIgY2xhc3NlcyA9IGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gIGlmIChjbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKSA8IDApIHtcbiAgICBjbGFzc2VzLnB1c2goY2xhc3NOYW1lKTtcbiAgfVxuICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzZXMuam9pbignICcpO1xufVxuXG5mdW5jdGlvbiBvbGRSZW1vdmUoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIHZhciBjbGFzc2VzID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgdmFyIGlkeCA9IGNsYXNzZXMuaW5kZXhPZihjbGFzc05hbWUpO1xuICBpZiAoaWR4ID49IDApIHtcbiAgICBjbGFzc2VzLnNwbGljZShpZHgsIDEpO1xuICB9XG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3Nlcy5qb2luKCcgJyk7XG59XG5cbmV4cG9ydHMuYWRkID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xuICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICBvbGRBZGQoZWxlbWVudCwgY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuZXhwb3J0cy5yZW1vdmUgPSBmdW5jdGlvbiAoZWxlbWVudCwgY2xhc3NOYW1lKSB7XG4gIGlmIChlbGVtZW50LmNsYXNzTGlzdCkge1xuICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIG9sZFJlbW92ZShlbGVtZW50LCBjbGFzc05hbWUpO1xuICB9XG59O1xuXG5leHBvcnRzLmxpc3QgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmFwcGx5KGVsZW1lbnQuY2xhc3NMaXN0KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIERPTSA9IHt9O1xuXG5ET00uZSA9IGZ1bmN0aW9uICh0YWdOYW1lLCBjbGFzc05hbWUpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUpO1xuICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG5ET00uYXBwZW5kVG8gPSBmdW5jdGlvbiAoY2hpbGQsIHBhcmVudCkge1xuICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICByZXR1cm4gY2hpbGQ7XG59O1xuXG5mdW5jdGlvbiBjc3NHZXQoZWxlbWVudCwgc3R5bGVOYW1lKSB7XG4gIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KVtzdHlsZU5hbWVdO1xufVxuXG5mdW5jdGlvbiBjc3NTZXQoZWxlbWVudCwgc3R5bGVOYW1lLCBzdHlsZVZhbHVlKSB7XG4gIGlmICh0eXBlb2Ygc3R5bGVWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICBzdHlsZVZhbHVlID0gc3R5bGVWYWx1ZS50b1N0cmluZygpICsgJ3B4JztcbiAgfVxuICBlbGVtZW50LnN0eWxlW3N0eWxlTmFtZV0gPSBzdHlsZVZhbHVlO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZnVuY3Rpb24gY3NzTXVsdGlTZXQoZWxlbWVudCwgb2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgICB2YWwgPSB2YWwudG9TdHJpbmcoKSArICdweCc7XG4gICAgfVxuICAgIGVsZW1lbnQuc3R5bGVba2V5XSA9IHZhbDtcbiAgfVxuICByZXR1cm4gZWxlbWVudDtcbn1cblxuRE9NLmNzcyA9IGZ1bmN0aW9uIChlbGVtZW50LCBzdHlsZU5hbWVPck9iamVjdCwgc3R5bGVWYWx1ZSkge1xuICBpZiAodHlwZW9mIHN0eWxlTmFtZU9yT2JqZWN0ID09PSAnb2JqZWN0Jykge1xuICAgIC8vIG11bHRpcGxlIHNldCB3aXRoIG9iamVjdFxuICAgIHJldHVybiBjc3NNdWx0aVNldChlbGVtZW50LCBzdHlsZU5hbWVPck9iamVjdCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBzdHlsZVZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIGNzc0dldChlbGVtZW50LCBzdHlsZU5hbWVPck9iamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBjc3NTZXQoZWxlbWVudCwgc3R5bGVOYW1lT3JPYmplY3QsIHN0eWxlVmFsdWUpO1xuICAgIH1cbiAgfVxufTtcblxuRE9NLm1hdGNoZXMgPSBmdW5jdGlvbiAoZWxlbWVudCwgcXVlcnkpIHtcbiAgaWYgKHR5cGVvZiBlbGVtZW50Lm1hdGNoZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQubWF0Y2hlcyhxdWVyeSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50Lm1hdGNoZXNTZWxlY3RvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBlbGVtZW50Lm1hdGNoZXNTZWxlY3RvcihxdWVyeSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gZWxlbWVudC53ZWJraXRNYXRjaGVzU2VsZWN0b3IocXVlcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnQubW96TWF0Y2hlc1NlbGVjdG9yKHF1ZXJ5KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50Lm1zTWF0Y2hlc1NlbGVjdG9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnQubXNNYXRjaGVzU2VsZWN0b3IocXVlcnkpO1xuICAgIH1cbiAgfVxufTtcblxuRE9NLnJlbW92ZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIGlmICh0eXBlb2YgZWxlbWVudC5yZW1vdmUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoZWxlbWVudC5wYXJlbnROb2RlKSB7XG4gICAgICBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuICB9XG59O1xuXG5ET00ucXVlcnlDaGlsZHJlbiA9IGZ1bmN0aW9uIChlbGVtZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGVsZW1lbnQuY2hpbGROb2RlcywgZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgcmV0dXJuIERPTS5tYXRjaGVzKGNoaWxkLCBzZWxlY3Rvcik7XG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBET007XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBFdmVudEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICB0aGlzLmV2ZW50cyA9IHt9O1xufTtcblxuRXZlbnRFbGVtZW50LnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICBpZiAodHlwZW9mIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdO1xuICB9XG4gIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLCBmYWxzZSk7XG59O1xuXG5FdmVudEVsZW1lbnQucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgdmFyIGlzSGFuZGxlclByb3ZpZGVkID0gKHR5cGVvZiBoYW5kbGVyICE9PSAndW5kZWZpbmVkJyk7XG4gIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmZpbHRlcihmdW5jdGlvbiAoaGRscikge1xuICAgIGlmIChpc0hhbmRsZXJQcm92aWRlZCAmJiBoZGxyICE9PSBoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoZGxyLCBmYWxzZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LCB0aGlzKTtcbn07XG5cbkV2ZW50RWxlbWVudC5wcm90b3R5cGUudW5iaW5kQWxsID0gZnVuY3Rpb24gKCkge1xuICBmb3IgKHZhciBuYW1lIGluIHRoaXMuZXZlbnRzKSB7XG4gICAgdGhpcy51bmJpbmQobmFtZSk7XG4gIH1cbn07XG5cbnZhciBFdmVudE1hbmFnZXIgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZXZlbnRFbGVtZW50cyA9IFtdO1xufTtcblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5ldmVudEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgZWUgPSB0aGlzLmV2ZW50RWxlbWVudHMuZmlsdGVyKGZ1bmN0aW9uIChldmVudEVsZW1lbnQpIHtcbiAgICByZXR1cm4gZXZlbnRFbGVtZW50LmVsZW1lbnQgPT09IGVsZW1lbnQ7XG4gIH0pWzBdO1xuICBpZiAodHlwZW9mIGVlID09PSAndW5kZWZpbmVkJykge1xuICAgIGVlID0gbmV3IEV2ZW50RWxlbWVudChlbGVtZW50KTtcbiAgICB0aGlzLmV2ZW50RWxlbWVudHMucHVzaChlZSk7XG4gIH1cbiAgcmV0dXJuIGVlO1xufTtcblxuRXZlbnRNYW5hZ2VyLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICB0aGlzLmV2ZW50RWxlbWVudChlbGVtZW50KS5iaW5kKGV2ZW50TmFtZSwgaGFuZGxlcik7XG59O1xuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uIChlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgdGhpcy5ldmVudEVsZW1lbnQoZWxlbWVudCkudW5iaW5kKGV2ZW50TmFtZSwgaGFuZGxlcik7XG59O1xuXG5FdmVudE1hbmFnZXIucHJvdG90eXBlLnVuYmluZEFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmV2ZW50RWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB0aGlzLmV2ZW50RWxlbWVudHNbaV0udW5iaW5kQWxsKCk7XG4gIH1cbn07XG5cbkV2ZW50TWFuYWdlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIChlbGVtZW50LCBldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgdmFyIGVlID0gdGhpcy5ldmVudEVsZW1lbnQoZWxlbWVudCk7XG4gIHZhciBvbmNlSGFuZGxlciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgZWUudW5iaW5kKGV2ZW50TmFtZSwgb25jZUhhbmRsZXIpO1xuICAgIGhhbmRsZXIoZSk7XG4gIH07XG4gIGVlLmJpbmQoZXZlbnROYW1lLCBvbmNlSGFuZGxlcik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50TWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzNCgpIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArXG4gICAgICAgICAgIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG4gIH07XG59KSgpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2xzID0gcmVxdWlyZSgnLi9jbGFzcycpO1xudmFyIGRvbSA9IHJlcXVpcmUoJy4vZG9tJyk7XG5cbnZhciB0b0ludCA9IGV4cG9ydHMudG9JbnQgPSBmdW5jdGlvbiAoeCkge1xuICByZXR1cm4gcGFyc2VJbnQoeCwgMTApIHx8IDA7XG59O1xuXG52YXIgY2xvbmUgPSBleHBvcnRzLmNsb25lID0gZnVuY3Rpb24gKG9iaikge1xuICBpZiAoIW9iaikge1xuICAgIHJldHVybiBudWxsO1xuICB9IGVsc2UgaWYgKG9iai5jb25zdHJ1Y3RvciA9PT0gQXJyYXkpIHtcbiAgICByZXR1cm4gb2JqLm1hcChjbG9uZSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgICAgcmVzdWx0W2tleV0gPSBjbG9uZShvYmpba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfVxufTtcblxuZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbiAob3JpZ2luYWwsIHNvdXJjZSkge1xuICB2YXIgcmVzdWx0ID0gY2xvbmUob3JpZ2luYWwpO1xuICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgcmVzdWx0W2tleV0gPSBjbG9uZShzb3VyY2Vba2V5XSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmV4cG9ydHMuaXNFZGl0YWJsZSA9IGZ1bmN0aW9uIChlbCkge1xuICByZXR1cm4gZG9tLm1hdGNoZXMoZWwsIFwiaW5wdXQsW2NvbnRlbnRlZGl0YWJsZV1cIikgfHxcbiAgICAgICAgIGRvbS5tYXRjaGVzKGVsLCBcInNlbGVjdCxbY29udGVudGVkaXRhYmxlXVwiKSB8fFxuICAgICAgICAgZG9tLm1hdGNoZXMoZWwsIFwidGV4dGFyZWEsW2NvbnRlbnRlZGl0YWJsZV1cIikgfHxcbiAgICAgICAgIGRvbS5tYXRjaGVzKGVsLCBcImJ1dHRvbixbY29udGVudGVkaXRhYmxlXVwiKTtcbn07XG5cbmV4cG9ydHMucmVtb3ZlUHNDbGFzc2VzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgdmFyIGNsc0xpc3QgPSBjbHMubGlzdChlbGVtZW50KTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbHNMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGNsYXNzTmFtZSA9IGNsc0xpc3RbaV07XG4gICAgaWYgKGNsYXNzTmFtZS5pbmRleE9mKCdwcy0nKSA9PT0gMCkge1xuICAgICAgY2xzLnJlbW92ZShlbGVtZW50LCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfVxufTtcblxuZXhwb3J0cy5vdXRlcldpZHRoID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgcmV0dXJuIHRvSW50KGRvbS5jc3MoZWxlbWVudCwgJ3dpZHRoJykpICtcbiAgICAgICAgIHRvSW50KGRvbS5jc3MoZWxlbWVudCwgJ3BhZGRpbmdMZWZ0JykpICtcbiAgICAgICAgIHRvSW50KGRvbS5jc3MoZWxlbWVudCwgJ3BhZGRpbmdSaWdodCcpKSArXG4gICAgICAgICB0b0ludChkb20uY3NzKGVsZW1lbnQsICdib3JkZXJMZWZ0V2lkdGgnKSkgK1xuICAgICAgICAgdG9JbnQoZG9tLmNzcyhlbGVtZW50LCAnYm9yZGVyUmlnaHRXaWR0aCcpKTtcbn07XG5cbmV4cG9ydHMuc3RhcnRTY3JvbGxpbmcgPSBmdW5jdGlvbiAoZWxlbWVudCwgYXhpcykge1xuICBjbHMuYWRkKGVsZW1lbnQsICdwcy1pbi1zY3JvbGxpbmcnKTtcbiAgaWYgKHR5cGVvZiBheGlzICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNscy5hZGQoZWxlbWVudCwgJ3BzLScgKyBheGlzKTtcbiAgfSBlbHNlIHtcbiAgICBjbHMuYWRkKGVsZW1lbnQsICdwcy14Jyk7XG4gICAgY2xzLmFkZChlbGVtZW50LCAncHMteScpO1xuICB9XG59O1xuXG5leHBvcnRzLnN0b3BTY3JvbGxpbmcgPSBmdW5jdGlvbiAoZWxlbWVudCwgYXhpcykge1xuICBjbHMucmVtb3ZlKGVsZW1lbnQsICdwcy1pbi1zY3JvbGxpbmcnKTtcbiAgaWYgKHR5cGVvZiBheGlzICE9PSAndW5kZWZpbmVkJykge1xuICAgIGNscy5yZW1vdmUoZWxlbWVudCwgJ3BzLScgKyBheGlzKTtcbiAgfSBlbHNlIHtcbiAgICBjbHMucmVtb3ZlKGVsZW1lbnQsICdwcy14Jyk7XG4gICAgY2xzLnJlbW92ZShlbGVtZW50LCAncHMteScpO1xuICB9XG59O1xuXG5leHBvcnRzLmVudiA9IHtcbiAgaXNXZWJLaXQ6ICdXZWJraXRBcHBlYXJhbmNlJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUsXG4gIHN1cHBvcnRzVG91Y2g6ICgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKSxcbiAgc3VwcG9ydHNJZVBvaW50ZXI6IHdpbmRvdy5uYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyAhPT0gbnVsbFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGRlc3Ryb3kgPSByZXF1aXJlKCcuL3BsdWdpbi9kZXN0cm95Jyk7XG52YXIgaW5pdGlhbGl6ZSA9IHJlcXVpcmUoJy4vcGx1Z2luL2luaXRpYWxpemUnKTtcbnZhciB1cGRhdGUgPSByZXF1aXJlKCcuL3BsdWdpbi91cGRhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGluaXRpYWxpemU6IGluaXRpYWxpemUsXG4gIHVwZGF0ZTogdXBkYXRlLFxuICBkZXN0cm95OiBkZXN0cm95XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaGFuZGxlcnM6IFsnY2xpY2stcmFpbCcsICdkcmFnLXNjcm9sbGJhcicsICdrZXlib2FyZCcsICd3aGVlbCcsICd0b3VjaCddLFxuICBtYXhTY3JvbGxiYXJMZW5ndGg6IG51bGwsXG4gIG1pblNjcm9sbGJhckxlbmd0aDogbnVsbCxcbiAgc2Nyb2xsWE1hcmdpbk9mZnNldDogMCxcbiAgc2Nyb2xsWU1hcmdpbk9mZnNldDogMCxcbiAgc3VwcHJlc3NTY3JvbGxYOiBmYWxzZSxcbiAgc3VwcHJlc3NTY3JvbGxZOiBmYWxzZSxcbiAgc3dpcGVQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgdXNlQm90aFdoZWVsQXhlczogZmFsc2UsXG4gIHdoZWVsUHJvcGFnYXRpb246IGZhbHNlLFxuICB3aGVlbFNwZWVkOiAxLFxuICB0aGVtZTogJ2RlZmF1bHQnXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uL2xpYi9oZWxwZXInKTtcbnZhciBkb20gPSByZXF1aXJlKCcuLi9saWIvZG9tJyk7XG52YXIgaW5zdGFuY2VzID0gcmVxdWlyZSgnLi9pbnN0YW5jZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgaSA9IGluc3RhbmNlcy5nZXQoZWxlbWVudCk7XG5cbiAgaWYgKCFpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaS5ldmVudC51bmJpbmRBbGwoKTtcbiAgZG9tLnJlbW92ZShpLnNjcm9sbGJhclgpO1xuICBkb20ucmVtb3ZlKGkuc2Nyb2xsYmFyWSk7XG4gIGRvbS5yZW1vdmUoaS5zY3JvbGxiYXJYUmFpbCk7XG4gIGRvbS5yZW1vdmUoaS5zY3JvbGxiYXJZUmFpbCk7XG4gIF8ucmVtb3ZlUHNDbGFzc2VzKGVsZW1lbnQpO1xuXG4gIGluc3RhbmNlcy5yZW1vdmUoZWxlbWVudCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5zdGFuY2VzID0gcmVxdWlyZSgnLi4vaW5zdGFuY2VzJyk7XG52YXIgdXBkYXRlR2VvbWV0cnkgPSByZXF1aXJlKCcuLi91cGRhdGUtZ2VvbWV0cnknKTtcbnZhciB1cGRhdGVTY3JvbGwgPSByZXF1aXJlKCcuLi91cGRhdGUtc2Nyb2xsJyk7XG5cbmZ1bmN0aW9uIGJpbmRDbGlja1JhaWxIYW5kbGVyKGVsZW1lbnQsIGkpIHtcbiAgZnVuY3Rpb24gcGFnZU9mZnNldChlbCkge1xuICAgIHJldHVybiBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfVxuICB2YXIgc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKGUpIHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfTtcblxuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJZLCAnY2xpY2snLCBzdG9wUHJvcGFnYXRpb24pO1xuICBpLmV2ZW50LmJpbmQoaS5zY3JvbGxiYXJZUmFpbCwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgcG9zaXRpb25Ub3AgPSBlLnBhZ2VZIC0gd2luZG93LnBhZ2VZT2Zmc2V0IC0gcGFnZU9mZnNldChpLnNjcm9sbGJhcllSYWlsKS50b3A7XG4gICAgdmFyIGRpcmVjdGlvbiA9IHBvc2l0aW9uVG9wID4gaS5zY3JvbGxiYXJZVG9wID8gMSA6IC0xO1xuXG4gICAgdXBkYXRlU2Nyb2xsKGVsZW1lbnQsICd0b3AnLCBlbGVtZW50LnNjcm9sbFRvcCArIGRpcmVjdGlvbiAqIGkuY29udGFpbmVySGVpZ2h0KTtcbiAgICB1cGRhdGVHZW9tZXRyeShlbGVtZW50KTtcblxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIGkuZXZlbnQuYmluZChpLnNjcm9sbGJhclgsICdjbGljaycsIHN0b3BQcm9wYWdhdGlvbik7XG4gIGkuZXZlbnQuYmluZChpLnNjcm9sbGJhclhSYWlsLCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciBwb3NpdGlvbkxlZnQgPSBlLnBhZ2VYIC0gd2luZG93LnBhZ2VYT2Zmc2V0IC0gcGFnZU9mZnNldChpLnNjcm9sbGJhclhSYWlsKS5sZWZ0O1xuICAgIHZhciBkaXJlY3Rpb24gPSBwb3NpdGlvbkxlZnQgPiBpLnNjcm9sbGJhclhMZWZ0ID8gMSA6IC0xO1xuXG4gICAgdXBkYXRlU2Nyb2xsKGVsZW1lbnQsICdsZWZ0JywgZWxlbWVudC5zY3JvbGxMZWZ0ICsgZGlyZWN0aW9uICogaS5jb250YWluZXJXaWR0aCk7XG4gICAgdXBkYXRlR2VvbWV0cnkoZWxlbWVudCk7XG5cbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgaSA9IGluc3RhbmNlcy5nZXQoZWxlbWVudCk7XG4gIGJpbmRDbGlja1JhaWxIYW5kbGVyKGVsZW1lbnQsIGkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIF8gPSByZXF1aXJlKCcuLi8uLi9saWIvaGVscGVyJyk7XG52YXIgZG9tID0gcmVxdWlyZSgnLi4vLi4vbGliL2RvbScpO1xudmFyIGluc3RhbmNlcyA9IHJlcXVpcmUoJy4uL2luc3RhbmNlcycpO1xudmFyIHVwZGF0ZUdlb21ldHJ5ID0gcmVxdWlyZSgnLi4vdXBkYXRlLWdlb21ldHJ5Jyk7XG52YXIgdXBkYXRlU2Nyb2xsID0gcmVxdWlyZSgnLi4vdXBkYXRlLXNjcm9sbCcpO1xuXG5mdW5jdGlvbiBiaW5kTW91c2VTY3JvbGxYSGFuZGxlcihlbGVtZW50LCBpKSB7XG4gIHZhciBjdXJyZW50TGVmdCA9IG51bGw7XG4gIHZhciBjdXJyZW50UGFnZVggPSBudWxsO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNjcm9sbExlZnQoZGVsdGFYKSB7XG4gICAgdmFyIG5ld0xlZnQgPSBjdXJyZW50TGVmdCArIChkZWx0YVggKiBpLnJhaWxYUmF0aW8pO1xuICAgIHZhciBtYXhMZWZ0ID0gTWF0aC5tYXgoMCwgaS5zY3JvbGxiYXJYUmFpbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0KSArIChpLnJhaWxYUmF0aW8gKiAoaS5yYWlsWFdpZHRoIC0gaS5zY3JvbGxiYXJYV2lkdGgpKTtcblxuICAgIGlmIChuZXdMZWZ0IDwgMCkge1xuICAgICAgaS5zY3JvbGxiYXJYTGVmdCA9IDA7XG4gICAgfSBlbHNlIGlmIChuZXdMZWZ0ID4gbWF4TGVmdCkge1xuICAgICAgaS5zY3JvbGxiYXJYTGVmdCA9IG1heExlZnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGkuc2Nyb2xsYmFyWExlZnQgPSBuZXdMZWZ0O1xuICAgIH1cblxuICAgIHZhciBzY3JvbGxMZWZ0ID0gXy50b0ludChpLnNjcm9sbGJhclhMZWZ0ICogKGkuY29udGVudFdpZHRoIC0gaS5jb250YWluZXJXaWR0aCkgLyAoaS5jb250YWluZXJXaWR0aCAtIChpLnJhaWxYUmF0aW8gKiBpLnNjcm9sbGJhclhXaWR0aCkpKSAtIGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50O1xuICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAnbGVmdCcsIHNjcm9sbExlZnQpO1xuICB9XG5cbiAgdmFyIG1vdXNlTW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgIHVwZGF0ZVNjcm9sbExlZnQoZS5wYWdlWCAtIGN1cnJlbnRQYWdlWCk7XG4gICAgdXBkYXRlR2VvbWV0cnkoZWxlbWVudCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH07XG5cbiAgdmFyIG1vdXNlVXBIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgIF8uc3RvcFNjcm9sbGluZyhlbGVtZW50LCAneCcpO1xuICAgIGkuZXZlbnQudW5iaW5kKGkub3duZXJEb2N1bWVudCwgJ21vdXNlbW92ZScsIG1vdXNlTW92ZUhhbmRsZXIpO1xuICB9O1xuXG4gIGkuZXZlbnQuYmluZChpLnNjcm9sbGJhclgsICdtb3VzZWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgIGN1cnJlbnRQYWdlWCA9IGUucGFnZVg7XG4gICAgY3VycmVudExlZnQgPSBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJYLCAnbGVmdCcpKSAqIGkucmFpbFhSYXRpbztcbiAgICBfLnN0YXJ0U2Nyb2xsaW5nKGVsZW1lbnQsICd4Jyk7XG5cbiAgICBpLmV2ZW50LmJpbmQoaS5vd25lckRvY3VtZW50LCAnbW91c2Vtb3ZlJywgbW91c2VNb3ZlSGFuZGxlcik7XG4gICAgaS5ldmVudC5vbmNlKGkub3duZXJEb2N1bWVudCwgJ21vdXNldXAnLCBtb3VzZVVwSGFuZGxlcik7XG5cbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGJpbmRNb3VzZVNjcm9sbFlIYW5kbGVyKGVsZW1lbnQsIGkpIHtcbiAgdmFyIGN1cnJlbnRUb3AgPSBudWxsO1xuICB2YXIgY3VycmVudFBhZ2VZID0gbnVsbDtcblxuICBmdW5jdGlvbiB1cGRhdGVTY3JvbGxUb3AoZGVsdGFZKSB7XG4gICAgdmFyIG5ld1RvcCA9IGN1cnJlbnRUb3AgKyAoZGVsdGFZICogaS5yYWlsWVJhdGlvKTtcbiAgICB2YXIgbWF4VG9wID0gTWF0aC5tYXgoMCwgaS5zY3JvbGxiYXJZUmFpbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3ApICsgKGkucmFpbFlSYXRpbyAqIChpLnJhaWxZSGVpZ2h0IC0gaS5zY3JvbGxiYXJZSGVpZ2h0KSk7XG5cbiAgICBpZiAobmV3VG9wIDwgMCkge1xuICAgICAgaS5zY3JvbGxiYXJZVG9wID0gMDtcbiAgICB9IGVsc2UgaWYgKG5ld1RvcCA+IG1heFRvcCkge1xuICAgICAgaS5zY3JvbGxiYXJZVG9wID0gbWF4VG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICBpLnNjcm9sbGJhcllUb3AgPSBuZXdUb3A7XG4gICAgfVxuXG4gICAgdmFyIHNjcm9sbFRvcCA9IF8udG9JbnQoaS5zY3JvbGxiYXJZVG9wICogKGkuY29udGVudEhlaWdodCAtIGkuY29udGFpbmVySGVpZ2h0KSAvIChpLmNvbnRhaW5lckhlaWdodCAtIChpLnJhaWxZUmF0aW8gKiBpLnNjcm9sbGJhcllIZWlnaHQpKSk7XG4gICAgdXBkYXRlU2Nyb2xsKGVsZW1lbnQsICd0b3AnLCBzY3JvbGxUb3ApO1xuICB9XG5cbiAgdmFyIG1vdXNlTW92ZUhhbmRsZXIgPSBmdW5jdGlvbiAoZSkge1xuICAgIHVwZGF0ZVNjcm9sbFRvcChlLnBhZ2VZIC0gY3VycmVudFBhZ2VZKTtcbiAgICB1cGRhdGVHZW9tZXRyeShlbGVtZW50KTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfTtcblxuICB2YXIgbW91c2VVcEhhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgXy5zdG9wU2Nyb2xsaW5nKGVsZW1lbnQsICd5Jyk7XG4gICAgaS5ldmVudC51bmJpbmQoaS5vd25lckRvY3VtZW50LCAnbW91c2Vtb3ZlJywgbW91c2VNb3ZlSGFuZGxlcik7XG4gIH07XG5cbiAgaS5ldmVudC5iaW5kKGkuc2Nyb2xsYmFyWSwgJ21vdXNlZG93bicsIGZ1bmN0aW9uIChlKSB7XG4gICAgY3VycmVudFBhZ2VZID0gZS5wYWdlWTtcbiAgICBjdXJyZW50VG9wID0gXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWSwgJ3RvcCcpKSAqIGkucmFpbFlSYXRpbztcbiAgICBfLnN0YXJ0U2Nyb2xsaW5nKGVsZW1lbnQsICd5Jyk7XG5cbiAgICBpLmV2ZW50LmJpbmQoaS5vd25lckRvY3VtZW50LCAnbW91c2Vtb3ZlJywgbW91c2VNb3ZlSGFuZGxlcik7XG4gICAgaS5ldmVudC5vbmNlKGkub3duZXJEb2N1bWVudCwgJ21vdXNldXAnLCBtb3VzZVVwSGFuZGxlcik7XG5cbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgdmFyIGkgPSBpbnN0YW5jZXMuZ2V0KGVsZW1lbnQpO1xuICBiaW5kTW91c2VTY3JvbGxYSGFuZGxlcihlbGVtZW50LCBpKTtcbiAgYmluZE1vdXNlU2Nyb2xsWUhhbmRsZXIoZWxlbWVudCwgaSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uLy4uL2xpYi9oZWxwZXInKTtcbnZhciBkb20gPSByZXF1aXJlKCcuLi8uLi9saWIvZG9tJyk7XG52YXIgaW5zdGFuY2VzID0gcmVxdWlyZSgnLi4vaW5zdGFuY2VzJyk7XG52YXIgdXBkYXRlR2VvbWV0cnkgPSByZXF1aXJlKCcuLi91cGRhdGUtZ2VvbWV0cnknKTtcbnZhciB1cGRhdGVTY3JvbGwgPSByZXF1aXJlKCcuLi91cGRhdGUtc2Nyb2xsJyk7XG5cbmZ1bmN0aW9uIGJpbmRLZXlib2FyZEhhbmRsZXIoZWxlbWVudCwgaSkge1xuICB2YXIgaG92ZXJlZCA9IGZhbHNlO1xuICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ21vdXNlZW50ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgaG92ZXJlZCA9IHRydWU7XG4gIH0pO1xuICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ21vdXNlbGVhdmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgaG92ZXJlZCA9IGZhbHNlO1xuICB9KTtcblxuICB2YXIgc2hvdWxkUHJldmVudCA9IGZhbHNlO1xuICBmdW5jdGlvbiBzaG91bGRQcmV2ZW50RGVmYXVsdChkZWx0YVgsIGRlbHRhWSkge1xuICAgIHZhciBzY3JvbGxUb3AgPSBlbGVtZW50LnNjcm9sbFRvcDtcbiAgICBpZiAoZGVsdGFYID09PSAwKSB7XG4gICAgICBpZiAoIWkuc2Nyb2xsYmFyWUFjdGl2ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoKHNjcm9sbFRvcCA9PT0gMCAmJiBkZWx0YVkgPiAwKSB8fCAoc2Nyb2xsVG9wID49IGkuY29udGVudEhlaWdodCAtIGkuY29udGFpbmVySGVpZ2h0ICYmIGRlbHRhWSA8IDApKSB7XG4gICAgICAgIHJldHVybiAhaS5zZXR0aW5ncy53aGVlbFByb3BhZ2F0aW9uO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzY3JvbGxMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIGlmIChkZWx0YVkgPT09IDApIHtcbiAgICAgIGlmICghaS5zY3JvbGxiYXJYQWN0aXZlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICgoc2Nyb2xsTGVmdCA9PT0gMCAmJiBkZWx0YVggPCAwKSB8fCAoc2Nyb2xsTGVmdCA+PSBpLmNvbnRlbnRXaWR0aCAtIGkuY29udGFpbmVyV2lkdGggJiYgZGVsdGFYID4gMCkpIHtcbiAgICAgICAgcmV0dXJuICFpLnNldHRpbmdzLndoZWVsUHJvcGFnYXRpb247XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaS5ldmVudC5iaW5kKGkub3duZXJEb2N1bWVudCwgJ2tleWRvd24nLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmICgoZS5pc0RlZmF1bHRQcmV2ZW50ZWQgJiYgZS5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkgfHwgZS5kZWZhdWx0UHJldmVudGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGZvY3VzZWQgPSBkb20ubWF0Y2hlcyhpLnNjcm9sbGJhclgsICc6Zm9jdXMnKSB8fFxuICAgICAgICAgICAgICAgICAgZG9tLm1hdGNoZXMoaS5zY3JvbGxiYXJZLCAnOmZvY3VzJyk7XG5cbiAgICBpZiAoIWhvdmVyZWQgJiYgIWZvY3VzZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgYWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPyBkb2N1bWVudC5hY3RpdmVFbGVtZW50IDogaS5vd25lckRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKGFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgIGlmIChhY3RpdmVFbGVtZW50LnRhZ05hbWUgPT09ICdJRlJBTUUnKSB7XG4gICAgICAgIGFjdGl2ZUVsZW1lbnQgPSBhY3RpdmVFbGVtZW50LmNvbnRlbnREb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZ28gZGVlcGVyIGlmIGVsZW1lbnQgaXMgYSB3ZWJjb21wb25lbnRcbiAgICAgICAgd2hpbGUgKGFjdGl2ZUVsZW1lbnQuc2hhZG93Um9vdCkge1xuICAgICAgICAgIGFjdGl2ZUVsZW1lbnQgPSBhY3RpdmVFbGVtZW50LnNoYWRvd1Jvb3QuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKF8uaXNFZGl0YWJsZShhY3RpdmVFbGVtZW50KSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGRlbHRhWCA9IDA7XG4gICAgdmFyIGRlbHRhWSA9IDA7XG5cbiAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICBjYXNlIDM3OiAvLyBsZWZ0XG4gICAgICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgICAgIGRlbHRhWCA9IC1pLmNvbnRlbnRXaWR0aDtcbiAgICAgIH0gZWxzZSBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgZGVsdGFYID0gLWkuY29udGFpbmVyV2lkdGg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWx0YVggPSAtMzA7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM4OiAvLyB1cFxuICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICBkZWx0YVkgPSBpLmNvbnRlbnRIZWlnaHQ7XG4gICAgICB9IGVsc2UgaWYgKGUuYWx0S2V5KSB7XG4gICAgICAgIGRlbHRhWSA9IGkuY29udGFpbmVySGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsdGFZID0gMzA7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM5OiAvLyByaWdodFxuICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICBkZWx0YVggPSBpLmNvbnRlbnRXaWR0aDtcbiAgICAgIH0gZWxzZSBpZiAoZS5hbHRLZXkpIHtcbiAgICAgICAgZGVsdGFYID0gaS5jb250YWluZXJXaWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbHRhWCA9IDMwO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSA0MDogLy8gZG93blxuICAgICAgaWYgKGUubWV0YUtleSkge1xuICAgICAgICBkZWx0YVkgPSAtaS5jb250ZW50SGVpZ2h0O1xuICAgICAgfSBlbHNlIGlmIChlLmFsdEtleSkge1xuICAgICAgICBkZWx0YVkgPSAtaS5jb250YWluZXJIZWlnaHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWx0YVkgPSAtMzA7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIDMzOiAvLyBwYWdlIHVwXG4gICAgICBkZWx0YVkgPSA5MDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzI6IC8vIHNwYWNlIGJhclxuICAgICAgaWYgKGUuc2hpZnRLZXkpIHtcbiAgICAgICAgZGVsdGFZID0gOTA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWx0YVkgPSAtOTA7XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIDM0OiAvLyBwYWdlIGRvd25cbiAgICAgIGRlbHRhWSA9IC05MDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgMzU6IC8vIGVuZFxuICAgICAgaWYgKGUuY3RybEtleSkge1xuICAgICAgICBkZWx0YVkgPSAtaS5jb250ZW50SGVpZ2h0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsdGFZID0gLWkuY29udGFpbmVySGVpZ2h0O1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSAzNjogLy8gaG9tZVxuICAgICAgaWYgKGUuY3RybEtleSkge1xuICAgICAgICBkZWx0YVkgPSBlbGVtZW50LnNjcm9sbFRvcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbHRhWSA9IGkuY29udGFpbmVySGVpZ2h0O1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ3RvcCcsIGVsZW1lbnQuc2Nyb2xsVG9wIC0gZGVsdGFZKTtcbiAgICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ2xlZnQnLCBlbGVtZW50LnNjcm9sbExlZnQgKyBkZWx0YVgpO1xuICAgIHVwZGF0ZUdlb21ldHJ5KGVsZW1lbnQpO1xuXG4gICAgc2hvdWxkUHJldmVudCA9IHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhWCwgZGVsdGFZKTtcbiAgICBpZiAoc2hvdWxkUHJldmVudCkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgdmFyIGkgPSBpbnN0YW5jZXMuZ2V0KGVsZW1lbnQpO1xuICBiaW5kS2V5Ym9hcmRIYW5kbGVyKGVsZW1lbnQsIGkpO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGluc3RhbmNlcyA9IHJlcXVpcmUoJy4uL2luc3RhbmNlcycpO1xudmFyIHVwZGF0ZUdlb21ldHJ5ID0gcmVxdWlyZSgnLi4vdXBkYXRlLWdlb21ldHJ5Jyk7XG52YXIgdXBkYXRlU2Nyb2xsID0gcmVxdWlyZSgnLi4vdXBkYXRlLXNjcm9sbCcpO1xuXG5mdW5jdGlvbiBiaW5kTW91c2VXaGVlbEhhbmRsZXIoZWxlbWVudCwgaSkge1xuICB2YXIgc2hvdWxkUHJldmVudCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgdmFyIHNjcm9sbFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIGlmIChkZWx0YVggPT09IDApIHtcbiAgICAgIGlmICghaS5zY3JvbGxiYXJZQWN0aXZlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICgoc2Nyb2xsVG9wID09PSAwICYmIGRlbHRhWSA+IDApIHx8IChzY3JvbGxUb3AgPj0gaS5jb250ZW50SGVpZ2h0IC0gaS5jb250YWluZXJIZWlnaHQgJiYgZGVsdGFZIDwgMCkpIHtcbiAgICAgICAgcmV0dXJuICFpLnNldHRpbmdzLndoZWVsUHJvcGFnYXRpb247XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHNjcm9sbExlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgaWYgKGRlbHRhWSA9PT0gMCkge1xuICAgICAgaWYgKCFpLnNjcm9sbGJhclhBY3RpdmUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKChzY3JvbGxMZWZ0ID09PSAwICYmIGRlbHRhWCA8IDApIHx8IChzY3JvbGxMZWZ0ID49IGkuY29udGVudFdpZHRoIC0gaS5jb250YWluZXJXaWR0aCAmJiBkZWx0YVggPiAwKSkge1xuICAgICAgICByZXR1cm4gIWkuc2V0dGluZ3Mud2hlZWxQcm9wYWdhdGlvbjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXREZWx0YUZyb21FdmVudChlKSB7XG4gICAgdmFyIGRlbHRhWCA9IGUuZGVsdGFYO1xuICAgIHZhciBkZWx0YVkgPSAtMSAqIGUuZGVsdGFZO1xuXG4gICAgaWYgKHR5cGVvZiBkZWx0YVggPT09IFwidW5kZWZpbmVkXCIgfHwgdHlwZW9mIGRlbHRhWSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgLy8gT1MgWCBTYWZhcmlcbiAgICAgIGRlbHRhWCA9IC0xICogZS53aGVlbERlbHRhWCAvIDY7XG4gICAgICBkZWx0YVkgPSBlLndoZWVsRGVsdGFZIC8gNjtcbiAgICB9XG5cbiAgICBpZiAoZS5kZWx0YU1vZGUgJiYgZS5kZWx0YU1vZGUgPT09IDEpIHtcbiAgICAgIC8vIEZpcmVmb3ggaW4gZGVsdGFNb2RlIDE6IExpbmUgc2Nyb2xsaW5nXG4gICAgICBkZWx0YVggKj0gMTA7XG4gICAgICBkZWx0YVkgKj0gMTA7XG4gICAgfVxuXG4gICAgaWYgKGRlbHRhWCAhPT0gZGVsdGFYICYmIGRlbHRhWSAhPT0gZGVsdGFZLyogTmFOIGNoZWNrcyAqLykge1xuICAgICAgLy8gSUUgaW4gc29tZSBtb3VzZSBkcml2ZXJzXG4gICAgICBkZWx0YVggPSAwO1xuICAgICAgZGVsdGFZID0gZS53aGVlbERlbHRhO1xuICAgIH1cblxuICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAvLyByZXZlcnNlIGF4aXMgd2l0aCBzaGlmdCBrZXlcbiAgICAgIHJldHVybiBbLWRlbHRhWSwgLWRlbHRhWF07XG4gICAgfVxuICAgIHJldHVybiBbZGVsdGFYLCBkZWx0YVldO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkQmVDb25zdW1lZEJ5Q2hpbGQoZGVsdGFYLCBkZWx0YVkpIHtcbiAgICB2YXIgY2hpbGQgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RleHRhcmVhOmhvdmVyLCBzZWxlY3RbbXVsdGlwbGVdOmhvdmVyLCAucHMtY2hpbGQ6aG92ZXInKTtcbiAgICBpZiAoY2hpbGQpIHtcbiAgICAgIGlmICghd2luZG93LmdldENvbXB1dGVkU3R5bGUoY2hpbGQpLm92ZXJmbG93Lm1hdGNoKC8oc2Nyb2xsfGF1dG8pLykpIHtcbiAgICAgICAgLy8gaWYgbm90IHNjcm9sbGFibGVcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB2YXIgbWF4U2Nyb2xsVG9wID0gY2hpbGQuc2Nyb2xsSGVpZ2h0IC0gY2hpbGQuY2xpZW50SGVpZ2h0O1xuICAgICAgaWYgKG1heFNjcm9sbFRvcCA+IDApIHtcbiAgICAgICAgaWYgKCEoY2hpbGQuc2Nyb2xsVG9wID09PSAwICYmIGRlbHRhWSA+IDApICYmICEoY2hpbGQuc2Nyb2xsVG9wID09PSBtYXhTY3JvbGxUb3AgJiYgZGVsdGFZIDwgMCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIG1heFNjcm9sbExlZnQgPSBjaGlsZC5zY3JvbGxMZWZ0IC0gY2hpbGQuY2xpZW50V2lkdGg7XG4gICAgICBpZiAobWF4U2Nyb2xsTGVmdCA+IDApIHtcbiAgICAgICAgaWYgKCEoY2hpbGQuc2Nyb2xsTGVmdCA9PT0gMCAmJiBkZWx0YVggPCAwKSAmJiAhKGNoaWxkLnNjcm9sbExlZnQgPT09IG1heFNjcm9sbExlZnQgJiYgZGVsdGFYID4gMCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBtb3VzZXdoZWVsSGFuZGxlcihlKSB7XG4gICAgdmFyIGRlbHRhID0gZ2V0RGVsdGFGcm9tRXZlbnQoZSk7XG5cbiAgICB2YXIgZGVsdGFYID0gZGVsdGFbMF07XG4gICAgdmFyIGRlbHRhWSA9IGRlbHRhWzFdO1xuXG4gICAgaWYgKHNob3VsZEJlQ29uc3VtZWRCeUNoaWxkKGRlbHRhWCwgZGVsdGFZKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNob3VsZFByZXZlbnQgPSBmYWxzZTtcbiAgICBpZiAoIWkuc2V0dGluZ3MudXNlQm90aFdoZWVsQXhlcykge1xuICAgICAgLy8gZGVsdGFYIHdpbGwgb25seSBiZSB1c2VkIGZvciBob3Jpem9udGFsIHNjcm9sbGluZyBhbmQgZGVsdGFZIHdpbGxcbiAgICAgIC8vIG9ubHkgYmUgdXNlZCBmb3IgdmVydGljYWwgc2Nyb2xsaW5nIC0gdGhpcyBpcyB0aGUgZGVmYXVsdFxuICAgICAgdXBkYXRlU2Nyb2xsKGVsZW1lbnQsICd0b3AnLCBlbGVtZW50LnNjcm9sbFRvcCAtIChkZWx0YVkgKiBpLnNldHRpbmdzLndoZWVsU3BlZWQpKTtcbiAgICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAnbGVmdCcsIGVsZW1lbnQuc2Nyb2xsTGVmdCArIChkZWx0YVggKiBpLnNldHRpbmdzLndoZWVsU3BlZWQpKTtcbiAgICB9IGVsc2UgaWYgKGkuc2Nyb2xsYmFyWUFjdGl2ZSAmJiAhaS5zY3JvbGxiYXJYQWN0aXZlKSB7XG4gICAgICAvLyBvbmx5IHZlcnRpY2FsIHNjcm9sbGJhciBpcyBhY3RpdmUgYW5kIHVzZUJvdGhXaGVlbEF4ZXMgb3B0aW9uIGlzXG4gICAgICAvLyBhY3RpdmUsIHNvIGxldCdzIHNjcm9sbCB2ZXJ0aWNhbCBiYXIgdXNpbmcgYm90aCBtb3VzZSB3aGVlbCBheGVzXG4gICAgICBpZiAoZGVsdGFZKSB7XG4gICAgICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAndG9wJywgZWxlbWVudC5zY3JvbGxUb3AgLSAoZGVsdGFZICogaS5zZXR0aW5ncy53aGVlbFNwZWVkKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ3RvcCcsIGVsZW1lbnQuc2Nyb2xsVG9wICsgKGRlbHRhWCAqIGkuc2V0dGluZ3Mud2hlZWxTcGVlZCkpO1xuICAgICAgfVxuICAgICAgc2hvdWxkUHJldmVudCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChpLnNjcm9sbGJhclhBY3RpdmUgJiYgIWkuc2Nyb2xsYmFyWUFjdGl2ZSkge1xuICAgICAgLy8gdXNlQm90aFdoZWVsQXhlcyBhbmQgb25seSBob3Jpem9udGFsIGJhciBpcyBhY3RpdmUsIHNvIHVzZSBib3RoXG4gICAgICAvLyB3aGVlbCBheGVzIGZvciBob3Jpem9udGFsIGJhclxuICAgICAgaWYgKGRlbHRhWCkge1xuICAgICAgICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ2xlZnQnLCBlbGVtZW50LnNjcm9sbExlZnQgKyAoZGVsdGFYICogaS5zZXR0aW5ncy53aGVlbFNwZWVkKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ2xlZnQnLCBlbGVtZW50LnNjcm9sbExlZnQgLSAoZGVsdGFZICogaS5zZXR0aW5ncy53aGVlbFNwZWVkKSk7XG4gICAgICB9XG4gICAgICBzaG91bGRQcmV2ZW50ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB1cGRhdGVHZW9tZXRyeShlbGVtZW50KTtcblxuICAgIHNob3VsZFByZXZlbnQgPSAoc2hvdWxkUHJldmVudCB8fCBzaG91bGRQcmV2ZW50RGVmYXVsdChkZWx0YVgsIGRlbHRhWSkpO1xuICAgIGlmIChzaG91bGRQcmV2ZW50KSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0eXBlb2Ygd2luZG93Lm9ud2hlZWwgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3doZWVsJywgbW91c2V3aGVlbEhhbmRsZXIpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cub25tb3VzZXdoZWVsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdtb3VzZXdoZWVsJywgbW91c2V3aGVlbEhhbmRsZXIpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgdmFyIGkgPSBpbnN0YW5jZXMuZ2V0KGVsZW1lbnQpO1xuICBiaW5kTW91c2VXaGVlbEhhbmRsZXIoZWxlbWVudCwgaSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaW5zdGFuY2VzID0gcmVxdWlyZSgnLi4vaW5zdGFuY2VzJyk7XG52YXIgdXBkYXRlR2VvbWV0cnkgPSByZXF1aXJlKCcuLi91cGRhdGUtZ2VvbWV0cnknKTtcblxuZnVuY3Rpb24gYmluZE5hdGl2ZVNjcm9sbEhhbmRsZXIoZWxlbWVudCwgaSkge1xuICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICB1cGRhdGVHZW9tZXRyeShlbGVtZW50KTtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgdmFyIGkgPSBpbnN0YW5jZXMuZ2V0KGVsZW1lbnQpO1xuICBiaW5kTmF0aXZlU2Nyb2xsSGFuZGxlcihlbGVtZW50LCBpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vLi4vbGliL2hlbHBlcicpO1xudmFyIGluc3RhbmNlcyA9IHJlcXVpcmUoJy4uL2luc3RhbmNlcycpO1xudmFyIHVwZGF0ZUdlb21ldHJ5ID0gcmVxdWlyZSgnLi4vdXBkYXRlLWdlb21ldHJ5Jyk7XG52YXIgdXBkYXRlU2Nyb2xsID0gcmVxdWlyZSgnLi4vdXBkYXRlLXNjcm9sbCcpO1xuXG5mdW5jdGlvbiBiaW5kU2VsZWN0aW9uSGFuZGxlcihlbGVtZW50LCBpKSB7XG4gIGZ1bmN0aW9uIGdldFJhbmdlTm9kZSgpIHtcbiAgICB2YXIgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbiA/IHdpbmRvdy5nZXRTZWxlY3Rpb24oKSA6XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldFNlbGVjdGlvbiA/IGRvY3VtZW50LmdldFNlbGVjdGlvbigpIDogJyc7XG4gICAgaWYgKHNlbGVjdGlvbi50b1N0cmluZygpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKS5jb21tb25BbmNlc3RvckNvbnRhaW5lcjtcbiAgICB9XG4gIH1cblxuICB2YXIgc2Nyb2xsaW5nTG9vcCA9IG51bGw7XG4gIHZhciBzY3JvbGxEaWZmID0ge3RvcDogMCwgbGVmdDogMH07XG4gIGZ1bmN0aW9uIHN0YXJ0U2Nyb2xsaW5nKCkge1xuICAgIGlmICghc2Nyb2xsaW5nTG9vcCkge1xuICAgICAgc2Nyb2xsaW5nTG9vcCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFpbnN0YW5jZXMuZ2V0KGVsZW1lbnQpKSB7XG4gICAgICAgICAgY2xlYXJJbnRlcnZhbChzY3JvbGxpbmdMb29wKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ3RvcCcsIGVsZW1lbnQuc2Nyb2xsVG9wICsgc2Nyb2xsRGlmZi50b3ApO1xuICAgICAgICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ2xlZnQnLCBlbGVtZW50LnNjcm9sbExlZnQgKyBzY3JvbGxEaWZmLmxlZnQpO1xuICAgICAgICB1cGRhdGVHZW9tZXRyeShlbGVtZW50KTtcbiAgICAgIH0sIDUwKTsgLy8gZXZlcnkgLjEgc2VjXG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHN0b3BTY3JvbGxpbmcoKSB7XG4gICAgaWYgKHNjcm9sbGluZ0xvb3ApIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwoc2Nyb2xsaW5nTG9vcCk7XG4gICAgICBzY3JvbGxpbmdMb29wID0gbnVsbDtcbiAgICB9XG4gICAgXy5zdG9wU2Nyb2xsaW5nKGVsZW1lbnQpO1xuICB9XG5cbiAgdmFyIGlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgaS5ldmVudC5iaW5kKGkub3duZXJEb2N1bWVudCwgJ3NlbGVjdGlvbmNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoZWxlbWVudC5jb250YWlucyhnZXRSYW5nZU5vZGUoKSkpIHtcbiAgICAgIGlzU2VsZWN0ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpc1NlbGVjdGVkID0gZmFsc2U7XG4gICAgICBzdG9wU2Nyb2xsaW5nKCk7XG4gICAgfVxuICB9KTtcbiAgaS5ldmVudC5iaW5kKHdpbmRvdywgJ21vdXNldXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIGlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHN0b3BTY3JvbGxpbmcoKTtcbiAgICB9XG4gIH0pO1xuICBpLmV2ZW50LmJpbmQod2luZG93LCAna2V5dXAnLCBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKGlzU2VsZWN0ZWQpIHtcbiAgICAgIGlzU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgIHN0b3BTY3JvbGxpbmcoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGkuZXZlbnQuYmluZCh3aW5kb3csICdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICB2YXIgbW91c2VQb3NpdGlvbiA9IHt4OiBlLnBhZ2VYLCB5OiBlLnBhZ2VZfTtcbiAgICAgIHZhciBjb250YWluZXJHZW9tZXRyeSA9IHtcbiAgICAgICAgbGVmdDogZWxlbWVudC5vZmZzZXRMZWZ0LFxuICAgICAgICByaWdodDogZWxlbWVudC5vZmZzZXRMZWZ0ICsgZWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICAgICAgdG9wOiBlbGVtZW50Lm9mZnNldFRvcCxcbiAgICAgICAgYm90dG9tOiBlbGVtZW50Lm9mZnNldFRvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gICAgICB9O1xuXG4gICAgICBpZiAobW91c2VQb3NpdGlvbi54IDwgY29udGFpbmVyR2VvbWV0cnkubGVmdCArIDMpIHtcbiAgICAgICAgc2Nyb2xsRGlmZi5sZWZ0ID0gLTU7XG4gICAgICAgIF8uc3RhcnRTY3JvbGxpbmcoZWxlbWVudCwgJ3gnKTtcbiAgICAgIH0gZWxzZSBpZiAobW91c2VQb3NpdGlvbi54ID4gY29udGFpbmVyR2VvbWV0cnkucmlnaHQgLSAzKSB7XG4gICAgICAgIHNjcm9sbERpZmYubGVmdCA9IDU7XG4gICAgICAgIF8uc3RhcnRTY3JvbGxpbmcoZWxlbWVudCwgJ3gnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbERpZmYubGVmdCA9IDA7XG4gICAgICB9XG5cbiAgICAgIGlmIChtb3VzZVBvc2l0aW9uLnkgPCBjb250YWluZXJHZW9tZXRyeS50b3AgKyAzKSB7XG4gICAgICAgIGlmIChjb250YWluZXJHZW9tZXRyeS50b3AgKyAzIC0gbW91c2VQb3NpdGlvbi55IDwgNSkge1xuICAgICAgICAgIHNjcm9sbERpZmYudG9wID0gLTU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2Nyb2xsRGlmZi50b3AgPSAtMjA7XG4gICAgICAgIH1cbiAgICAgICAgXy5zdGFydFNjcm9sbGluZyhlbGVtZW50LCAneScpO1xuICAgICAgfSBlbHNlIGlmIChtb3VzZVBvc2l0aW9uLnkgPiBjb250YWluZXJHZW9tZXRyeS5ib3R0b20gLSAzKSB7XG4gICAgICAgIGlmIChtb3VzZVBvc2l0aW9uLnkgLSBjb250YWluZXJHZW9tZXRyeS5ib3R0b20gKyAzIDwgNSkge1xuICAgICAgICAgIHNjcm9sbERpZmYudG9wID0gNTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzY3JvbGxEaWZmLnRvcCA9IDIwO1xuICAgICAgICB9XG4gICAgICAgIF8uc3RhcnRTY3JvbGxpbmcoZWxlbWVudCwgJ3knKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNjcm9sbERpZmYudG9wID0gMDtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbERpZmYudG9wID09PSAwICYmIHNjcm9sbERpZmYubGVmdCA9PT0gMCkge1xuICAgICAgICBzdG9wU2Nyb2xsaW5nKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydFNjcm9sbGluZygpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgdmFyIGkgPSBpbnN0YW5jZXMuZ2V0KGVsZW1lbnQpO1xuICBiaW5kU2VsZWN0aW9uSGFuZGxlcihlbGVtZW50LCBpKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vLi4vbGliL2hlbHBlcicpO1xudmFyIGluc3RhbmNlcyA9IHJlcXVpcmUoJy4uL2luc3RhbmNlcycpO1xudmFyIHVwZGF0ZUdlb21ldHJ5ID0gcmVxdWlyZSgnLi4vdXBkYXRlLWdlb21ldHJ5Jyk7XG52YXIgdXBkYXRlU2Nyb2xsID0gcmVxdWlyZSgnLi4vdXBkYXRlLXNjcm9sbCcpO1xuXG5mdW5jdGlvbiBiaW5kVG91Y2hIYW5kbGVyKGVsZW1lbnQsIGksIHN1cHBvcnRzVG91Y2gsIHN1cHBvcnRzSWVQb2ludGVyKSB7XG4gIGZ1bmN0aW9uIHNob3VsZFByZXZlbnREZWZhdWx0KGRlbHRhWCwgZGVsdGFZKSB7XG4gICAgdmFyIHNjcm9sbFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIHZhciBzY3JvbGxMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgIHZhciBtYWduaXR1ZGVYID0gTWF0aC5hYnMoZGVsdGFYKTtcbiAgICB2YXIgbWFnbml0dWRlWSA9IE1hdGguYWJzKGRlbHRhWSk7XG5cbiAgICBpZiAobWFnbml0dWRlWSA+IG1hZ25pdHVkZVgpIHtcbiAgICAgIC8vIHVzZXIgaXMgcGVyaGFwcyB0cnlpbmcgdG8gc3dpcGUgdXAvZG93biB0aGUgcGFnZVxuXG4gICAgICBpZiAoKChkZWx0YVkgPCAwKSAmJiAoc2Nyb2xsVG9wID09PSBpLmNvbnRlbnRIZWlnaHQgLSBpLmNvbnRhaW5lckhlaWdodCkpIHx8XG4gICAgICAgICAgKChkZWx0YVkgPiAwKSAmJiAoc2Nyb2xsVG9wID09PSAwKSkpIHtcbiAgICAgICAgcmV0dXJuICFpLnNldHRpbmdzLnN3aXBlUHJvcGFnYXRpb247XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChtYWduaXR1ZGVYID4gbWFnbml0dWRlWSkge1xuICAgICAgLy8gdXNlciBpcyBwZXJoYXBzIHRyeWluZyB0byBzd2lwZSBsZWZ0L3JpZ2h0IGFjcm9zcyB0aGUgcGFnZVxuXG4gICAgICBpZiAoKChkZWx0YVggPCAwKSAmJiAoc2Nyb2xsTGVmdCA9PT0gaS5jb250ZW50V2lkdGggLSBpLmNvbnRhaW5lcldpZHRoKSkgfHxcbiAgICAgICAgICAoKGRlbHRhWCA+IDApICYmIChzY3JvbGxMZWZ0ID09PSAwKSkpIHtcbiAgICAgICAgcmV0dXJuICFpLnNldHRpbmdzLnN3aXBlUHJvcGFnYXRpb247XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseVRvdWNoTW92ZShkaWZmZXJlbmNlWCwgZGlmZmVyZW5jZVkpIHtcbiAgICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ3RvcCcsIGVsZW1lbnQuc2Nyb2xsVG9wIC0gZGlmZmVyZW5jZVkpO1xuICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAnbGVmdCcsIGVsZW1lbnQuc2Nyb2xsTGVmdCAtIGRpZmZlcmVuY2VYKTtcblxuICAgIHVwZGF0ZUdlb21ldHJ5KGVsZW1lbnQpO1xuICB9XG5cbiAgdmFyIHN0YXJ0T2Zmc2V0ID0ge307XG4gIHZhciBzdGFydFRpbWUgPSAwO1xuICB2YXIgc3BlZWQgPSB7fTtcbiAgdmFyIGVhc2luZ0xvb3AgPSBudWxsO1xuICB2YXIgaW5HbG9iYWxUb3VjaCA9IGZhbHNlO1xuICB2YXIgaW5Mb2NhbFRvdWNoID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZ2xvYmFsVG91Y2hTdGFydCgpIHtcbiAgICBpbkdsb2JhbFRvdWNoID0gdHJ1ZTtcbiAgfVxuICBmdW5jdGlvbiBnbG9iYWxUb3VjaEVuZCgpIHtcbiAgICBpbkdsb2JhbFRvdWNoID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUb3VjaChlKSB7XG4gICAgaWYgKGUudGFyZ2V0VG91Y2hlcykge1xuICAgICAgcmV0dXJuIGUudGFyZ2V0VG91Y2hlc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTWF5YmUgSUUgcG9pbnRlclxuICAgICAgcmV0dXJuIGU7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHNob3VsZEhhbmRsZShlKSB7XG4gICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGUucG9pbnRlclR5cGUgJiYgZS5wb2ludGVyVHlwZSAhPT0gJ21vdXNlJyAmJiBlLnBvaW50ZXJUeXBlICE9PSBlLk1TUE9JTlRFUl9UWVBFX01PVVNFKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGZ1bmN0aW9uIHRvdWNoU3RhcnQoZSkge1xuICAgIGlmIChzaG91bGRIYW5kbGUoZSkpIHtcbiAgICAgIGluTG9jYWxUb3VjaCA9IHRydWU7XG5cbiAgICAgIHZhciB0b3VjaCA9IGdldFRvdWNoKGUpO1xuXG4gICAgICBzdGFydE9mZnNldC5wYWdlWCA9IHRvdWNoLnBhZ2VYO1xuICAgICAgc3RhcnRPZmZzZXQucGFnZVkgPSB0b3VjaC5wYWdlWTtcblxuICAgICAgc3RhcnRUaW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcblxuICAgICAgaWYgKGVhc2luZ0xvb3AgIT09IG51bGwpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbChlYXNpbmdMb29wKTtcbiAgICAgIH1cblxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdG91Y2hNb3ZlKGUpIHtcbiAgICBpZiAoIWluTG9jYWxUb3VjaCAmJiBpLnNldHRpbmdzLnN3aXBlUHJvcGFnYXRpb24pIHtcbiAgICAgIHRvdWNoU3RhcnQoZSk7XG4gICAgfVxuICAgIGlmICghaW5HbG9iYWxUb3VjaCAmJiBpbkxvY2FsVG91Y2ggJiYgc2hvdWxkSGFuZGxlKGUpKSB7XG4gICAgICB2YXIgdG91Y2ggPSBnZXRUb3VjaChlKTtcblxuICAgICAgdmFyIGN1cnJlbnRPZmZzZXQgPSB7cGFnZVg6IHRvdWNoLnBhZ2VYLCBwYWdlWTogdG91Y2gucGFnZVl9O1xuXG4gICAgICB2YXIgZGlmZmVyZW5jZVggPSBjdXJyZW50T2Zmc2V0LnBhZ2VYIC0gc3RhcnRPZmZzZXQucGFnZVg7XG4gICAgICB2YXIgZGlmZmVyZW5jZVkgPSBjdXJyZW50T2Zmc2V0LnBhZ2VZIC0gc3RhcnRPZmZzZXQucGFnZVk7XG5cbiAgICAgIGFwcGx5VG91Y2hNb3ZlKGRpZmZlcmVuY2VYLCBkaWZmZXJlbmNlWSk7XG4gICAgICBzdGFydE9mZnNldCA9IGN1cnJlbnRPZmZzZXQ7XG5cbiAgICAgIHZhciBjdXJyZW50VGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5cbiAgICAgIHZhciB0aW1lR2FwID0gY3VycmVudFRpbWUgLSBzdGFydFRpbWU7XG4gICAgICBpZiAodGltZUdhcCA+IDApIHtcbiAgICAgICAgc3BlZWQueCA9IGRpZmZlcmVuY2VYIC8gdGltZUdhcDtcbiAgICAgICAgc3BlZWQueSA9IGRpZmZlcmVuY2VZIC8gdGltZUdhcDtcbiAgICAgICAgc3RhcnRUaW1lID0gY3VycmVudFRpbWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChzaG91bGRQcmV2ZW50RGVmYXVsdChkaWZmZXJlbmNlWCwgZGlmZmVyZW5jZVkpKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdG91Y2hFbmQoKSB7XG4gICAgaWYgKCFpbkdsb2JhbFRvdWNoICYmIGluTG9jYWxUb3VjaCkge1xuICAgICAgaW5Mb2NhbFRvdWNoID0gZmFsc2U7XG5cbiAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICBlYXNpbmdMb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWluc3RhbmNlcy5nZXQoZWxlbWVudCkpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGVhc2luZ0xvb3ApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghc3BlZWQueCAmJiAhc3BlZWQueSkge1xuICAgICAgICAgIGNsZWFySW50ZXJ2YWwoZWFzaW5nTG9vcCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKHNwZWVkLngpIDwgMC4wMSAmJiBNYXRoLmFicyhzcGVlZC55KSA8IDAuMDEpIHtcbiAgICAgICAgICBjbGVhckludGVydmFsKGVhc2luZ0xvb3ApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGFwcGx5VG91Y2hNb3ZlKHNwZWVkLnggKiAzMCwgc3BlZWQueSAqIDMwKTtcblxuICAgICAgICBzcGVlZC54ICo9IDAuODtcbiAgICAgICAgc3BlZWQueSAqPSAwLjg7XG4gICAgICB9LCAxMCk7XG4gICAgfVxuICB9XG5cbiAgaWYgKHN1cHBvcnRzVG91Y2gpIHtcbiAgICBpLmV2ZW50LmJpbmQod2luZG93LCAndG91Y2hzdGFydCcsIGdsb2JhbFRvdWNoU3RhcnQpO1xuICAgIGkuZXZlbnQuYmluZCh3aW5kb3csICd0b3VjaGVuZCcsIGdsb2JhbFRvdWNoRW5kKTtcbiAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3RvdWNoc3RhcnQnLCB0b3VjaFN0YXJ0KTtcbiAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3RvdWNobW92ZScsIHRvdWNoTW92ZSk7XG4gICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICd0b3VjaGVuZCcsIHRvdWNoRW5kKTtcbiAgfSBlbHNlIGlmIChzdXBwb3J0c0llUG9pbnRlcikge1xuICAgIGlmICh3aW5kb3cuUG9pbnRlckV2ZW50KSB7XG4gICAgICBpLmV2ZW50LmJpbmQod2luZG93LCAncG9pbnRlcmRvd24nLCBnbG9iYWxUb3VjaFN0YXJ0KTtcbiAgICAgIGkuZXZlbnQuYmluZCh3aW5kb3csICdwb2ludGVydXAnLCBnbG9iYWxUb3VjaEVuZCk7XG4gICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3BvaW50ZXJkb3duJywgdG91Y2hTdGFydCk7XG4gICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ3BvaW50ZXJtb3ZlJywgdG91Y2hNb3ZlKTtcbiAgICAgIGkuZXZlbnQuYmluZChlbGVtZW50LCAncG9pbnRlcnVwJywgdG91Y2hFbmQpO1xuICAgIH0gZWxzZSBpZiAod2luZG93Lk1TUG9pbnRlckV2ZW50KSB7XG4gICAgICBpLmV2ZW50LmJpbmQod2luZG93LCAnTVNQb2ludGVyRG93bicsIGdsb2JhbFRvdWNoU3RhcnQpO1xuICAgICAgaS5ldmVudC5iaW5kKHdpbmRvdywgJ01TUG9pbnRlclVwJywgZ2xvYmFsVG91Y2hFbmQpO1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdNU1BvaW50ZXJEb3duJywgdG91Y2hTdGFydCk7XG4gICAgICBpLmV2ZW50LmJpbmQoZWxlbWVudCwgJ01TUG9pbnRlck1vdmUnLCB0b3VjaE1vdmUpO1xuICAgICAgaS5ldmVudC5iaW5kKGVsZW1lbnQsICdNU1BvaW50ZXJVcCcsIHRvdWNoRW5kKTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICBpZiAoIV8uZW52LnN1cHBvcnRzVG91Y2ggJiYgIV8uZW52LnN1cHBvcnRzSWVQb2ludGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGkgPSBpbnN0YW5jZXMuZ2V0KGVsZW1lbnQpO1xuICBiaW5kVG91Y2hIYW5kbGVyKGVsZW1lbnQsIGksIF8uZW52LnN1cHBvcnRzVG91Y2gsIF8uZW52LnN1cHBvcnRzSWVQb2ludGVyKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vbGliL2hlbHBlcicpO1xudmFyIGNscyA9IHJlcXVpcmUoJy4uL2xpYi9jbGFzcycpO1xudmFyIGluc3RhbmNlcyA9IHJlcXVpcmUoJy4vaW5zdGFuY2VzJyk7XG52YXIgdXBkYXRlR2VvbWV0cnkgPSByZXF1aXJlKCcuL3VwZGF0ZS1nZW9tZXRyeScpO1xuXG4vLyBIYW5kbGVyc1xudmFyIGhhbmRsZXJzID0ge1xuICAnY2xpY2stcmFpbCc6IHJlcXVpcmUoJy4vaGFuZGxlci9jbGljay1yYWlsJyksXG4gICdkcmFnLXNjcm9sbGJhcic6IHJlcXVpcmUoJy4vaGFuZGxlci9kcmFnLXNjcm9sbGJhcicpLFxuICAna2V5Ym9hcmQnOiByZXF1aXJlKCcuL2hhbmRsZXIva2V5Ym9hcmQnKSxcbiAgJ3doZWVsJzogcmVxdWlyZSgnLi9oYW5kbGVyL21vdXNlLXdoZWVsJyksXG4gICd0b3VjaCc6IHJlcXVpcmUoJy4vaGFuZGxlci90b3VjaCcpLFxuICAnc2VsZWN0aW9uJzogcmVxdWlyZSgnLi9oYW5kbGVyL3NlbGVjdGlvbicpXG59O1xudmFyIG5hdGl2ZVNjcm9sbEhhbmRsZXIgPSByZXF1aXJlKCcuL2hhbmRsZXIvbmF0aXZlLXNjcm9sbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbGVtZW50LCB1c2VyU2V0dGluZ3MpIHtcbiAgdXNlclNldHRpbmdzID0gdHlwZW9mIHVzZXJTZXR0aW5ncyA9PT0gJ29iamVjdCcgPyB1c2VyU2V0dGluZ3MgOiB7fTtcblxuICBjbHMuYWRkKGVsZW1lbnQsICdwcy1jb250YWluZXInKTtcblxuICAvLyBDcmVhdGUgYSBwbHVnaW4gaW5zdGFuY2UuXG4gIHZhciBpID0gaW5zdGFuY2VzLmFkZChlbGVtZW50KTtcblxuICBpLnNldHRpbmdzID0gXy5leHRlbmQoaS5zZXR0aW5ncywgdXNlclNldHRpbmdzKTtcbiAgY2xzLmFkZChlbGVtZW50LCAncHMtdGhlbWUtJyArIGkuc2V0dGluZ3MudGhlbWUpO1xuXG4gIGkuc2V0dGluZ3MuaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbiAoaGFuZGxlck5hbWUpIHtcbiAgICBoYW5kbGVyc1toYW5kbGVyTmFtZV0oZWxlbWVudCk7XG4gIH0pO1xuXG4gIG5hdGl2ZVNjcm9sbEhhbmRsZXIoZWxlbWVudCk7XG5cbiAgdXBkYXRlR2VvbWV0cnkoZWxlbWVudCk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uL2xpYi9oZWxwZXInKTtcbnZhciBjbHMgPSByZXF1aXJlKCcuLi9saWIvY2xhc3MnKTtcbnZhciBkZWZhdWx0U2V0dGluZ3MgPSByZXF1aXJlKCcuL2RlZmF1bHQtc2V0dGluZycpO1xudmFyIGRvbSA9IHJlcXVpcmUoJy4uL2xpYi9kb20nKTtcbnZhciBFdmVudE1hbmFnZXIgPSByZXF1aXJlKCcuLi9saWIvZXZlbnQtbWFuYWdlcicpO1xudmFyIGd1aWQgPSByZXF1aXJlKCcuLi9saWIvZ3VpZCcpO1xuXG52YXIgaW5zdGFuY2VzID0ge307XG5cbmZ1bmN0aW9uIEluc3RhbmNlKGVsZW1lbnQpIHtcbiAgdmFyIGkgPSB0aGlzO1xuXG4gIGkuc2V0dGluZ3MgPSBfLmNsb25lKGRlZmF1bHRTZXR0aW5ncyk7XG4gIGkuY29udGFpbmVyV2lkdGggPSBudWxsO1xuICBpLmNvbnRhaW5lckhlaWdodCA9IG51bGw7XG4gIGkuY29udGVudFdpZHRoID0gbnVsbDtcbiAgaS5jb250ZW50SGVpZ2h0ID0gbnVsbDtcblxuICBpLmlzUnRsID0gZG9tLmNzcyhlbGVtZW50LCAnZGlyZWN0aW9uJykgPT09IFwicnRsXCI7XG4gIGkuaXNOZWdhdGl2ZVNjcm9sbCA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG9yaWdpbmFsU2Nyb2xsTGVmdCA9IGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICB2YXIgcmVzdWx0ID0gbnVsbDtcbiAgICBlbGVtZW50LnNjcm9sbExlZnQgPSAtMTtcbiAgICByZXN1bHQgPSBlbGVtZW50LnNjcm9sbExlZnQgPCAwO1xuICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCA9IG9yaWdpbmFsU2Nyb2xsTGVmdDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KSgpO1xuICBpLm5lZ2F0aXZlU2Nyb2xsQWRqdXN0bWVudCA9IGkuaXNOZWdhdGl2ZVNjcm9sbCA/IGVsZW1lbnQuc2Nyb2xsV2lkdGggLSBlbGVtZW50LmNsaWVudFdpZHRoIDogMDtcbiAgaS5ldmVudCA9IG5ldyBFdmVudE1hbmFnZXIoKTtcbiAgaS5vd25lckRvY3VtZW50ID0gZWxlbWVudC5vd25lckRvY3VtZW50IHx8IGRvY3VtZW50O1xuXG4gIGZ1bmN0aW9uIGZvY3VzKCkge1xuICAgIGNscy5hZGQoZWxlbWVudCwgJ3BzLWZvY3VzJyk7XG4gIH1cblxuICBmdW5jdGlvbiBibHVyKCkge1xuICAgIGNscy5yZW1vdmUoZWxlbWVudCwgJ3BzLWZvY3VzJyk7XG4gIH1cblxuICBpLnNjcm9sbGJhclhSYWlsID0gZG9tLmFwcGVuZFRvKGRvbS5lKCdkaXYnLCAncHMtc2Nyb2xsYmFyLXgtcmFpbCcpLCBlbGVtZW50KTtcbiAgaS5zY3JvbGxiYXJYID0gZG9tLmFwcGVuZFRvKGRvbS5lKCdkaXYnLCAncHMtc2Nyb2xsYmFyLXgnKSwgaS5zY3JvbGxiYXJYUmFpbCk7XG4gIGkuc2Nyb2xsYmFyWC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gIGkuZXZlbnQuYmluZChpLnNjcm9sbGJhclgsICdmb2N1cycsIGZvY3VzKTtcbiAgaS5ldmVudC5iaW5kKGkuc2Nyb2xsYmFyWCwgJ2JsdXInLCBibHVyKTtcbiAgaS5zY3JvbGxiYXJYQWN0aXZlID0gbnVsbDtcbiAgaS5zY3JvbGxiYXJYV2lkdGggPSBudWxsO1xuICBpLnNjcm9sbGJhclhMZWZ0ID0gbnVsbDtcbiAgaS5zY3JvbGxiYXJYQm90dG9tID0gXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsICdib3R0b20nKSk7XG4gIGkuaXNTY3JvbGxiYXJYVXNpbmdCb3R0b20gPSBpLnNjcm9sbGJhclhCb3R0b20gPT09IGkuc2Nyb2xsYmFyWEJvdHRvbTsgLy8gIWlzTmFOXG4gIGkuc2Nyb2xsYmFyWFRvcCA9IGkuaXNTY3JvbGxiYXJYVXNpbmdCb3R0b20gPyBudWxsIDogXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsICd0b3AnKSk7XG4gIGkucmFpbEJvcmRlclhXaWR0aCA9IF8udG9JbnQoZG9tLmNzcyhpLnNjcm9sbGJhclhSYWlsLCAnYm9yZGVyTGVmdFdpZHRoJykpICsgXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsICdib3JkZXJSaWdodFdpZHRoJykpO1xuICAvLyBTZXQgcmFpbCB0byBkaXNwbGF5OmJsb2NrIHRvIGNhbGN1bGF0ZSBtYXJnaW5zXG4gIGRvbS5jc3MoaS5zY3JvbGxiYXJYUmFpbCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgaS5yYWlsWE1hcmdpbldpZHRoID0gXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsICdtYXJnaW5MZWZ0JykpICsgXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsICdtYXJnaW5SaWdodCcpKTtcbiAgZG9tLmNzcyhpLnNjcm9sbGJhclhSYWlsLCAnZGlzcGxheScsICcnKTtcbiAgaS5yYWlsWFdpZHRoID0gbnVsbDtcbiAgaS5yYWlsWFJhdGlvID0gbnVsbDtcblxuICBpLnNjcm9sbGJhcllSYWlsID0gZG9tLmFwcGVuZFRvKGRvbS5lKCdkaXYnLCAncHMtc2Nyb2xsYmFyLXktcmFpbCcpLCBlbGVtZW50KTtcbiAgaS5zY3JvbGxiYXJZID0gZG9tLmFwcGVuZFRvKGRvbS5lKCdkaXYnLCAncHMtc2Nyb2xsYmFyLXknKSwgaS5zY3JvbGxiYXJZUmFpbCk7XG4gIGkuc2Nyb2xsYmFyWS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgMCk7XG4gIGkuZXZlbnQuYmluZChpLnNjcm9sbGJhclksICdmb2N1cycsIGZvY3VzKTtcbiAgaS5ldmVudC5iaW5kKGkuc2Nyb2xsYmFyWSwgJ2JsdXInLCBibHVyKTtcbiAgaS5zY3JvbGxiYXJZQWN0aXZlID0gbnVsbDtcbiAgaS5zY3JvbGxiYXJZSGVpZ2h0ID0gbnVsbDtcbiAgaS5zY3JvbGxiYXJZVG9wID0gbnVsbDtcbiAgaS5zY3JvbGxiYXJZUmlnaHQgPSBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJZUmFpbCwgJ3JpZ2h0JykpO1xuICBpLmlzU2Nyb2xsYmFyWVVzaW5nUmlnaHQgPSBpLnNjcm9sbGJhcllSaWdodCA9PT0gaS5zY3JvbGxiYXJZUmlnaHQ7IC8vICFpc05hTlxuICBpLnNjcm9sbGJhcllMZWZ0ID0gaS5pc1Njcm9sbGJhcllVc2luZ1JpZ2h0ID8gbnVsbCA6IF8udG9JbnQoZG9tLmNzcyhpLnNjcm9sbGJhcllSYWlsLCAnbGVmdCcpKTtcbiAgaS5zY3JvbGxiYXJZT3V0ZXJXaWR0aCA9IGkuaXNSdGwgPyBfLm91dGVyV2lkdGgoaS5zY3JvbGxiYXJZKSA6IG51bGw7XG4gIGkucmFpbEJvcmRlcllXaWR0aCA9IF8udG9JbnQoZG9tLmNzcyhpLnNjcm9sbGJhcllSYWlsLCAnYm9yZGVyVG9wV2lkdGgnKSkgKyBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJZUmFpbCwgJ2JvcmRlckJvdHRvbVdpZHRoJykpO1xuICBkb20uY3NzKGkuc2Nyb2xsYmFyWVJhaWwsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gIGkucmFpbFlNYXJnaW5IZWlnaHQgPSBfLnRvSW50KGRvbS5jc3MoaS5zY3JvbGxiYXJZUmFpbCwgJ21hcmdpblRvcCcpKSArIF8udG9JbnQoZG9tLmNzcyhpLnNjcm9sbGJhcllSYWlsLCAnbWFyZ2luQm90dG9tJykpO1xuICBkb20uY3NzKGkuc2Nyb2xsYmFyWVJhaWwsICdkaXNwbGF5JywgJycpO1xuICBpLnJhaWxZSGVpZ2h0ID0gbnVsbDtcbiAgaS5yYWlsWVJhdGlvID0gbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0SWQoZWxlbWVudCkge1xuICByZXR1cm4gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHMtaWQnKTtcbn1cblxuZnVuY3Rpb24gc2V0SWQoZWxlbWVudCwgaWQpIHtcbiAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHMtaWQnLCBpZCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUlkKGVsZW1lbnQpIHtcbiAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtcHMtaWQnKTtcbn1cblxuZXhwb3J0cy5hZGQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgbmV3SWQgPSBndWlkKCk7XG4gIHNldElkKGVsZW1lbnQsIG5ld0lkKTtcbiAgaW5zdGFuY2VzW25ld0lkXSA9IG5ldyBJbnN0YW5jZShlbGVtZW50KTtcbiAgcmV0dXJuIGluc3RhbmNlc1tuZXdJZF07XG59O1xuXG5leHBvcnRzLnJlbW92ZSA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIGRlbGV0ZSBpbnN0YW5jZXNbZ2V0SWQoZWxlbWVudCldO1xuICByZW1vdmVJZChlbGVtZW50KTtcbn07XG5cbmV4cG9ydHMuZ2V0ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgcmV0dXJuIGluc3RhbmNlc1tnZXRJZChlbGVtZW50KV07XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uL2xpYi9oZWxwZXInKTtcbnZhciBjbHMgPSByZXF1aXJlKCcuLi9saWIvY2xhc3MnKTtcbnZhciBkb20gPSByZXF1aXJlKCcuLi9saWIvZG9tJyk7XG52YXIgaW5zdGFuY2VzID0gcmVxdWlyZSgnLi9pbnN0YW5jZXMnKTtcbnZhciB1cGRhdGVTY3JvbGwgPSByZXF1aXJlKCcuL3VwZGF0ZS1zY3JvbGwnKTtcblxuZnVuY3Rpb24gZ2V0VGh1bWJTaXplKGksIHRodW1iU2l6ZSkge1xuICBpZiAoaS5zZXR0aW5ncy5taW5TY3JvbGxiYXJMZW5ndGgpIHtcbiAgICB0aHVtYlNpemUgPSBNYXRoLm1heCh0aHVtYlNpemUsIGkuc2V0dGluZ3MubWluU2Nyb2xsYmFyTGVuZ3RoKTtcbiAgfVxuICBpZiAoaS5zZXR0aW5ncy5tYXhTY3JvbGxiYXJMZW5ndGgpIHtcbiAgICB0aHVtYlNpemUgPSBNYXRoLm1pbih0aHVtYlNpemUsIGkuc2V0dGluZ3MubWF4U2Nyb2xsYmFyTGVuZ3RoKTtcbiAgfVxuICByZXR1cm4gdGh1bWJTaXplO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDc3MoZWxlbWVudCwgaSkge1xuICB2YXIgeFJhaWxPZmZzZXQgPSB7d2lkdGg6IGkucmFpbFhXaWR0aH07XG4gIGlmIChpLmlzUnRsKSB7XG4gICAgeFJhaWxPZmZzZXQubGVmdCA9IGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICsgZWxlbWVudC5zY3JvbGxMZWZ0ICsgaS5jb250YWluZXJXaWR0aCAtIGkuY29udGVudFdpZHRoO1xuICB9IGVsc2Uge1xuICAgIHhSYWlsT2Zmc2V0LmxlZnQgPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gIH1cbiAgaWYgKGkuaXNTY3JvbGxiYXJYVXNpbmdCb3R0b20pIHtcbiAgICB4UmFpbE9mZnNldC5ib3R0b20gPSBpLnNjcm9sbGJhclhCb3R0b20gLSBlbGVtZW50LnNjcm9sbFRvcDtcbiAgfSBlbHNlIHtcbiAgICB4UmFpbE9mZnNldC50b3AgPSBpLnNjcm9sbGJhclhUb3AgKyBlbGVtZW50LnNjcm9sbFRvcDtcbiAgfVxuICBkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsIHhSYWlsT2Zmc2V0KTtcblxuICB2YXIgeVJhaWxPZmZzZXQgPSB7dG9wOiBlbGVtZW50LnNjcm9sbFRvcCwgaGVpZ2h0OiBpLnJhaWxZSGVpZ2h0fTtcbiAgaWYgKGkuaXNTY3JvbGxiYXJZVXNpbmdSaWdodCkge1xuICAgIGlmIChpLmlzUnRsKSB7XG4gICAgICB5UmFpbE9mZnNldC5yaWdodCA9IGkuY29udGVudFdpZHRoIC0gKGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICsgZWxlbWVudC5zY3JvbGxMZWZ0KSAtIGkuc2Nyb2xsYmFyWVJpZ2h0IC0gaS5zY3JvbGxiYXJZT3V0ZXJXaWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgeVJhaWxPZmZzZXQucmlnaHQgPSBpLnNjcm9sbGJhcllSaWdodCAtIGVsZW1lbnQuc2Nyb2xsTGVmdDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGkuaXNSdGwpIHtcbiAgICAgIHlSYWlsT2Zmc2V0LmxlZnQgPSBpLm5lZ2F0aXZlU2Nyb2xsQWRqdXN0bWVudCArIGVsZW1lbnQuc2Nyb2xsTGVmdCArIGkuY29udGFpbmVyV2lkdGggKiAyIC0gaS5jb250ZW50V2lkdGggLSBpLnNjcm9sbGJhcllMZWZ0IC0gaS5zY3JvbGxiYXJZT3V0ZXJXaWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgeVJhaWxPZmZzZXQubGVmdCA9IGkuc2Nyb2xsYmFyWUxlZnQgKyBlbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgfVxuICB9XG4gIGRvbS5jc3MoaS5zY3JvbGxiYXJZUmFpbCwgeVJhaWxPZmZzZXQpO1xuXG4gIGRvbS5jc3MoaS5zY3JvbGxiYXJYLCB7bGVmdDogaS5zY3JvbGxiYXJYTGVmdCwgd2lkdGg6IGkuc2Nyb2xsYmFyWFdpZHRoIC0gaS5yYWlsQm9yZGVyWFdpZHRofSk7XG4gIGRvbS5jc3MoaS5zY3JvbGxiYXJZLCB7dG9wOiBpLnNjcm9sbGJhcllUb3AsIGhlaWdodDogaS5zY3JvbGxiYXJZSGVpZ2h0IC0gaS5yYWlsQm9yZGVyWVdpZHRofSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgdmFyIGkgPSBpbnN0YW5jZXMuZ2V0KGVsZW1lbnQpO1xuXG4gIGkuY29udGFpbmVyV2lkdGggPSBlbGVtZW50LmNsaWVudFdpZHRoO1xuICBpLmNvbnRhaW5lckhlaWdodCA9IGVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICBpLmNvbnRlbnRXaWR0aCA9IGVsZW1lbnQuc2Nyb2xsV2lkdGg7XG4gIGkuY29udGVudEhlaWdodCA9IGVsZW1lbnQuc2Nyb2xsSGVpZ2h0O1xuXG4gIHZhciBleGlzdGluZ1JhaWxzO1xuICBpZiAoIWVsZW1lbnQuY29udGFpbnMoaS5zY3JvbGxiYXJYUmFpbCkpIHtcbiAgICBleGlzdGluZ1JhaWxzID0gZG9tLnF1ZXJ5Q2hpbGRyZW4oZWxlbWVudCwgJy5wcy1zY3JvbGxiYXIteC1yYWlsJyk7XG4gICAgaWYgKGV4aXN0aW5nUmFpbHMubGVuZ3RoID4gMCkge1xuICAgICAgZXhpc3RpbmdSYWlscy5mb3JFYWNoKGZ1bmN0aW9uIChyYWlsKSB7XG4gICAgICAgIGRvbS5yZW1vdmUocmFpbCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZG9tLmFwcGVuZFRvKGkuc2Nyb2xsYmFyWFJhaWwsIGVsZW1lbnQpO1xuICB9XG4gIGlmICghZWxlbWVudC5jb250YWlucyhpLnNjcm9sbGJhcllSYWlsKSkge1xuICAgIGV4aXN0aW5nUmFpbHMgPSBkb20ucXVlcnlDaGlsZHJlbihlbGVtZW50LCAnLnBzLXNjcm9sbGJhci15LXJhaWwnKTtcbiAgICBpZiAoZXhpc3RpbmdSYWlscy5sZW5ndGggPiAwKSB7XG4gICAgICBleGlzdGluZ1JhaWxzLmZvckVhY2goZnVuY3Rpb24gKHJhaWwpIHtcbiAgICAgICAgZG9tLnJlbW92ZShyYWlsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBkb20uYXBwZW5kVG8oaS5zY3JvbGxiYXJZUmFpbCwgZWxlbWVudCk7XG4gIH1cblxuICBpZiAoIWkuc2V0dGluZ3Muc3VwcHJlc3NTY3JvbGxYICYmIGkuY29udGFpbmVyV2lkdGggKyBpLnNldHRpbmdzLnNjcm9sbFhNYXJnaW5PZmZzZXQgPCBpLmNvbnRlbnRXaWR0aCkge1xuICAgIGkuc2Nyb2xsYmFyWEFjdGl2ZSA9IHRydWU7XG4gICAgaS5yYWlsWFdpZHRoID0gaS5jb250YWluZXJXaWR0aCAtIGkucmFpbFhNYXJnaW5XaWR0aDtcbiAgICBpLnJhaWxYUmF0aW8gPSBpLmNvbnRhaW5lcldpZHRoIC8gaS5yYWlsWFdpZHRoO1xuICAgIGkuc2Nyb2xsYmFyWFdpZHRoID0gZ2V0VGh1bWJTaXplKGksIF8udG9JbnQoaS5yYWlsWFdpZHRoICogaS5jb250YWluZXJXaWR0aCAvIGkuY29udGVudFdpZHRoKSk7XG4gICAgaS5zY3JvbGxiYXJYTGVmdCA9IF8udG9JbnQoKGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ICsgZWxlbWVudC5zY3JvbGxMZWZ0KSAqIChpLnJhaWxYV2lkdGggLSBpLnNjcm9sbGJhclhXaWR0aCkgLyAoaS5jb250ZW50V2lkdGggLSBpLmNvbnRhaW5lcldpZHRoKSk7XG4gIH0gZWxzZSB7XG4gICAgaS5zY3JvbGxiYXJYQWN0aXZlID0gZmFsc2U7XG4gIH1cblxuICBpZiAoIWkuc2V0dGluZ3Muc3VwcHJlc3NTY3JvbGxZICYmIGkuY29udGFpbmVySGVpZ2h0ICsgaS5zZXR0aW5ncy5zY3JvbGxZTWFyZ2luT2Zmc2V0IDwgaS5jb250ZW50SGVpZ2h0KSB7XG4gICAgaS5zY3JvbGxiYXJZQWN0aXZlID0gdHJ1ZTtcbiAgICBpLnJhaWxZSGVpZ2h0ID0gaS5jb250YWluZXJIZWlnaHQgLSBpLnJhaWxZTWFyZ2luSGVpZ2h0O1xuICAgIGkucmFpbFlSYXRpbyA9IGkuY29udGFpbmVySGVpZ2h0IC8gaS5yYWlsWUhlaWdodDtcbiAgICBpLnNjcm9sbGJhcllIZWlnaHQgPSBnZXRUaHVtYlNpemUoaSwgXy50b0ludChpLnJhaWxZSGVpZ2h0ICogaS5jb250YWluZXJIZWlnaHQgLyBpLmNvbnRlbnRIZWlnaHQpKTtcbiAgICBpLnNjcm9sbGJhcllUb3AgPSBfLnRvSW50KGVsZW1lbnQuc2Nyb2xsVG9wICogKGkucmFpbFlIZWlnaHQgLSBpLnNjcm9sbGJhcllIZWlnaHQpIC8gKGkuY29udGVudEhlaWdodCAtIGkuY29udGFpbmVySGVpZ2h0KSk7XG4gIH0gZWxzZSB7XG4gICAgaS5zY3JvbGxiYXJZQWN0aXZlID0gZmFsc2U7XG4gIH1cblxuICBpZiAoaS5zY3JvbGxiYXJYTGVmdCA+PSBpLnJhaWxYV2lkdGggLSBpLnNjcm9sbGJhclhXaWR0aCkge1xuICAgIGkuc2Nyb2xsYmFyWExlZnQgPSBpLnJhaWxYV2lkdGggLSBpLnNjcm9sbGJhclhXaWR0aDtcbiAgfVxuICBpZiAoaS5zY3JvbGxiYXJZVG9wID49IGkucmFpbFlIZWlnaHQgLSBpLnNjcm9sbGJhcllIZWlnaHQpIHtcbiAgICBpLnNjcm9sbGJhcllUb3AgPSBpLnJhaWxZSGVpZ2h0IC0gaS5zY3JvbGxiYXJZSGVpZ2h0O1xuICB9XG5cbiAgdXBkYXRlQ3NzKGVsZW1lbnQsIGkpO1xuXG4gIGlmIChpLnNjcm9sbGJhclhBY3RpdmUpIHtcbiAgICBjbHMuYWRkKGVsZW1lbnQsICdwcy1hY3RpdmUteCcpO1xuICB9IGVsc2Uge1xuICAgIGNscy5yZW1vdmUoZWxlbWVudCwgJ3BzLWFjdGl2ZS14Jyk7XG4gICAgaS5zY3JvbGxiYXJYV2lkdGggPSAwO1xuICAgIGkuc2Nyb2xsYmFyWExlZnQgPSAwO1xuICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAnbGVmdCcsIDApO1xuICB9XG4gIGlmIChpLnNjcm9sbGJhcllBY3RpdmUpIHtcbiAgICBjbHMuYWRkKGVsZW1lbnQsICdwcy1hY3RpdmUteScpO1xuICB9IGVsc2Uge1xuICAgIGNscy5yZW1vdmUoZWxlbWVudCwgJ3BzLWFjdGl2ZS15Jyk7XG4gICAgaS5zY3JvbGxiYXJZSGVpZ2h0ID0gMDtcbiAgICBpLnNjcm9sbGJhcllUb3AgPSAwO1xuICAgIHVwZGF0ZVNjcm9sbChlbGVtZW50LCAndG9wJywgMCk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBpbnN0YW5jZXMgPSByZXF1aXJlKCcuL2luc3RhbmNlcycpO1xuXG52YXIgbGFzdFRvcDtcbnZhciBsYXN0TGVmdDtcblxudmFyIGNyZWF0ZURPTUV2ZW50ID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJFdmVudFwiKTtcbiAgZXZlbnQuaW5pdEV2ZW50KG5hbWUsIHRydWUsIHRydWUpO1xuICByZXR1cm4gZXZlbnQ7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChlbGVtZW50LCBheGlzLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgJ1lvdSBtdXN0IHByb3ZpZGUgYW4gZWxlbWVudCB0byB0aGUgdXBkYXRlLXNjcm9sbCBmdW5jdGlvbic7XG4gIH1cblxuICBpZiAodHlwZW9mIGF4aXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgdGhyb3cgJ1lvdSBtdXN0IHByb3ZpZGUgYW4gYXhpcyB0byB0aGUgdXBkYXRlLXNjcm9sbCBmdW5jdGlvbic7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93ICdZb3UgbXVzdCBwcm92aWRlIGEgdmFsdWUgdG8gdGhlIHVwZGF0ZS1zY3JvbGwgZnVuY3Rpb24nO1xuICB9XG5cbiAgaWYgKGF4aXMgPT09ICd0b3AnICYmIHZhbHVlIDw9IDApIHtcbiAgICBlbGVtZW50LnNjcm9sbFRvcCA9IHZhbHVlID0gMDsgLy8gZG9uJ3QgYWxsb3cgbmVnYXRpdmUgc2Nyb2xsXG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZURPTUV2ZW50KCdwcy15LXJlYWNoLXN0YXJ0JykpO1xuICB9XG5cbiAgaWYgKGF4aXMgPT09ICdsZWZ0JyAmJiB2YWx1ZSA8PSAwKSB7XG4gICAgZWxlbWVudC5zY3JvbGxMZWZ0ID0gdmFsdWUgPSAwOyAvLyBkb24ndCBhbGxvdyBuZWdhdGl2ZSBzY3JvbGxcbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRE9NRXZlbnQoJ3BzLXgtcmVhY2gtc3RhcnQnKSk7XG4gIH1cblxuICB2YXIgaSA9IGluc3RhbmNlcy5nZXQoZWxlbWVudCk7XG5cbiAgaWYgKGF4aXMgPT09ICd0b3AnICYmIHZhbHVlID49IGkuY29udGVudEhlaWdodCAtIGkuY29udGFpbmVySGVpZ2h0KSB7XG4gICAgLy8gZG9uJ3QgYWxsb3cgc2Nyb2xsIHBhc3QgY29udGFpbmVyXG4gICAgdmFsdWUgPSBpLmNvbnRlbnRIZWlnaHQgLSBpLmNvbnRhaW5lckhlaWdodDtcbiAgICBpZiAodmFsdWUgLSBlbGVtZW50LnNjcm9sbFRvcCA8PSAxKSB7XG4gICAgICAvLyBtaXRpZ2F0ZXMgcm91bmRpbmcgZXJyb3JzIG9uIG5vbi1zdWJwaXhlbCBzY3JvbGwgdmFsdWVzXG4gICAgICB2YWx1ZSA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnNjcm9sbFRvcCA9IHZhbHVlO1xuICAgIH1cbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRE9NRXZlbnQoJ3BzLXktcmVhY2gtZW5kJykpO1xuICB9XG5cbiAgaWYgKGF4aXMgPT09ICdsZWZ0JyAmJiB2YWx1ZSA+PSBpLmNvbnRlbnRXaWR0aCAtIGkuY29udGFpbmVyV2lkdGgpIHtcbiAgICAvLyBkb24ndCBhbGxvdyBzY3JvbGwgcGFzdCBjb250YWluZXJcbiAgICB2YWx1ZSA9IGkuY29udGVudFdpZHRoIC0gaS5jb250YWluZXJXaWR0aDtcbiAgICBpZiAodmFsdWUgLSBlbGVtZW50LnNjcm9sbExlZnQgPD0gMSkge1xuICAgICAgLy8gbWl0aWdhdGVzIHJvdW5kaW5nIGVycm9ycyBvbiBub24tc3VicGl4ZWwgc2Nyb2xsIHZhbHVlc1xuICAgICAgdmFsdWUgPSBlbGVtZW50LnNjcm9sbExlZnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCA9IHZhbHVlO1xuICAgIH1cbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRE9NRXZlbnQoJ3BzLXgtcmVhY2gtZW5kJykpO1xuICB9XG5cbiAgaWYgKCFsYXN0VG9wKSB7XG4gICAgbGFzdFRvcCA9IGVsZW1lbnQuc2Nyb2xsVG9wO1xuICB9XG5cbiAgaWYgKCFsYXN0TGVmdCkge1xuICAgIGxhc3RMZWZ0ID0gZWxlbWVudC5zY3JvbGxMZWZ0O1xuICB9XG5cbiAgaWYgKGF4aXMgPT09ICd0b3AnICYmIHZhbHVlIDwgbGFzdFRvcCkge1xuICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVET01FdmVudCgncHMtc2Nyb2xsLXVwJykpO1xuICB9XG5cbiAgaWYgKGF4aXMgPT09ICd0b3AnICYmIHZhbHVlID4gbGFzdFRvcCkge1xuICAgIGVsZW1lbnQuZGlzcGF0Y2hFdmVudChjcmVhdGVET01FdmVudCgncHMtc2Nyb2xsLWRvd24nKSk7XG4gIH1cblxuICBpZiAoYXhpcyA9PT0gJ2xlZnQnICYmIHZhbHVlIDwgbGFzdExlZnQpIHtcbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRE9NRXZlbnQoJ3BzLXNjcm9sbC1sZWZ0JykpO1xuICB9XG5cbiAgaWYgKGF4aXMgPT09ICdsZWZ0JyAmJiB2YWx1ZSA+IGxhc3RMZWZ0KSB7XG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZURPTUV2ZW50KCdwcy1zY3JvbGwtcmlnaHQnKSk7XG4gIH1cblxuICBpZiAoYXhpcyA9PT0gJ3RvcCcpIHtcbiAgICBlbGVtZW50LnNjcm9sbFRvcCA9IGxhc3RUb3AgPSB2YWx1ZTtcbiAgICBlbGVtZW50LmRpc3BhdGNoRXZlbnQoY3JlYXRlRE9NRXZlbnQoJ3BzLXNjcm9sbC15JykpO1xuICB9XG5cbiAgaWYgKGF4aXMgPT09ICdsZWZ0Jykge1xuICAgIGVsZW1lbnQuc2Nyb2xsTGVmdCA9IGxhc3RMZWZ0ID0gdmFsdWU7XG4gICAgZWxlbWVudC5kaXNwYXRjaEV2ZW50KGNyZWF0ZURPTUV2ZW50KCdwcy1zY3JvbGwteCcpKTtcbiAgfVxuXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uL2xpYi9oZWxwZXInKTtcbnZhciBkb20gPSByZXF1aXJlKCcuLi9saWIvZG9tJyk7XG52YXIgaW5zdGFuY2VzID0gcmVxdWlyZSgnLi9pbnN0YW5jZXMnKTtcbnZhciB1cGRhdGVHZW9tZXRyeSA9IHJlcXVpcmUoJy4vdXBkYXRlLWdlb21ldHJ5Jyk7XG52YXIgdXBkYXRlU2Nyb2xsID0gcmVxdWlyZSgnLi91cGRhdGUtc2Nyb2xsJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgdmFyIGkgPSBpbnN0YW5jZXMuZ2V0KGVsZW1lbnQpO1xuXG4gIGlmICghaSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFJlY2FsY3VhdGUgbmVnYXRpdmUgc2Nyb2xsTGVmdCBhZGp1c3RtZW50XG4gIGkubmVnYXRpdmVTY3JvbGxBZGp1c3RtZW50ID0gaS5pc05lZ2F0aXZlU2Nyb2xsID8gZWxlbWVudC5zY3JvbGxXaWR0aCAtIGVsZW1lbnQuY2xpZW50V2lkdGggOiAwO1xuXG4gIC8vIFJlY2FsY3VsYXRlIHJhaWwgbWFyZ2luc1xuICBkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gIGRvbS5jc3MoaS5zY3JvbGxiYXJZUmFpbCwgJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgaS5yYWlsWE1hcmdpbldpZHRoID0gXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsICdtYXJnaW5MZWZ0JykpICsgXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsICdtYXJnaW5SaWdodCcpKTtcbiAgaS5yYWlsWU1hcmdpbkhlaWdodCA9IF8udG9JbnQoZG9tLmNzcyhpLnNjcm9sbGJhcllSYWlsLCAnbWFyZ2luVG9wJykpICsgXy50b0ludChkb20uY3NzKGkuc2Nyb2xsYmFyWVJhaWwsICdtYXJnaW5Cb3R0b20nKSk7XG5cbiAgLy8gSGlkZSBzY3JvbGxiYXJzIG5vdCB0byBhZmZlY3Qgc2Nyb2xsV2lkdGggYW5kIHNjcm9sbEhlaWdodFxuICBkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsICdkaXNwbGF5JywgJ25vbmUnKTtcbiAgZG9tLmNzcyhpLnNjcm9sbGJhcllSYWlsLCAnZGlzcGxheScsICdub25lJyk7XG5cbiAgdXBkYXRlR2VvbWV0cnkoZWxlbWVudCk7XG5cbiAgLy8gVXBkYXRlIHRvcC9sZWZ0IHNjcm9sbCB0byB0cmlnZ2VyIGV2ZW50c1xuICB1cGRhdGVTY3JvbGwoZWxlbWVudCwgJ3RvcCcsIGVsZW1lbnQuc2Nyb2xsVG9wKTtcbiAgdXBkYXRlU2Nyb2xsKGVsZW1lbnQsICdsZWZ0JywgZWxlbWVudC5zY3JvbGxMZWZ0KTtcblxuICBkb20uY3NzKGkuc2Nyb2xsYmFyWFJhaWwsICdkaXNwbGF5JywgJycpO1xuICBkb20uY3NzKGkuc2Nyb2xsYmFyWVJhaWwsICdkaXNwbGF5JywgJycpO1xufTtcbiJdfQ==

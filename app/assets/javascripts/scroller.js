/*
 * Scroller JS library / jQuery plugin
 * Author: shanson
 *
 * JS Usage:
 *   new Scroller(document.querySelector('.my-div'), function() {
 *     console.log('scrolled to .my-div');
 *   })
 *
 * jQuery Usage:
 *   $('.my-div').scroller(function(isInView) {
 *     console.log('scrolled in or out of .my-div');
 *   });
 *
 *   or:
 *
 *   $('.my-div').scroller({
 *     handler: function(isInView) {},
 *     offset: 300
 *   })
 *
 */
var Scroller = (function ($, window, document, undefined) {


  // Create the defaults once
  var pluginName = 'scroller',
    defaults = {
      offset: 0
    };

  // The actual plugin constructor
  function Plugin( element, options ) {

    if(typeof options === 'function') {
      var handler = options;
      options = {
        handler: handler
      };
    }

    if(typeof options !== 'object' || !options || typeof options.handler !== 'function') {
      console.error('Failed to instantiate "scroller". Callback function must be defined');
    }

    if (typeof jQuery === 'function' && element instanceof jQuery) {
      element = element[0];
    }

    this.e = element;
    this.inView = false;
    this.options = extend({}, defaults, options);
    this._name = pluginName;
    this._defaults = defaults;

    this.init();
  }


  Plugin.prototype.init = function () {
    var t = this;

    $(window).on('load resize scroll', function() {
      if (t.inView === false && isElementInViewport(t.e, t.options.offset) ) {
        t.inView = true;
        t.options.handler.call(t.e, true);
      } else if(t.inView === true && !isElementInViewport(t.e, 0)) { // check without offset
        t.options.handler.call(t.e, false);
        t.inView = false;
      }
    });

  };

  /* modified from http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport */
  function isElementInViewport (el, offset) {

    var rect = el.getBoundingClientRect();

    // rect.top is relative to top of window
    // when element in view, rect.top is > 0 and < window height

    return (
      rect.top < (windowHeight() - offset) &&
      rect.bottom > 0
    );
  }

  function windowHeight() {
    return (window.innerHeight || document.documentElement.clientHeight) /*or $(window).height() */;
  }

  function windowWidth() {
    return (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */;
  }

  /* http://stackoverflow.com/questions/11197247/javascript-equivalent-of-jquerys-extend-method */
  function extend(){
    for(var i=1; i<arguments.length; i++) {
      for(var key in arguments[i]) {
        if(arguments[i].hasOwnProperty(key)) {
          arguments[0][key] = arguments[i][key];
        }
      }
    }
    return arguments[0];
  }


  // add jQuery plugin if jquery defined
  if (typeof jQuery === 'function') {
    $.fn.scroller = function ( handler, options ) {
      if(typeof handler === 'function') {
        if(!options) {
          options = {};
        }
        options.handler = handler;
      } else if(typeof handler === 'object') {
        options = handler;
      }

      return $(this).each(function () {
        var dat = $.data(this, "plugin_" + pluginName);
        if (!dat) {
          $.data( this, "plugin_" + pluginName,
          new Plugin( this, options ));
        }
      });
    };
  }

  return Plugin;

})( jQuery, window, document );
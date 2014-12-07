/**
 * imgr
 * author: shanson
 * Description:
 *   Lightweight script to asynchronously fetch images, with support for fetching different responsive assets
 *   If used on an image tag, will replace the 'src' attribute with the value of data-src or data-src-2x
 *   If used on any other element, will set the CSS background-image to be the value of data-src or data-src-2x
 *   Breakpoint for choosing between data-src and data-src-2x can be configured as a property
 *   TODO: support more complicated breakpoints
 *
 * Usage:
 *   <img data-src="my-img.jpg" data-src-2x="my-img@2x.jpg" />
 *   $('[data-src]').imgr({ breakpoint: 768 });
 */
(function(window, $) {

  var settings = {
    breakpoint: 768
  };

  $.fn.imgr = function(options) {

    var $t = $(this);
    settings = $.extend(settings, options);

    $t.each(function(i, img) {
      loadImage($(img));
    });

    return this;

  }

  function loadImage($el) {

    var tagname = $el.prop('tagName');
    var dataSrc = getAttr($el); // get data-src or data-src-2x
    if(!dataSrc) return;

    if(tagname.toLowerCase() === 'img') {

      // load image with src attr
      $el.attr('src', dataSrc);
      $el.on('load', function() {
        $el.addClass('loaded');
      });

    } else {

      // set image to background-image
      // first, load the image so we can add "loaded" class
      $('<img/>').attr('src', dataSrc).load(function() {
         $(this).remove(); // don't actually insert image into dom
         $el.css('background-image', 'url(' + dataSrc + ')');
         $el.addClass('loaded');
      });

    }
  }

  function getAttr($el) {
    if($(window).width() > settings.breakpoint && $el.attr('data-src-2x')) {
      return $el.attr('data-src-2x');
    } else {
      return $el.attr('data-src');
    }
  }

})(window, jQuery);
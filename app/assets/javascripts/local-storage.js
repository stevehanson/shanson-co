(function(window, $) {

  var init = function init() {
    if(typeof(Storage) !== "undefined") {
      if(localStorage.getItem('visited', true)) {
        $('.posts-list').css({'animation': 'none', 'opacity': '1'});
      }

      localStorage.setItem('visited', true);
    }
  };

  init();
})(window, jQuery);

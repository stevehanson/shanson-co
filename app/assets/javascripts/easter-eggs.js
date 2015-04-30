var MyModule = (function(window, $) {

  var clicks = 0;
  var lastAvatarClick = Date.now();

  // go to admin if avatar is clicked 4 times, quickly
  function adminRedirect() {
    $('.avatar, .icon-heart').click(function() {
      if(Date.now() - lastAvatarClick > 800) { // all clicks must be under 800ms apart
        clicks = 1;
        lastAvatarClick = Date.now();
      } else {
        clicks++;
      }
      if(clicks >= 4) {
        window.location = "/admin";
      }
    });
  }

  $(function() {
    adminRedirect();
  });

})(window, jQuery);

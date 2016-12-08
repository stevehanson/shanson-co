(function(document) {
  var toggle = document.querySelector('.nav-mobile-menu-toggle');

  if(toggle) {
    toggle.addEventListener('click', function() {
      document.getElementById('nav').classList.toggle('open');
    });
  }
})(document);
(function(document) {
  var toggle = document.querySelector('.nav-mobile-menu-toggle');

  if(toggle) {
    toggle.addEventListener('click', function() {
      var nav = document.getElementById('nav');
      nav.classList.toggle('open');

      // temporarily add 'closed' class so transition applies
      if(!nav.classList.contains('open')) {
        nav.classList.add('closed');
        setTimeout(function() { nav.classList.remove('closed'); }, 1000);
      }
    });
  }
})(document);
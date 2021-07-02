const toggle = document.querySelector('.nav-mobile-menu-toggle');

if (toggle) {
  toggle.addEventListener('click', function () {
    var nav = document.getElementById('nav');
    nav.classList.toggle('open');

    // temporarily add 'closed' class so transition applies
    if (nav.classList.contains('open')) {
      nav.querySelector('.nav-links').role = 'dialog';
      toggle.setAttribute('aria-expanded', true);
    } else {
      nav.querySelector('.nav-links').role = null;
      toggle.setAttribute('aria-expanded', false);
      nav.classList.add('closed');
      setTimeout(function () {
        nav.classList.remove('closed');
      }, 1000);
    }
  });
}

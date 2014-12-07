
(function() {

  function init() {
    if(Modernizr.touch) return;
    initAnimationElementsToOutOfView();
    $('.showcase').scroller(toggleInViewClasses, { offset: 400 });
    $('.fade-in-and-grow').scroller(toggleInViewClasses, { offset: 0 });
  }

  function initAnimationElementsToOutOfView() {
    var windowHeight = $(window).height();
    $('.showcase, .section').each(function() {
      var rect = this.getBoundingClientRect();
      if(rect.bottom < 0 || rect.top > windowHeight) {
        $(this).addClass('out-of-view');
      }
    });
  }

  function toggleInViewClasses(isInView) {
    if(isInView) {
      $(this).addClass('in-view').removeClass('out-of-view');
    } else {
      $(this).addClass('out-of-view').removeClass('in-view');
    }
  }


  init();

})();

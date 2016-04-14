(function() {

  function Kudo(element) {
    this.element = element;
    this.key = element.attr('data-key');
    if(!storageSupported()) {
      this.element.find('.kudo-heart').css('display', 'none');
      return;
    }
    this.isKudoed = !!getKudos()[this.key];
    if(this.isKudoed) { this.element.addClass('kudoed'); }
    this.bindEvents();
  }

  Kudo.prototype.bindEvents = function() {
    var self = this;
    this.element.find('.kudo-heart').on('mouseup', function() {
      if(self.isKudoed) {
        self.removeKudo();
      } else {
        self.addKudo();
      }
    });

    this.element.find('.cancel-kudo-form').click(function(e) {
      self.defaultKudoState();
      e.preventDefault();
    });
  };

  Kudo.prototype.addKudo = function() {
    var kudos = getKudos();
    kudos[this.key] = true;
    localStorage.setItem('kudos', JSON.stringify(kudos));

    var self = this;
    $.post('/api/kudos/' + this.key).success(function(data) {
      self.displayKudoThanks(data.count);
    });
    this.isKudoed = true;
    this.element.addClass('kudoed');
    this.track('add');
  };

  Kudo.prototype.removeKudo = function() {
    var kudos = getKudos();
    delete kudos[this.key];
    localStorage.setItem('kudos', JSON.stringify(kudos));

    var self = this;
    $.ajax({
      url: '/api/kudos/' + this.key,
      type: 'DELETE'
    }).success(function(data) {
      self.updateKudoCount(data.count);
    });

    this.isKudoed = false;
    this.element.removeClass('kudoed');
    this.track('remove');
  };

  Kudo.prototype.displayKudoThanks = function(kudoCount) {
    this.element.find('.kudo-count-message').css('display', 'none'); // hide count
    this.updateKudoCount(kudoCount);

    //var name = getStorage('userName');
    //if(false) { // if we decide to prompt for name, change this to if(!name)
    //  this.element.find('.kudo-heart').css('display', 'none');         // hide heart
    //  this.element.find('.kudo-thanks').css('display', 'block');        // display thanks
    //  this.element.find('.kudo-thanks-form').css('display', 'block');  // display form
    //}
    // else {
    var self = this;
    this.element.find('.kudo-thanks').css('display', 'block');        // display thanks
    setTimeout(function() {                                          // already have name
      self.element.find('.kudo-thanks').fadeOut(100, function() {    // fade count back in
        self.element.find('.kudo-heart').fadeIn(100);
        self.element.find('.kudo-count-message').fadeIn(100);
      });
    }, 1500);
    // }
  };

  Kudo.prototype.updateKudoCount = function(count) {
    this.element.find('.kudo-count').text(count);
    if(count == 1) {
      this.element.find('.kudo-word').text('kudo');
    } else {
      this.element.find('.kudo-word').text('kudos');
    }
  };

  Kudo.prototype.defaultKudoState = function() {
    this.element.find('.kudo-thanks').css('display', 'none');
    this.element.find('.kudo-thanks-form').css('display', 'none');

    this.element.find('.kudo-heart').css('display', 'block');
    this.element.find('.kudo-count-message').css('display', 'block');
  };

  Kudo.prototype.track = function(action) {
    ga('send', 'event', 'kudo', action, $('.post-title').text());
  };

  function getKudos() {
    if(storageSupported) {
      var kudos = JSON.parse(localStorage.getItem('kudos'));
      if(!kudos) {
        kudos = {};
        localStorage.setItem('kudos', JSON.stringify(kudos));
      }
      return kudos;
    }
  }

  function getStorage(key) {
    if(storageSupported) {
      return localStorage.getItem(key);
    }
  }

  function storageSupported() {
    return typeof(Storage) !== "undefined";
  }

  $(function() {
    $('.kudo-container').kudo();
  });

  $.fn.kudo = function() {
    return this.each(function() {
      return new Kudo($(this));
    });
  };
})();
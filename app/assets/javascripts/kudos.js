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
    this.element.on('mouseup touchend', function() {
      if(self.isKudoed) {
        self.removeKudo();
      } else {
        self.addKudo();
      }
    });
  };

  Kudo.prototype.addKudo = function() {
    var kudos = getKudos();
    kudos[this.key] = true;
    localStorage.setItem('kudos', JSON.stringify(kudos));

    var self = this;
    $.post('/api/kudos/' + this.key).success(function(data) {
      self.element.find('.kudo-count').text(data.count);
    });
    this.isKudoed = true;
    this.element.addClass('kudoed');
  };

  Kudo.prototype.removeKudo = function() {
    var kudos = getKudos();
    delete kudos[this.key];
    localStorage.setItem('kudos', JSON.stringify(kudos));

    var self = this;
    $.ajax({
      url: '/api/kudos/' + this.key,
      type: 'DELETE',
    }).success(function(data) {
      self.element.find('.kudo-count').text(data.count);
    });

    this.isKudoed = false;
    this.element.removeClass('kudoed');
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

  return $.fn.kudo = function() {
    return this.each(function() {
      return new Kudo($(this));
    });
  };
})();
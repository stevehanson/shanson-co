(function() {

  function Kudo(element) {
    this.element = element;
    this.heartElement = element.querySelector('.kudo-heart');
    this.postId = element.getAttribute('data-post-id');

    this.loadKudos();
    if(!storageSupported()) {
      this.heartElement.style.display = 'none';
      return;
    }

    this.isKudoed = !!getKudos()[this.postId];
    if(this.isKudoed) { this.element.classList.add('kudoed'); }
    this.bindEvents();
  }

  Kudo.prototype.bindEvents = function() {
    var self = this;
    this.heartElement.addEventListener('mouseup', function() {
      if(self.isKudoed) {
        self.removeKudo();
      } else {
        self.addKudo();
      }
    });
  };

  Kudo.prototype.loadKudos = function() {
    firebase.database().ref('/posts/' + this.postId + '/kudos_count').once('value').then(function(snapshot) {
      this.kudosCount = parseInt(snapshot.val());
      this.updateKudoCount(this.kudosCount);
      _(this.element).fade('in', 100);
    }.bind(this));
  };

  Kudo.prototype.addKudo = function() {
    var kudos = getKudos();
    kudos[this.postId] = true;
    localStorage.setItem('kudos', JSON.stringify(kudos));

    var self = this;
    this.kudosCount += 1;

    // TODO: actually sync kudos in a transaction and make sure we are setting the right value
    firebase.database().ref('posts/' + this.postId + '/kudos_count').set(self.kudosCount);

    self.displayKudoThanks(self.kudosCount);
    this.isKudoed = true;
    this.element.classList.add('kudoed');
    this.track('add');
  };

  Kudo.prototype.removeKudo = function() {
    var kudos = getKudos();
    delete kudos[this.postId];
    localStorage.setItem('kudos', JSON.stringify(kudos));

    var self = this;
    this.kudosCount -= 1;

    // TODO: actually sync kudos in a transaction and make sure we are setting the right value
    firebase.database().ref('posts/' + this.postId + '/kudos_count').set(self.kudosCount);

    self.updateKudoCount(self.kudosCount);
    this.isKudoed = false;
    this.element.classList.remove('kudoed');
    this.track('remove');
  };

  Kudo.prototype.displayKudoThanks = function(kudoCount) {
    var self = this;
    this.element.querySelector('.kudo-count-message').style.display = 'none'; // hide count
    this.element.querySelector('.kudo-thanks').style.display = 'block';  // display thanks
    this.updateKudoCount(kudoCount);

    setTimeout(function() {
      _(self.element.querySelector('.kudo-thanks')).fade('out', 100);         // fade thanks out after 1.5s
      setTimeout(function() {
        _(self.element.querySelector('.kudo-count-message')).fade('in', 100); // fade count back in after thanks out
      }, 110);
    }, 1500);
    // }
  };

  Kudo.prototype.updateKudoCount = function(count) {
    this.element.querySelector('.kudo-count').textContent = count;
    var kudoWord = count === 1 ? 'kudo' : 'kudos';
    this.element.querySelector('.kudo-word').textContent = kudoWord;
  };

  Kudo.prototype.track = function(action) {
    ga('send', 'event', 'kudo', action, document.querySelector('.post-title').textContent);
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

  function getStorage(postId) {
    if(storageSupported) {
      return localStorage.getItem(postId);
    }
  }

  function storageSupported() {
    return typeof(Storage) !== "undefined";
  }

  document.querySelectorAll('.kudo-container').forEach(function(kudoContainer) {
    new Kudo(kudoContainer);
  });
})();
(function() {

  function Kudo(element) {
    this.element = element;
    this.heartButton = element.querySelector('.kudo-button');
    this.postId = element.getAttribute('data-post-id');

    this.loadKudos();
    if(!storageSupported()) {
      this.heartButton.style.display = 'none';
      return;
    }

    this.isKudoed = !!getKudos()[this.postId];
    if(this.isKudoed) { this.element.classList.add('kudoed'); }
    this.bindEvents();
  }

  Kudo.prototype.bindEvents = function() {
    var self = this;
    this.heartButton.addEventListener('click', function() {
      if(self.isKudoed) {
        self.removeKudo();
      } else {
        self.addKudo();
      }
    });
  };

  Kudo.prototype.loadKudos = function() {
    this.postRef = firebase.database().ref('/posts/' + this.postId);

    // will listen for updates
    this.postRef.on('value', function(snapshot) {
      if(!snapshot.val()) {
        this.postRef.set({ kudos_count: 0 });
      }

      this.postData = snapshot.val() || { kudos_count: 0 };
      this.kudosCount = parseInt(this.postData.kudos_count);
      this.updateKudoCountDisplay(this.kudosCount);
      _(this.element).fade('in', 100);
    }.bind(this));
  };

  Kudo.prototype.addKudo = function() {
    var kudos = getKudos();
    kudos[this.postId] = true;
    localStorage.setItem('kudos', JSON.stringify(kudos));
    this.toggleKudo('add');

    this.displayKudoThanks();
    this.isKudoed = true;
    this.element.classList.add('kudoed');
    this.track('add');
  };

  Kudo.prototype.toggleKudo = function(operation) {
    var self = this;

    // perform kudo update in a transaction. if the count
    // has been updated since the user was on the page, then
    // it will fail and retry until it succeeds
    this.postRef.transaction(function(post) {
      if (post) {
        if (operation === 'add') {
          post.kudos_count = post.kudos_count || 0;
          post.kudos_count++;
        } else {
          post.kudos_count = post.kudos_count || 1;
          post.kudos_count--;
        }

        self.kudosCount = post.kudos_count;
        self.updateKudoCountDisplay(self.kudosCount);
      }

      return post;
    });
  };

  Kudo.prototype.removeKudo = function() {
    var kudos = getKudos();
    delete kudos[this.postId];
    localStorage.setItem('kudos', JSON.stringify(kudos));
    this.toggleKudo('remove');

    this.updateKudoCountDisplay(this.kudosCount);
    this.isKudoed = false;
    this.element.classList.remove('kudoed');
    this.track('remove');
  };

  Kudo.prototype.displayKudoThanks = function() {
    var self = this;
    this.element.querySelector('.kudo-count-message').style.display = 'none'; // hide count
    this.element.querySelector('.kudo-thanks').style.display = 'block';  // display thanks

    setTimeout(function() {
      _(self.element.querySelector('.kudo-thanks')).fade('out', 100);         // fade thanks out after 1.5s
      setTimeout(function() {
        _(self.element.querySelector('.kudo-count-message')).fade('in', 100); // fade count back in after thanks out
      }, 110);
    }, 1500);
    // }
  };

  Kudo.prototype.updateKudoCountDisplay = function(count) {
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

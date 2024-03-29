import { _ } from './_';

let firebaseApp;
class Kudo {
  constructor(element) {
    this.element = element;
    this.heartButton = element.querySelector('.kudo-button');
    this.postId = element.getAttribute('data-post-id');
    this.loadKudos();
    if (!storageSupported()) {
      this.heartButton.style.display = 'none';
      return;
    }

    this.isKudoed = !!getKudos()[this.postId];
    if (this.isKudoed) {
      this.displayKudoed();
    } else {
      this.displayNotKudoed();
    }

    this.bindEvents();
  }

  bindEvents() {
    var self = this;
    this.heartButton.addEventListener('click', function () {
      if (self.isKudoed) {
        self.removeKudo();
      } else {
        self.addKudo();
      }
    });
  }

  loadKudos() {
    this.postRef = firebaseApp.database().ref('/posts/' + this.postId);

    // will listen for updates
    this.postRef.on(
      'value',
      function (snapshot) {
        if (!snapshot.val()) {
          this.postRef.set({ kudos_count: 0 });
        }

        this.postData = snapshot.val() || { kudos_count: 0 };
        this.kudosCount = parseInt(this.postData.kudos_count);
        this.updateKudoCountDisplay(this.kudosCount);
        _(this.element).fade('in', 100);
        // this.element.style.display = 'flex';
      }.bind(this)
    );
  }

  addKudo() {
    var kudos = getKudos();
    kudos[this.postId] = true;
    localStorage.setItem('kudos', JSON.stringify(kudos));
    this.toggleKudo('add');
    this.displayKudoed();
    this.displayKudoThanks();
  }

  displayKudoed() {
    this.isKudoed = true;
    this.element.classList.add('kudoed');
    this.heartButton.setAttribute('aria-pressed', true);
  }

  toggleKudo(operation) {
    var self = this;

    // perform kudo update in a transaction. if the count
    // has been updated since the user was on the page, then
    // it will fail and retry until it succeeds
    this.postRef.transaction(function (post) {
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
  }

  removeKudo() {
    var kudos = getKudos();
    delete kudos[this.postId];
    localStorage.setItem('kudos', JSON.stringify(kudos));
    this.toggleKudo('remove');
    this.updateKudoCountDisplay(this.kudosCount);
    this.displayNotKudoed();
  }

  displayNotKudoed() {
    this.isKudoed = false;
    this.element.classList.remove('kudoed');
    this.heartButton.setAttribute('aria-pressed', false);
  }

  displayKudoThanks() {
    var self = this;
    this.element.querySelector('.kudo-count-message').style.display = 'none'; // hide count
    this.element.querySelector('.kudo-thanks').style.display = 'block'; // display thanks

    setTimeout(function () {
      // self.element.querySelector('.kudo-thanks').style.display = 'none';
      // self.element.querySelector('.kudo-count-message').style.display = 'block';

      _(self.element.querySelector('.kudo-thanks')).fade('out', 100);
      setTimeout(function () {
        _(self.element.querySelector('.kudo-count-message')).fade('in', 100);
      }, 110);
    }, 1500);
  }

  updateKudoCountDisplay(count) {
    this.element.querySelector('.kudo-count').textContent = count;
    var kudoWord = count === 1 ? 'kudo' : 'kudos';
    this.element.querySelector('.kudo-word').textContent = kudoWord;
  }
}

function getKudos() {
  if (storageSupported) {
    var kudos = JSON.parse(localStorage.getItem('kudos'));
    if (!kudos) {
      kudos = {};
      localStorage.setItem('kudos', JSON.stringify(kudos));
    }
    return kudos;
  }
}

function storageSupported() {
  return typeof Storage !== 'undefined';
}

const injectScript = (src, onLoad) => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.defer = true;
  script.onload = onLoad;
  script.src = src;
  document.getElementsByTagName('head')[0].appendChild(script);
};
const injectFirebase = (onLoad) => {
  injectScript('https://www.gstatic.com/firebasejs/8.7.0/firebase-app.js');
  injectScript(
    'https://www.gstatic.com/firebasejs/8.7.0/firebase-database.js',
    onLoad
  );
};

const initializeFirebase = () => {
  firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyAggscqrqgt998lEG0qKLUKIpujLtTjZ_s',
    authDomain: 'shanson-co-31c59.firebaseapp.com',
    databaseURL: 'https://shanson-co-31c59.firebaseio.com',
    storageBucket: 'shanson-co-31c59.appspot.com',
    messagingSenderId: '855737951921',
  });
};

window.addEventListener('load', () => {
  const kudoContainers = document.querySelectorAll('.kudo-container');
  if (kudoContainers.length > 0) {
    injectFirebase(() => {
      initializeFirebase();
      for (let container of kudoContainers) {
        new Kudo(container);
      }
    });
  }
});

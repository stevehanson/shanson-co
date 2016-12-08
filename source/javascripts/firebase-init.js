(function(document) {
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAggscqrqgt998lEG0qKLUKIpujLtTjZ_s",
    authDomain: "shanson-co-31c59.firebaseapp.com",
    databaseURL: "https://shanson-co-31c59.firebaseio.com",
    storageBucket: "shanson-co-31c59.appspot.com",
    messagingSenderId: "855737951921"
  };

  if(typeof(firebase) !== 'undefined') {
    firebase.initializeApp(config);
  }

})(document);


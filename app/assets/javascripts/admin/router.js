// For more information see: http://emberjs.com/guides/routing/

App.Router.reopen({
  rootURL: '/admin/'
});

App.Router.map(function() {
  this.resource('posts', { path: '' }, function() {
    this.route('new');
    this.route('show', { path: ':id' });
  });
});

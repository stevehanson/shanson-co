App.PostsNewRoute = Ember.Route.extend({

  model: function(params) {
    return this.store.createRecord('post', {
      draft: true,
      publishedAt: new Date()
    });
  },

  renderTemplate: function() {
    var postShowController = this.controllerFor('posts.show');
    postShowController.set('showOptions', true);
    this.render('posts.show', {
      controller: postShowController
    });
  }

});
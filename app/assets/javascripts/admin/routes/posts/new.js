App.PostsNewRoute = Ember.Route.extend({

  model: function(params) {
    return this.store.createRecord('post', {
      draft: true,
      publishedAt: new Date()
    });
  },

  renderTemplate: function(controller, model) {
    var postShowController = this.controllerFor('posts.show');
    postShowController.set('showOptions', true);
    postShowController.set('model', model);
    this.render('posts.show', {
      controller: postShowController
    });
  }

});
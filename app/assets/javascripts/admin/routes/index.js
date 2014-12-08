App.IndexRoute = Ember.Route.extend({

  model: function() {
    return this.store.createRecord('post', {
      draft: true,
      publishedAt: new Date()
    });
  }

});
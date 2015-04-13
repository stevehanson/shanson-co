App.PostsShowRoute = Ember.Route.extend({

  model: function(params) {
    return this.store.find('post', params.id);
  }

});
App.IndexController = Ember.Controller.extend({
  needs: ['application'],
  posts: Ember.computed.alias('controllers.application.model'),

  showPreview: false,

  actions: {
    togglePreview: function() {
      this.toggleProperty('showPreview');
    },

    save: function() {
      this.get('model').save();
    }
  }
});
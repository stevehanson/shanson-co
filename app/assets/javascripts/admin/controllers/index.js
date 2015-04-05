App.IndexController = Ember.Controller.extend({
  needs: ['application'],
  posts: Ember.computed.alias('controllers.application.model'),
  showPreview: false,

  actions: {
    togglePreview: function() {
      this.toggleProperty('showPreview');
    },

    selectPost: function(post) {
      this.set('model', post);
    },

    save: function() {
      this.get('model').save();
    },

    publish: function() {
      if(confirm('Alright! Are you sure you\'re ready?')) {
        this.set('model.draft', false);
        this.get('model').save();
      }
    },

    unpublish: function() {
      var msg = 'Are you sure? This will remove the post from the blog. Any sites that currently link here will break.';
      if(confirm(msg)) {
        this.set('model.draft', true);
        this.get('model').save();
      }
    },

    delete: function() {
      this.get('model').destroyRecord().then(function() {
        var postsLength = this.get('posts.length');
        this.set('model',
          this.get('posts').objectAt(postsLength - 1));
      }.bind(this));
    },

    new: function() {
      var post = this.store.createRecord('post', {
        draft: true,
        publishedAt: new Date()
      });
      this.set('model', post);
    }
  }
});
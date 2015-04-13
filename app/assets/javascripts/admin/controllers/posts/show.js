App.PostsShowController = Ember.Controller.extend({
  showPreview: false,
  showOptions: false,
  notPreview: Ember.computed.not('showPreview'),
  notOptions: Ember.computed.not('showOptions'),

  actions: {
    togglePreview: function() {
      this.toggleProperty('showPreview');
      debugger;
    },

    toggleOptions: function() {
      this.toggleProperty('showOptions');
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
    }
  }
});
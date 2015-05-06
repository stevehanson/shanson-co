App.PostsShowController = Ember.Controller.extend({
  showPreview: false,
  showOptions: false,
  notPreview: Ember.computed.not('showPreview'),
  notOptions: Ember.computed.not('showOptions'),

  _init: function() {
    var self = this;
    $(document).on('blur', '#title', function() {
      if(Ember.isEmpty(self.get('model.slug'))) {
        self.set('model.slug', self.sluggify(self.get('model.title')));
      }
    });
  }.on('init'),

  save: function() {
    var self = this;
    this.get('model').save().then(function() {
      self.set('showSaveSuccess', true);
      Ember.run.later(self, function() {
        self.set('showSaveSuccess', false);
      }, 3000);
    }, function() {
      self.set('showSaveError', true);
      Ember.run.later(self, function() {
        self.set('showSaveError', false);
      }, 10000);
    }).catch(function() {
      self.set('showSaveError', true);
      Ember.run.later(self, function() {
        self.set('showSaveError', false);
      }, 10000);
    });
  },

  sluggify: function(str) {
    return str.replace(/[^a-zA-Z0-9\-\_ ]/g, '').replace(/[ _]/g, '-').toLowerCase();
  },

  actions: {
    togglePreview: function() {
      this.toggleProperty('showPreview');
    },

    toggleOptions: function() {
      this.toggleProperty('showOptions');
    },

    save: function() {
      this.save();
    },

    publish: function() {
      if(confirm('Alright! Are you sure you\'re ready?')) {
        this.set('model.draft', false);
        this.save();
      }
    },

    unpublish: function() {
      var msg = 'Are you sure? This will remove the post from the blog. Any sites that currently link here will break.';
      if(confirm(msg)) {
        this.set('model.draft', true);
        this.save();
      }
    },

    delete: function() {
      if(confirm("Are you sure you want to delete this post? You can't go back.")) {
        this.get('model').destroyRecord().then(function() {
          var postsLength = this.get('posts.length');
          this.set('model',
            this.get('posts').objectAt(postsLength - 1));
        }.bind(this));
      }
    }
  }
});
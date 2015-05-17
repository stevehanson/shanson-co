App.PostsController = Ember.Controller.extend({

  groupedPosts: function() {
    var self = this;
    var posts = this.get('model');
    var groupedPosts = [];
    posts.sortBy('publishedAt').forEach(function(post) {
      self.addPostToGroupingArray(post, self.getSeparator(post), groupedPosts);
    });

    return groupedPosts;
  }.property('model', 'model.[]'),

  addPostToGroupingArray: function(post, separator, groupedPosts) {
    for(var i=0; i<groupedPosts.length; i++) {
      if(groupedPosts[i] && groupedPosts[i].name === separator) {
        groupedPosts[i].posts.unshift(post);
        return;
      }
    }
    groupedPosts.unshift({
      name: separator,
      posts: [post]
    });
  },

  getSeparator: function(post) {
    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
    var date = post.get('publishedAtDate');
    return monthNames[date.getMonth()] + " " + date.getFullYear();
  }

});
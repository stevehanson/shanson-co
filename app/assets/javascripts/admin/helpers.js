Ember.Handlebars.registerBoundHelper('markdown', function (content) {
  if(content && content.length > 0) {
    return new Ember.Handlebars.SafeString(new Showdown.converter().makeHtml(content));
  }
});
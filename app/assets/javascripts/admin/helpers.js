Ember.Handlebars.registerBoundHelper('markdown', function (content) {
  if(content && content.length > 0) {
    return new Ember.Handlebars.SafeString(new Showdown.converter().makeHtml(content));
  }
});

Ember.Handlebars.registerBoundHelper('truncate', function (content, length) {
  if(content && content.length > length) {
    return content.substr(0, length) + "...";
  } else {
    return content;
  }
});
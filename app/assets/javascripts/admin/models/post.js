App.Post = DS.Model.extend({
  title: DS.attr(),
  body: DS.attr(),
  slug: DS.attr(),
  template: DS.attr(),
  publishedAt: DS.attr(),
  draft: DS.attr('boolean')
});

App.PostSerializer = DS.ActiveModelSerializer.extend({
  serialize: function(item, options) {
    var serialized = this._super(item, options);
    serialized.published_at = moment(item.attr('publishedAt')).format("YYYY-MM-DD");

    return serialized;
  }
});

// App.JSONTransforms.isodate = DS.Transform.extend({
//   deserialize: function(serialized) {
//     var date, offset;
//     if (serialized) {
//       date = new Date(serialized);
//       offset = date.getTimezoneOffset();
//       return new Date(date.getTime() + offset * 60000);
//     } else {
//       return null;
//     }
//   },
//   serialize: function(date) {
//     if (date) {
//       return moment(date).format("YYYY-MM-DD");
//     } else {
//       return null;
//     }
//   }
// });

App.Post.FIXTURES = [
  { id: 1, title: 'Butter is quite good', body: '**Lorem** ipsum dolor sit amet, consectetur adipisicing elit. Quo sit omnis, nulla voluptates voluptas ipsa officiis! Atque in nemo perspiciatis laborum neque, repellendus velit tenetur excepturi consectetur? Iusto earum, laudantium.', publishedAt: new Date() },
  { id: 2, title: 'More on butter', body: '**Lorem** ipsum dolor sit amet, consectetur adipisicing elit. Quo sit omnis, nulla voluptates voluptas ipsa officiis! Atque in nemo perspiciatis laborum neque, repellendus velit tenetur excepturi consectetur? Iusto earum, laudantium.', publishedAt: new Date() }
];
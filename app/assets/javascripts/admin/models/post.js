App.Post = DS.Model.extend({
  title: DS.attr(),
  body: DS.attr(),
  publishedAt: DS.attr('date'),
  draft: DS.attr('boolean')
});

//App.PostAdapter = DS.FixtureAdapter.extend();

App.Post.FIXTURES = [
  { id: 1, title: 'Butter is quite good', body: '**Lorem** ipsum dolor sit amet, consectetur adipisicing elit. Quo sit omnis, nulla voluptates voluptas ipsa officiis! Atque in nemo perspiciatis laborum neque, repellendus velit tenetur excepturi consectetur? Iusto earum, laudantium.', publishedAt: new Date() },
  { id: 2, title: 'More on butter', body: '**Lorem** ipsum dolor sit amet, consectetur adipisicing elit. Quo sit omnis, nulla voluptates voluptas ipsa officiis! Atque in nemo perspiciatis laborum neque, repellendus velit tenetur excepturi consectetur? Iusto earum, laudantium.', publishedAt: new Date() }
];
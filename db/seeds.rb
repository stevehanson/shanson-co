# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


unless Post.any?
  Post.create(
    slug: 'my-list-of-things-to-do',
    title: "My List of Things To Do. Or I Won't do Them.",
    published_at: Time.now - 1.day,
    draft: false,
    body:
    %Q{Here is the list of things I wish to do!

    * write more posts
    * write even more posts
    * write even more posts!}
  )

  puts '√ Created Post: My List of Things To Do'

  Post.create(
    slug: 'quit-refrigerating-your-butter',
    title: "Quit refrigerating your butter",
    published_at: Time.now,
    draft: false,
    body:
    %Q{Cold butter doesn't spread.

  I like a piece of toast with butter on it in the morning and have always had a hard time spreading the butter. This Christmas, my brother solved all of my (our) problems by gifting me and Monica (and himself, since he lives with us..) this French butter dish.

  [[picture here]]!}
  )

  puts '√ Created Post: Quit refrigerating your butter'

  Post.create(
    slug: 'about',
    title: "About",
    published_at: Time.now,
    template: :page,
    draft: false,
    body:
    %Q{Hey-o. I'm Steve Hanson, or shanson, if you will. I'm an Austin-based web developer currently doing freelance work. I [tweet](http://twitter.com/stephenhanson) on Twitter and [write code](http://github.com/stevehanson) on GitHub.

  I post more than just code on this site, because I believe in using this platform to share who I am as a person, rather than just as a developer. I know that many of you who stumble here are not as interested in me as a person, and to you I say "sorry for the noise :)".

  You can get to know me here:

  * [Twitter](http://twitter.com/stephenhanson)
  * [Instagram](http://instagram.com/steve_hanson)
  * [GitHub](http://github.com/stevehanson)
  * [Stack Overflow](http://stackoverflow.com/users/680847/steve-hanson)

  Or, contact me [by email](mailto:steve@shanson.co?subject=Hello from shanson.co).

  #### Behind the curtain

  I built this site using Rails and a custom admin built in Ember.js. You can check out the code [on GitHub](https://github.com/stevehanson/shanson-co) or [read more about it](/building-this-site).

  Type is set in [Bitter](http://www.huertatipografica.com/fonts/bitter-ht) and [PT Sans](http://www.paratype.com/public/).}
  )

  puts '√ Created About Page'
end


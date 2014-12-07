# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Post.delete_all

Post.create(
  id: 1,
  slug: 'quit-refrigerating-your-butter',
  title: "Quit refrigerating your butter",
  published_at: Time.now - 1.day,
  body:
  %Q{Bla bla bla

  Thanks for visiting [shanson.co](http://shanson.co)!}
)

Post.create(
  id: 2,
  slug: 'my-list-of-things-to-do',
  title: "My List of Things To Do",
  published_at: Time.now,
  body:
  %Q{Here is the list of things I wish to do!

  * write more posts
  * write even more posts
  * write even more posts!}
)
---
title: Building this Site
tags: tech
excerpt: I’ve been through a few revisions of my personal site in the last few years. Most recently, I was on a Wordpress site, and it just wasn’t doing it for me, and I wanted to build something completely custom. So, here we are.
---

I've been through a few revisions of my personal site in the last few years. Most recently, I was on a Wordpress site, and it just wasn't doing it for me. It was more off-the-shelf than I wanted and didn't feel like me. So, back in December, I set out to build a new, fully custom personal site.

Now that the site is live, I figured I'd share the experience with you guys.

### Getting Going

This was exciting. I had a blank slate in front of me and it was time to start planning. First off, I had to figure out the format of the site. Would it be a blog that my friends would read or more of a career portfolio site, or something else entirely? I knew right away that I wanted something more holistic than a career site. I wanted a place where I can share whatever's on my mind and where people can get to know me. Blogs do that, so a blog it is.

### Design Time

Now that I knew I was building a blog, I started thinking about the design of the site. I knew from the get-go that I wanted a simple, minimalist design. I started looking around at what other people are doing and built up a list of sites I like, which I used as inspiration:

* [johntornow.com](http://johntornow.com)
* [jacobian.org](http://jacobian.org)
* [medium.com](http://medium.com)
* [jlongster.com](http://jlongster.com)
* [robdodson.me](http://robdodson.me)
* [soff.es](http://soff.es)
* [stevenschobert.com](http://stevenschobert.com)
* [philipriddlen.com](http://philipriddlen.com)

I'm not too much of a designer, so inspiration from these sites was indispensable in my design process. After taking notes of what I like, I was ready to get started with design. I generally design in the browser since I do web better than I do Photoshop. So, I set up a site and started playing with some different designs:

<figure>
  <img src="http://shanson-co.s3.amazonaws.com/u/this-site-design-1.jpg" alt="First site design" />
  <figcaption>First pass. The big image felt a little vain.</figcaption>
</figure>

<figure>
  <img src="http://shanson-co.s3.amazonaws.com/u/this-site-design-2.png" alt="Second site design" />
  <figcaption>Second pass. A little more similar to what I ended up with.</figcaption>
</figure>

After a little more trial and error, I ended up with what I have now:

<figure>
  <img src="http://shanson-co.s3.amazonaws.com/u/this-site-design-3.png" alt="Second site design" />
  <figcaption>The final design</figcaption>
</figure>

It's nothing fancy, but I feel like it's clean and functional. Now that I had a basic design, I was ready to think about typography. I tried out quite a few typefaces in my search for the right ones:

<img src="http://shanson-co.s3.amazonaws.com/u/this-site-fonts.png" alt="Font choices" />

I ultimately landed on [Bitter](http://www.huertatipografica.com/fonts/bitter-ht) for the serif body copy and [PT Sans](http://www.paratype.com/public/) for headings, served by Google Fonts. I knew I wanted a serif font for my body copy, and I really like the strong look of Bitter. PT Sans seemed to complement it well and was also available on Google Fonts.

### Technical Time

All the while, while I was working on the design, I was also working on the technical side of things. Here's how I decided to do things.

**Choosing "the stack"**

A lot of my friends built their personal sites using [static](http://jekyllrb.com/) [site](http://www.metalsmith.io/) [generators](http://wintersmith.io/). I toyed around with the idea, but since I knew I wanted to manage content via an admin, I decided to build a *regular* web app. After I made that decision, Rails was the obvious choice. I can be super productive in it, and it automatically handles my minification, concatentation, CDNification, etc. for me with just a little work.

For the blog admin interface, I chose Ember.js, because I knew I would want an interactive single-page app, and Ember.js is awesome for that. I'm super pleased with how it turned out. This is what it looks like:

<img src="http://shanson-co.s3.amazonaws.com/u/this-site-admin-2.png" alt="Admin UI" />

Finally, I decided to host on [Heroku](http://heroku.com). Heroku is super simple, and I'm able to host for free with New Relic keeping my single dyno alive. I'll probably switch over to Digital Ocean when I get the time.

The end result is that blog post pages that don't have images are coming in at under 100kb and loading in under a second. Good enough for me :)

**Kudos**

I wanted some way for users to interact with my blog posts. I'm not crazy about comments, so I decided to just allow users to *like* posts, like what [Svbtle](http://svbtle.com) does with *kudos*.

On the technical side, I just store a like counter in the database for each post. I use the browser's local storage to keep track of which posts users have already liked, so if they go back to a post, they can't like it again. It's simple, and there are lots of ways to game the system, but I'll see how it works for now. In the future, I'll probably store the IP address for each like, so I can do some server-side validation.

I also toyed around with (and mostly built) a feature to ask people for their names when they like posts, but I ultimately decided it would be too creepy:

<img class="small" src="http://shanson-co.s3.amazonaws.com/u/this-site-kudos-creepy.png" alt="Font chooses" />

**It's on GitHub**

The site's code is open-source and [hosted on GitHub](https://github.com/stevehanson/shanson-co). Check it out, use it for your own blog, whatever you'd like. I might release it as a blog platform one day if I gauge any interest.

### It's Live!

After four months of my free time and 48 GitHub commits, I finally launched this thing. Now the hard part: writing content :)

Thanks for listening to me talk about the process, and please do come back.
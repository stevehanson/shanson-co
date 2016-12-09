---
title: I’m a Static Site
tags: tech
excerpt: I just re-platformed this site off of Rails to Middleman, a static site generator.
---

I launched this site a couple years ago on Rails. I partially went with Rails because I was in the process of trying learn Rails better, and also because I anticipated wanting lots of back-end features. For example, the _kudos_ at the bottom of each post were being stored in a database, which you don't get with a static site.

Well, fast forward a couple years, and Heroku, where I was hosting the site, now charges for their hobby tier, and Rails was starting to just seem like overkill for such a small project. <mark>So, I decided about a week ago to switch to Middleman and host my site on S3.</mark>

The process was actually pretty simple. Middleman is built in Ruby and is specifically structured to be familiar to Rails developers. As a result, switching over to Middleman was largely just a copy-paste effort to move my markdown posts from the admin I had built over to static files.

#### Building the Kudos

Since I was switching over to a static site, that meant I was losing my database, which I was using to store kudos. So, I signed up for [Firebase](https://firebase.google.com/), which offers a free, hosted, real-time database that I can access via JavaScript. It didn't take too long to get it set up and to load the current kudos counts into Firebase. An added benefit of using Firebase is that the kudos now update in real-time, which means that when someone adds or removes a kudo, it updates on other users' browsers immediately. This will be great for my millions of visitors who are kudoing my posts like crazy /s.

The site's code is open-source and [hosted on GitHub](https://github.com/stevehanson/shanson-co). Check it out, and do what you want with it.
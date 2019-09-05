# shanson.co

This is the repo for my personal blog. It was moved from Rails to Middleman in Dec 2016.

## To build

To run the development server:

```
$ make start
```

The server will watch for changes and trigger live reload in the browser.

See `Makefile` for other tasks.

## Deployment

The site is hosted on Netlify. Builds are automatically triggered and deployed
when changes are pushed to master.

## Post front-matter options

* `title`: the title
* `date`: not required since the date is in the post filename. Can be provided
  with a time to specify order if multiple posts are on the same day
* `tags`: tags for the post
* `excerpt`: text that is displayed when posts are listed and also in the post
  meta description. If not provided, `READMORE` can be inserted in a post to
  provide the excerpt cutoff point.
* `published`: if set to false, the post is only built in development mode (this
  is a Middleman Blog feature)
* `draft`: prevents post from showing on the post listing page and XML feed but
  is still accessible by direct link. It is best to give the post an old date so
  it doesn't affect the post count on the pages it is filtered from. This is a
  custom feature
* `target`: use this when posting an external link. Instead of using the
  'excerpt' tag, post the content in the body so that the page isn't blank when
  linked to directly. External links display differently in the posts listing
  : host is shown, read timer not shown, and links directly to the external
  page. A helper automatically adds a link to the target to the end of the post
  body, which is used in the RSS feed and if the post is linked to directly. The
  RSS feed links to the target instead of the post page.

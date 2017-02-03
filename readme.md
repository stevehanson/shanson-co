# shanson.co

This is the repo for my personal blog. It was moved from Rails to Middleman in Dec 2016.

## To build

To build for deployment:

```
$ make build
```

To run the development server:

```
$ make start
```

To deploy to S3 (require `.s3_sync` file with credentials):

```
$ make deploy
```

See `Makefile` for other tasks.

## Post front-matter options

* `title`: the title
* `date`: not required since the date is in the post filename. Can be provided with a time to specify order if multiple posts are on the same day
* `tags`: tags for the post
* `excerpt`: text that is displayed when posts are listed and also in the post meta description. If not provided, `READMORE` can be inserted in a post to provide the excerpt cutoff point.
* `published`: if set to false, the post is not built at all
* `draft`: prevents post from showing on the post listing page, but still accessible by direct link. It is best to give the post an old date so it doesn't affect the post count on the pages it is filtered from
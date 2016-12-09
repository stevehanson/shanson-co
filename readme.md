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

## Writing Tips

Include `excerpt` front-matter to define custom excerpt on listing page. Otherwise, can insert "READMORE" to define where excerpt ends.

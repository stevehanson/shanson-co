# shanson.co

This is the repo for my personal blog. It was moved from Rails to Middleman in 2017.

## Writing Tips

Include `excerpt` front-matter to define custom excerpt on listing page. Otherwise, can insert "READMORE" to define where excerpt ends. SmartyPants isn't currently working on blog post summaries, so use correct quotes there.

## To build

To build for deployment:

```
$ make build
```

To build for development:

```
$ make start
```

See `Makefile` for other tasks.
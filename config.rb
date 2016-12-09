###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

#set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true, footnotes: false

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

###
# Helpers
###

activate :autoprefixer
activate :sprockets

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  blog.permalink = "{title}"
  #blog.permalink = "blog/{year}/{title}.html"
  # Matcher for blog source files
  blog.sources = "posts/{year}-{month}-{day}-{title}.html"
  blog.taglink = "{tag}.html"
  blog.layout = "post"
  blog.summary_separator = /READMORE/
  # blog.summary_length = 250
  # blog.year_link = "{year}.html"
  # blog.month_link = "{year}/{month}.html"
  # blog.day_link = "{year}/{month}/{day}.html"
  # blog.default_extension = ".markdown"

  blog.tag_template = "tag.html"
  blog.calendar_template = "calendar.html"

  # Enable pagination
  blog.paginate = true
  # blog.page_link = "page/{num}"
end

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = 'shanson.co'
  s3_sync.region                     = 'us-east-1'
  s3_sync.delete                     = true # deletes stray files by default
  s3_sync.after_build                = false # does not chain after the build step by default
  s3_sync.prefer_gzip                = true
  s3_sync.path_style                 = true
  s3_sync.reduced_redundancy_storage = false
  s3_sync.acl                        = 'public-read'
  s3_sync.encryption                 = false
  s3_sync.prefix                     = ''
  s3_sync.version_bucket             = false
  s3_sync.index_document             = 'index.html'
  s3_sync.error_document             = '404/index.html'
end

activate :directory_indexes

helpers do
  def human_date(date)
    date.strftime("%b %d, %Y")
  end

  # in minutes
  def read_length(content)
    words_per_minute = 200.0
    num_words = content.split.size
    (num_words / words_per_minute).ceil
  end
end

configure :development do
  activate :livereload
end

configure :build do
  activate :asset_hash
  activate :minify_css
  activate :minify_javascript
end

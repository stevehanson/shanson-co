page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

#set :markdown_engine, :redcarpet
set :markdown, fenced_code_blocks: true, smartypants: true, footnotes: false

activate :autoprefixer
activate :sprockets
activate :inline_svg

activate :blog do |blog|
  # This will add a prefix to all links, template references and source paths
  # blog.prefix = "blog"

  blog.permalink = "{title}"
  #blog.permalink = "blog/{year}/{title}.html"
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

activate :directory_indexes # must be activated after the blog

helpers do
  def article_summary(article)
    if article.data.excerpt.present?
      article.data.excerpt
    else
      article.summary
    end
  end

  def human_date(date)
    date.strftime("%b %-d, %Y")
  end

  # don't have to worry about published: false here because those aren't
  # built by default
  def non_draft_articles(articles)
    articles.select { |a| !a.data[:draft] }
  end

  # in minutes
  def read_length(content)
    words_per_minute = 200.0
    num_words = content.split.size
    (num_words / words_per_minute).ceil
  end

  def article_source(url)
    host = URI.parse(url).host.downcase
    host.start_with?("www.") ? host[4..-1] : host
  end

  def article_body(article)
    if article.data.target.present?
      link = link_to article.data.target, class: "arrow-link" do 
        %(
          Read more on
          #{article_source article.data.target}
          #{inline_svg "ionicons/ios-arrow-round-forward.svg", class: "icon-arrow-round-forward"}
        )
      end

      "#{article.body} <p>#{link}</p>"
    else
      article.body
    end
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

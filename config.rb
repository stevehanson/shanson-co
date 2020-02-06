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

activate :directory_indexes # must be activated after the blog

helpers do
  def host_with_port
    if app.development?
      "http://localhost:4567"
    else
      "https://shanson.co"
    end
  end

  def image_url(path)
    "#{host_with_port}#{image_path(path)}"
  end

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

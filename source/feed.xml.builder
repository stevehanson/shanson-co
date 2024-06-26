xml.instruct!
xml.feed "xmlns" => "http://www.w3.org/2005/Atom" do
  site_url = "https://shanson.co"
  xml.title "Stephen hanson"
  xml.subtitle "Hi 👋, I’m Stephen Hanson, an Austin-based web developer. I write every now and then about life, tech, and random nonsense."
  xml.id URI.join(site_url, blog.options.prefix.to_s)
  xml.link "href" => URI.join(site_url, blog.options.prefix.to_s)
  xml.link "href" => URI.join(site_url, current_page.path), "rel" => "self"
  xml.updated(blog.articles.first.date.to_time.iso8601) unless blog.articles.empty?
  xml.author { xml.name "Stephen Hanson" }

  non_draft_articles(blog.articles)[0..5].each do |article|
    xml.entry do
      xml.title article.title
      xml.link "rel" => "alternate", "href" => URI.join(site_url, article.data.target || article.url)
      xml.id URI.join(site_url, article.data.target || article.url)
      xml.published article.date.to_time.iso8601
      xml.updated File.mtime(article.source_file).iso8601
      xml.author { xml.name "Stephen Hanson" }
      # xml.summary article.summary, "type" => "html"
      xml.content article_body(article), "type" => "html"
    end
  end
end

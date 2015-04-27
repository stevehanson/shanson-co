atom_feed :language => 'en-US' do |feed|
  feed.title "Steve Hanson"
  feed.updated @posts.first.published_at

  @posts.each do |item|

    feed.entry( item ) do |entry|
      entry.url post_url(item)
      entry.title item.title
      entry.content markdown(item.body).html_safe, :type => 'html'
      entry.logo item.hero_image

      # the strftime is needed to work with Google Reader.
      entry.updated(item.published_at.strftime("%Y-%m-%dT%H:%M:%SZ"))

      entry.author do |author|
        author.name "Steve Hanson"
      end
    end
  end
end
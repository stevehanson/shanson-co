module ApplicationHelper
  def markdown(text)
    @markdown ||= Redcarpet::Markdown.new(BlogMarkdownRenderer, {
      autolink: true,
      space_after_headers: true,
      fenced_code_blocks: true,
      underline: true,
      highlight: true,
      footnotes: true,
      tables: true
    })
    @markdown.render(text)
  end

  def read_length(content)
    words_per_minute = 200
    num_words = content.split.size
    read_time_minutes = (num_words / 200.0).ceil
  end
end
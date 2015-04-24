module ApplicationHelper
  def human_date(date)
    date.strftime("%b %d, %Y")
  end

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
    if text.present?
      "<div class=\"markdown\">" + @markdown.render(text) + "</div>"
    else
      ""
    end
  end

  def read_length(content)
    words_per_minute = 200
    num_words = content.split.size
    read_time_minutes = (num_words / 200.0).ceil
  end
end

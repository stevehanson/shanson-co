class Post < ActiveRecord::Base
  validates_presence_of :body
  validates_presence_of :slug
  validates_presence_of :title

  scope :not_pages, -> { where(template: 'post') }
  scope :draft,     -> { where(draft: true) }
  scope :published, -> { where(draft: false) }
  scope :desc,      -> { order("published_at DESC") }

  def published
    !draft
  end

  def published=(val)
    self.draft = !val
  end

  def to_param
    slug
  end
end

class Post < ActiveRecord::Base
  validates :body, presence: true
  validates :slug, presence: true
  validates :title, presence: true

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

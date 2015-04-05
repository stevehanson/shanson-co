class Post < ActiveRecord::Base
  validates_presence_of :slug

  scope :draft,     -> { where(draft: true) }
  scope :published, -> { where(draft: false) }
  scope :desc,      -> { order("published_at DESC") }

  def to_param
    slug
  end
end

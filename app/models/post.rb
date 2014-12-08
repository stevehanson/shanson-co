class Post < ActiveRecord::Base

  validates_presence_of :slug

  def to_param
    slug
  end
end

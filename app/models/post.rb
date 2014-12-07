class Post < ActiveRecord::Base
  def to_param
    slug
  end
end

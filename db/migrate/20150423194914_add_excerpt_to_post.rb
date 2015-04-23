class AddExcerptToPost < ActiveRecord::Migration
  def change
    add_column :posts, :excerpt, :text
    add_column :posts, :hero_image, :string
  end
end

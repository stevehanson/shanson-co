class AddColumnsToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :draft, :boolean, default: true, null: false
    add_column :posts, :kudos, :integer, default: 0, null: false
  end
end

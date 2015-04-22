class AddTemplateToPost < ActiveRecord::Migration
  def change
    add_column :posts, :template, :string, default: 'post', null: false
  end
end

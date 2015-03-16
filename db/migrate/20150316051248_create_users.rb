class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :uid
      t.string :email
      t.string :domain
      t.string :avatar_url

      t.timestamps
    end
  end
end
class AddProfileStuffToUsers < ActiveRecord::Migration
  def change
    add_column :users, :avatar_url, :string
    add_column :users, :bio, :text
    add_column :users, :website_url, :string
    add_column :users, :facebook_url, :string
    add_column :users, :twitter_url, :string
    add_column :users, :youtube_url, :string
    add_column :users, :instagram_url, :string
  end
end

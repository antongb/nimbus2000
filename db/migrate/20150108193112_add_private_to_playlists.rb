class AddPrivateToPlaylists < ActiveRecord::Migration
  def change
    add_column :playlists, :private, :boolean, null: false, default: false
  end
end

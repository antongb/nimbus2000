class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.string :title, null: false
      t.integer :owner_id, null: false

      t.timestamps
    end
    add_index :playlists, :owner_id
  end
end

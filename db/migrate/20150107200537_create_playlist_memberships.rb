class CreatePlaylistMemberships < ActiveRecord::Migration
  def change
    create_table :playlist_memberships do |t|
      t.integer :track_id, null: false
      t.integer :playlist_id, null: false

      t.timestamps
    end
    add_index :playlist_memberships, [:track_id, :playlist_id], unique: true
  end
end

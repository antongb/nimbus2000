class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.integer :uploader_id, null: false
      t.string :cover_art_url

      t.timestamps
    end
    add_index :tracks, :uploader_id
  end
end

class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :track_id, null: false
      t.integer :liker_id, null: false

      t.timestamps
    end
    add_index :likes, [:track_id, :liker_id], unique: true
  end
end

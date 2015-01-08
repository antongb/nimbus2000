# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150108193112) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: true do |t|
    t.integer  "track_id",   null: false
    t.integer  "user_id",    null: false
    t.integer  "parent_id"
    t.text     "body",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["parent_id"], name: "index_comments_on_parent_id", using: :btree
  add_index "comments", ["track_id"], name: "index_comments_on_track_id", using: :btree

  create_table "likes", force: true do |t|
    t.integer  "track_id",   null: false
    t.integer  "liker_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "likes", ["track_id", "liker_id"], name: "index_likes_on_track_id_and_liker_id", unique: true, using: :btree

  create_table "playlist_memberships", force: true do |t|
    t.integer  "track_id",    null: false
    t.integer  "playlist_id", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "playlist_memberships", ["track_id", "playlist_id"], name: "index_playlist_memberships_on_track_id_and_playlist_id", unique: true, using: :btree

  create_table "playlists", force: true do |t|
    t.string   "title",                       null: false
    t.integer  "owner_id",                    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "description"
    t.boolean  "private",     default: false, null: false
  end

  add_index "playlists", ["owner_id"], name: "index_playlists_on_owner_id", using: :btree

  create_table "tracks", force: true do |t|
    t.string   "title",         null: false
    t.integer  "uploader_id",   null: false
    t.string   "cover_art_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tracks", ["uploader_id"], name: "index_tracks_on_uploader_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_url"
    t.text     "bio"
    t.string   "website_url"
    t.string   "facebook_url"
    t.string   "twitter_url"
    t.string   "youtube_url"
    t.string   "instagram_url"
  end

  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree
  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end

class Track < ActiveRecord::Base
  validates :title, :uploader_id, presence: true

  belongs_to :uploader, class_name: "User"

  has_many :memberships, class_name: "PlaylistMembership"

  has_many :comments

  has_many :playlists, through: :memberships, source: :playlist

  has_many :likes
  has_many :likers, through: :likes, source: :liker
end

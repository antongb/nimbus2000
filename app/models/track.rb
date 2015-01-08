class Track < ActiveRecord::Base
  validates :title, :uploader_id, presence: true

  belongs_to :uploader, class_name: "User"

  has_many :memberships, class_name: "PlaylistMembership"

  has_many :playlists, through: :memberships, source: :playlist
end

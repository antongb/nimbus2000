class Track < ActiveRecord::Base
  validates :title, :uploader_id, presence: true

  belongs_to :uploader, class_name: "User"

  has_many :playlists, through: :playlist_memberships, source: :playlist
end

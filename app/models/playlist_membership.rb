class PlaylistMembership < ActiveRecord::Base
  validates :track_id, :playlist_id, presence: true
  validates :track_id, uniqueness: { scope: :playlist_id, message: "can only belong to a playlist once" }

  belongs_to :playlist

  belongs_to :track
end

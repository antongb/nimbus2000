class Playlist < ActiveRecord::Base
  validates :owner_id, :title, presence: true

  belongs_to :owner, class_name: "User"

  has_many :playlist_memberships

  has_many :tracks, through: :playlist_memberships, source: :track

end

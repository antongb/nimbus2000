class Playlist < ActiveRecord::Base
  validates :owner_id, :title, presence: true

  belongs_to :owner, class_name: "User"

  has_many :memberships, class_name: "PlaylistMembership"

  has_many :tracks, through: :memberships, source: :track

end

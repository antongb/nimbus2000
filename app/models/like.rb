class Like < ActiveRecord::Base
  validates :liker_id, :track_id, presence: true
  validates :liker_id, uniqueness: { scope: :track_id, message: "You can only like a track once" }

  belongs_to :track

  belongs_to :liker, class_name: "User"
end

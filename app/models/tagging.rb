class Tagging < ActiveRecord::Base
  validates :tag_id, uniqueness: { scope: :track_id }

  belongs_to :tag

  belongs_to :track
end

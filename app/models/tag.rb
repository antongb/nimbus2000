class Tag < ActiveRecord::Base

  has_many :taggings
  has_many :tracks, through: :taggings, source: :track
end

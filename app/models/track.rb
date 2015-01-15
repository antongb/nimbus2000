class Track < ActiveRecord::Base
  attr_reader :cover_url

  validates :title, :uploader_id, presence: true

  belongs_to :uploader, class_name: "User"

  has_many :memberships, class_name: "PlaylistMembership"

  has_many :comments

  has_many :playlists, through: :memberships, source: :playlist

  has_many :likes
  has_many :likers, through: :likes, source: :liker

  has_many :taggings
  has_many :tags, through: :taggings, source: :tag

  has_attached_file :audio
  validates_attachment :audio, presence: true,
  content_type: { content_type: /\Aaudio\/.*\Z/ }

  has_attached_file :cover, styles: { medium: "300x300>", thumb: "100x100>" }#, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :cover, content_type: /\Aimage\/.*\Z/

  def cover_url=(url)
    unless self.cover.exists? || url.blank?
      self.cover = open(url)
    end
  end
end

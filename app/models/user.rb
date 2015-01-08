class User < ActiveRecord::Base
  validates :username, :password_digest, presence: true
  validates :password, confirmation: true
  validates :password, length: { minimum: 8, allow_nil: true }
  validates :bio, length: { maximum: 1000 }
  validates :facebook_url, format: { with: /\A(https?:\/\/)?facebook.com/, allow_blank: true}
  validates :twitter_url, format: { with: /\A(https?:\/\/)?twitter.com/, allow_blank: true}
  validates :instagram_url, format: { with: /\A(https?:\/\/)?instagram.com/, allow_blank: true}
  validates :youtube_url, format: { with: /\A(https?:\/\/)?youtube.com/, allow_blank: true}

  attr_reader :password

  has_many :tracks, foreign_key: :uploader_id
  has_many :playlists, foreign_key: :owner_id

  has_many :likes, foreign_key: :liker_id
  has_many :liked_tracks, through: :likes, source: :track

  after_initialize :ensure_session_token

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def correct_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    user && user.correct_password?(password) ? user : nil
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def likes?(track_id)
    self.likes.where(track_id: track_id).exists?
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

end

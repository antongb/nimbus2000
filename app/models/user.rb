class User < ActiveRecord::Base
  validates :username, :password_digest, presence: true, uniqueness: true
  validates :password, confirmation: true, length: { minimum: 8, allow_nil: true }
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

  has_many :comments

  has_many :follower_follows, class_name: "Follow", foreign_key: :followee_id
  has_many :followers, through: :follower_follows, source: :follower

  has_many :followee_follows, class_name: "Follow", foreign_key: :follower_id
  has_many :followees, through: :followee_follows, source: :followee

  has_many :stream_tracks, through: :followees, source: :tracks

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

  def visible_playlists(current_user)
    self.playlists.where("private = false OR owner_id = ?", current_user.id)
  end

  def follows?(user)
    self.followees.include?(user)
  end

  private

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

end

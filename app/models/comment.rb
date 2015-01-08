class Comment < ActiveRecord::Base
  validates :track_id, :user_id, :body, presence: true

  belongs_to :user

  belongs_to :track

  belongs_to :parent_comment, class_name: "Comment", foreign_key: :parent_id
end

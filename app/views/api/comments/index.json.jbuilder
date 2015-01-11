json.array!(@comments) do |comment|
  json.extract! comment, :id, :user_id, :parent_id, :body, :track_id
  json.post_time comment.created_at.to_s(:short)
  json.username comment.user.username
  json.parent_username comment.parent_comment.user.username if comment.parent_comment
end

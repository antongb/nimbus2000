json.array! @users do |user| 
	json.extract! user, :id, :username

  json.follows_you user.follows?(current_user)
  json.you_follow current_user.follows?(user)

  json.num_followers user.followers.count
  json.num_followees user.followees.count
end
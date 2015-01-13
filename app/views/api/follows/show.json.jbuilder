json.you_follow current_user.follows?(@user)
json.num_followers @user.followers.count
json.num_followees @user.followees.count #dat edge case

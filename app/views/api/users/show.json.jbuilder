json.extract! @user, :id, :username, :avatar_url

json.tracks @user.tracks, partial: 'api/tracks/track', as: :track
json.playlists @user.visible_playlists(current_user), :id, :title

json.follows_you @user.follows?(current_user)
json.you_follow current_user.follows?(@user)

json.num_followers @user.followers.count
json.num_followees @user.followees.count
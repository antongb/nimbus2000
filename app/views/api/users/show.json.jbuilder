json.extract! @user, :id, :username, :avatar_url

json.tracks @user.tracks, :id, :title

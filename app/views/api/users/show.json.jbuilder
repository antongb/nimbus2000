json.extract! @user, :id, :username, :avatar_url

json.tracks @user.tracks, :id, :title
json.playlists @user.visible_playlists(current_user), :id, :title

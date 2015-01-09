json.username @user.username

json.playlists @user.playlists, :id, :title

# json.array!(@user.playlists) do |playlist|
#   json.id playlist.id
#   json.title playlist.title
# end

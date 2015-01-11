json.username @user.username

json.playlists @playlists, :id, :title, :description

# json.array!(@user.playlists) do |playlist|
#   json.id playlist.id
#   json.title playlist.title
# end

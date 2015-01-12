json.id @playlist.id
json.title @playlist.title
json.description @playlist.description
json.owner_id @playlist.owner.id
json.owner_name @playlist.owner.username

json.tracks @playlist.tracks, :id, :title

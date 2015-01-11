json.extract! @track, :id, :title, :uploader_id, :cover_art_url

json.num_likes @track.likes.count

json.curr_user_likes current_user.likes?(@track)

json.uploader_name @track.uploader.username
# json.id @track.id
# json.title @track.title
# json.uploader_id @track.uploader_id
# json.uploader_name @track.uploader.username
# json.cover_art_url @track.cover

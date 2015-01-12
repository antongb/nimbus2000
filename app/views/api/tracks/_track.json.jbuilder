json.extract! track, :id, :title, :uploader_id

json.audio track.audio.url if track.audio_file_name

if track.cover_file_name
  json.cover track.cover.url
  json.cover_medium track.cover.url(:medium)
  json.cover_thumb track.cover.url(:thumb)
end

json.num_likes track.likes.count

json.curr_user_likes current_user.likes?(track)

json.uploader_name track.uploader.username

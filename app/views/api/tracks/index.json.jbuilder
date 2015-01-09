json.array!(@tracks) do |track|
  json.id track.id
  json.title track.title
  json.uploader_id track.uploader_id
  json.uploader_name track.uploader.username
  # json.uploader do
  #   json.id track.uploader.id
  #   json.username track.uploader.username
  # end
end

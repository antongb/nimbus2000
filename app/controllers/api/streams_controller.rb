class Api::StreamsController < BackboneController
  def index
    @tracks = current_user.stream_tracks
  end
end

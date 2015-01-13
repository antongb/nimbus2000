class Api::LikesController < BackboneController
  before_action :get_track

  def create
    current_user.liked_tracks << @track
    render json: { curr_user_likes: current_user.likes?(@track.id), num_likes: @track.likes.count }
  end

  def destroy
    current_user.liked_tracks.delete(@track)
    render json: { curr_user_likes: current_user.likes?(@track.id), num_likes: @track.likes.count }
  end

  private

  def get_track
    @track = Track.find(params[:track_id])
  end
end

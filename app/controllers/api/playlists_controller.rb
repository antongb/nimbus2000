class Api::PlaylistsController < BackboneController
  before_action :ensure_playlist_owner, only: [:edit, :update, :destroy, :add_track, :remove_track]

  def index
    @user = User.includes(:playlists).find(params[:user_id])
    # if current_user.id == params[:user_id]
    #   @playlists = @user.playlists
    # else
    @playlists = @user.visible_playlists(current_user)
    # end
  end

  def new

  end

  def create
    @playlist = current_user.playlists.new(playlist_params)
    if @playlist.save
      params[:track] && PlaylistMembership.create(playlist_id: @playlist.id, track_id: params[:track])
      render :show
    else
      flash.now[:errors] = @playlist.errors.full_messages
    end
  end

  def update
    @playlist.update(playlist_params)
    render :show
  end

  def show
    @playlist = Playlist.includes(:tracks, :owner).find(params[:id])
  end

  def destroy
    @playlist.destroy
    render :show
  end

  def add_track
    track = Track.find(params[:track_id])
    @playlist.tracks << track
    render :show
  end

  def remove_track
    track = Track.find(params[:track_id])
    @playlist.tracks.delete(track)
    render :show
  end

  private

  def playlist_params
    params.require(:playlist).permit([:title, :description, :private, tracks: []])
  end

  def ensure_playlist_owner
    @playlist = current_user.playlists.find(params[:id])
  end

end

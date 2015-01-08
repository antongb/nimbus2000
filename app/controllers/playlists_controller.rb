class PlaylistsController < ApplicationController

  def index
    @playlists = Playlist.find_by(owner_id: params[:user_id])
  end

  def show
    @playlist = Playlist.includes(memberships: :track).find(params[:id])
  end

  def new
    @playlist = Playlist.new
    @track = params[:track]
  end

  def edit
    @playlist = Playlist.find(params[:id])
  end

  def create
    @playlist = Playlist.new(playlist_params)
    @playlist.owner_id = current_user.id
    if @playlist.save
      if params[:track]
        PlaylistMembership.create(playlist_id: @playlist.id, track_id: params[:track])
      end
      redirect_to playlist_url(@playlist)
    else
      flash.now[:errors] = @playlist.errors.full_messages
      render :new
    end
  end

  def update
    @playlist = Playlist.find(params[:id])
    if @playlist.update(playlist_params)
      redirect_to playlist_url(@playlist)
    else
      flash.now[:errors] = @playlist.errors.full_messages
      render :edit
    end

  end

  private

  def playlist_params
    params.require(:playlist).permit([:title, :description])
  end
end

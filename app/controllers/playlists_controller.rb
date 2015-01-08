class PlaylistsController < ApplicationController
  before_action :ensure_playlist_owner, only: [:edit, :update, :destroy]

  def index
    @playlists = Playlist.where(owner_id: params[:user_id])
    @user = User.find(params[:user_id])
  end

  def show
    @playlist = Playlist.includes(memberships: :track).find(params[:id])
    unless (@playlist.public? || @playlist.owner_id == current_user.id)
      redirect_to root_url
    else
      render :show
    end
  end

  def new
    @playlist = Playlist.new
    @track = params[:track]
  end

  def edit
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
    if @playlist.update(playlist_params)
      redirect_to playlist_url(@playlist)
    else
      flash.now[:errors] = @playlist.errors.full_messages
      render :edit
    end

  end

  def destroy
    @playlist.destroy
    redirect_to user_playlists_url(@playlist.owner_id)
  end

  private

  def playlist_params
    params.require(:playlist).permit([:title, :description, :private])
  end

  def ensure_playlist_owner
    @playlist = Playlist.find(params[:id])
    redirect_to root_url unless current_user.id == @playlist.owner_id
  end
end

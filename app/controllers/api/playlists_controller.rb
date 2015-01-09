class Api::PlaylistsController < ApplicationController

  def index
    @user = User.find(params[:user_id])
    if current_user.id == params[:user_id]
      @playlists = current_user.playlists
    else
      @playlists = Playlist.where("private = false AND owner_id = ?", params[:user_id])
    end
  end

end

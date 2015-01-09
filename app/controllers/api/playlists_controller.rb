class Api::PlaylistsController < ApplicationController

  def index
    @user = User.includes(:playlists).find(params[:user_id])
  end

end

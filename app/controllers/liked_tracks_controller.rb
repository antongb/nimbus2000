class LikedTracksController < ApplicationController
  before_action :ensure_signed_in

  def index
    @tracks = current_user.liked_tracks
  end
end

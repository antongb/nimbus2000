class TracksController < ApplicationController
  before_action :ensure_signed_in, only: [:new, :create]

  def new
    @track = Track.new
  end

  def create
    @track = Track.new(track_params)
    @track.uploader_id = current_user.id
    if @track.save
      redirect_to track_url(@track)
    else
      flash.now[:errors] = @link.errors.full_messages
      render :new
    end
  end

  def show
    @track = Track.find(params[:id])
  end

  private

  def track_params
    params.require(:track).permit([:title, :cover_art_url])
  end
end

class TracksController < ApplicationController
  before_action :ensure_signed_in, only: [:new, :create, :edit, :update, :destroy]
  before_action :ensure_track_owner, only: [:edit, :update, :destroy]

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

  def index
    @tracks = Track.all
  end

  def show
    @track = Track.find(params[:id])
  end

  def edit
  end

  def update
    if @track.update_attributes(track_params)
      redirect_to track_url(@track)
    else
      flash.now[:errors] = @track.errors.full_messages
      render :edit
    end
  end

  def destroy
    @track.destroy
    redirect_to user_url(current_user)
  end

  private

  def track_params
    params.require(:track).permit([:title, :cover_art_url])
  end

  def ensure_track_owner
    @track = Track.find(params[:id])
    redirect_to root_url unless current_user_owns_track?(@track)
  end
end

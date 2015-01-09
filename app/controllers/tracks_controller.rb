class TracksController < ApplicationController
  before_action :ensure_signed_in, only: [:new, :create, :edit, :update, :destroy, :like, :unlike]
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
      flash.now[:errors] = @track.errors.full_messages
      render :new
    end
  end

  def index
    @tracks = Track.all
  end

  def show
    @track = Track.includes({comments: [:user, parent_comment: :user]}, :likes).find(params[:id])
  end

  def edit
  end

  def update
    if @track.update(track_params)
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

  def like
    @track = Track.find(params[:id])
    unless Like.create(track_id: params[:id], liker_id: current_user.id)
      flash.now[:errors] = ["Sorry, something went wrong."]
    end
    render :show
  end

  def unlike
    @track = Track.find(params[:id])
    @like = @track.likes.find_by(liker_id: current_user.id)
    @like.destroy
    render :show
  end

  private

  def track_params
    params.require(:track).permit([:title, :cover_art_url])
  end

  def ensure_track_owner
    @track = current_user.tracks.find(params[:id])
  end
end

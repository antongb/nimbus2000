class Api::TracksController < BackboneController
  def index
    @tracks = Track.includes(:uploader)
    render :index
  end

  def show
    @track = Track.includes(:uploader, :likes).find(params[:id])
    render :show
  end

  def create
    @track = current_user.tracks.new(track_params)
    if @track.save
      redirect_to "/backbone\#/tracks/#{@track.id}"
    else
      flash.now[:errors] = @track.errors.full_messages
      render :new
    end
  end

  def edit
    @track = current_user.tracks.find(params[:id])
  end

  def update
    @track = current_user.tracks.find(params[:id])
    if @track.update(track_params)
      render :show
    else
      flash.now[:errors] = @track.errors.full_messages
      render :new
    end
  end

  def destroy
    @track = current_user.tracks.find(params[:id])
    @track.destroy
    render :index
  end

  def like
    @track = Track.find(params[:id])
    if current_user.likes?(@track.id)
      current_user.liked_tracks.delete(@track)
    else
      current_user.liked_tracks << @track
    end
  end

  private

  def track_params
    params.require(:track).permit([:title, :cover, :audio, :cover_url])
  end

end

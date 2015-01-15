class Api::TracksController < BackboneController
  # wrap_parameters :track, include: [:cover, :audio]

  def index
    @tracks = Track.includes(:uploader)
  end

  def show
    @track = Track.includes(:uploader, :likes).find(params[:id])
  end

  def create
    @track = current_user.tracks.new(track_params)
    if @track.save
      render :show
    else
      render_errors(@track)
    end
  end

  def edit
    @track = current_user.tracks.find(params[:id])
    render :show
  end

  def update
    @track = current_user.tracks.find(params[:id])
    if @track.update(track_params)
      render :show
    else
      render_errors(@track)
    end
  end

  def destroy
      @track = current_user.tracks.find(params[:id])
      @track.destroy
      render :index
  end

  private

  def track_params
    params.require(:track).permit([:title, :cover, :audio, :cover_url])
  end

end

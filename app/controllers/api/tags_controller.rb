class Api::TagsController < BackboneController

  def index
    @tags = Tag.all
  end

  def show
    @tag = Tag.includes(:tracks).find_by(name: params[:name])
  end

  def add
    @track = Track.find(params[:id])
    @tag = Tag.find_by(name: tag_params[:name]) || Tag.new(tag_params)
    @track.tags << @tag
    render json: @tag.as_json(only: [:name, :id])
    # render json: params
  end

  def remove
    @track = Track.includes(:tags).find(params[:id])
    @tag = @track.tags.find_by(name: params[:name])
    @track.tags.destroy(@tag)
    @tag.destroy if @tag.tracks.empty?
    render json: @tag.as_json(only: [:name, :id])
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end

end

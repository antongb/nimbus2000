class Api::TracksController < ApplicationController
  def index
    @tracks = Track.includes(:uploader)
    render :index
  end

  def show
    @track = Track.includes(:uploader).find(params[:id])
    render :show
  end
end

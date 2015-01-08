class PlaylistMembershipsController < ApplicationController
  before_action :ensure_playlist_owner

  def create
    @membership = PlaylistMembership.new(membership_params)
    if @membership.save
      flash[:errors] = ["Track added to playlist."] #make notices later?
      redirect_to track_url(membership_params[:track_id])
    else
      flash[:errors] = @membership.errors.full_messages
      redirect_to track_url(membership_params[:track_id])
    end
  end

  def destroy
    @membership = PlaylistMembership.find(params[:id])
    @membership.destroy
    redirect_to playlist_url(@membership.playlist)
  end

  private

  def membership_params
    params.require(:membership).permit([:track_id, :playlist_id])
  end

  def ensure_playlist_owner
    owner_id = Playlist.find(membership_params[:playlist_id]).owner_id #optimize somehow?
    redirect_to root_url unless current_user.id == owner_id
  end
end

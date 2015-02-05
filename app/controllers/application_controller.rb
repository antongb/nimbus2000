class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?, :current_user_owns_track?, :get_queue_tracks

  def render_errors(model)
    render json: model.errors.full_messages, status: 422
  end

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
    cookies[:queue] = nil
  end

  def sign_out
    current_user.reset_session_token! if current_user
    @current_user.destroy if @current_user.username == "Guest"
    session[:session_token] = nil
    cookies[:queue] = nil
  end

  def ensure_signed_in
    unless signed_in?
      redirect_to new_session_url
    end
  end

  def current_user_owns_track?(track)
    current_user.id == track.uploader_id
  end

  def sign_in_guest
    old_guest = User.find_by(username: "Guest")
    old_guest.destroy if old_guest
    guest = User.create(username: "Guest", password: "abcdefghij")
    guest.followees << User.first
    sign_in(guest)
  end

  def get_queue_tracks
    track_ids = !(cookies[:queue].blank?) && JSON.parse(cookies[:queue])
    @tracks = Track.includes(:uploader).where(id: track_ids)
    render_to_string('api/tracks/index.json').html_safe
  end

end

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :signed_in?, :current_user_owns_track?

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
  end

  def sign_out
    current_user.reset_session_token! if current_user
    session[:session_token] = nil
  end

  def ensure_signed_in
    unless signed_in?
      flash[:errors] = ["You must be signed in to do that!"]
      redirect_to new_session_url
    end
  end

  def current_user_owns_track?(track)
    current_user.id == track.uploader_id
  end

end

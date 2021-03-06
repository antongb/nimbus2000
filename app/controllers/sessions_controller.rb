class SessionsController < ApplicationController
  def new
  end

  def create
    if params[:user][:username] == "Guest"
      sign_in_guest
      redirect_to root_url
      return
    end

    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if user
      sign_in(user)
      redirect_to root_url
    else
      flash[:errors] = ["Invalid username or password."]
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end
end

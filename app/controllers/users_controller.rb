class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to backbone_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.includes(:playlists).find(params[:id])
    if current_user.id == @user.id
      @playlists = @user.playlists
    else
      @playlists = @user.playlists.where(private: false)
    end
  end

  private

  def user_params
    params.require(:user).permit(:password, :username)
  end
end

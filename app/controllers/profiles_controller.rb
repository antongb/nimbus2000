class ProfilesController < ApplicationController
  before_action :ensure_signed_in

  def edit
    @user = current_user
  end

  def update
    @user = current_user

    if (profile_params[:password].present? && !(@user.correct_password?(params[:old_password])))
      flash.now[:errors] = ["Password is incorrect."]
      render :edit
      return
    end

    if @user.update(profile_params)
      redirect_to user_url(@user)
    else
      flash.now[:errors] = @user.errors.full_messages
      render :edit
    end
  end

  private

  def profile_params
    params.require(:user).permit([:password,
                                  :avatar_url,
                                  :bio,
                                  :website_url,
                                  :facebook_url,
                                  :twitter_url,
                                  :youtube_url,
                                  :instagram_url])
  end
end

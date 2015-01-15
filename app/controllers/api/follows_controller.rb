class Api::FollowsController < BackboneController
  before_action :get_user

  def create
    begin
      @user.followers << current_user
      render :show
    rescue ActiveRecord::RecordInvalid
      render json: "You already follow this user", status: 422
    end

  end

  def destroy
    @user.followers.delete(current_user)
    render :show
  end

  private

  def get_user
    @user = User.includes(:followers).find(params[:user_id])
  end

end

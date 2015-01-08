class CommentsController < ApplicationController
  def index
    redirect_to track_url(params[:track_id])
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      redirect_to track_url(comment_params[:track_id])
    else
      flash[:errors] = @comment.errors.full_messages
      redirect_to track_url(comment_params[:track_id])
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
    redirect_to track_url(@comment.track_id)
  end

  private

  def comment_params
    params.require(:comment).permit([:body, :parent_id, :track_id])
  end
end

class CommentsController < ApplicationController
  before_action :ensure_author, only: [:edit, :update, :destroy]

  def index
    redirect_to track_url(params[:track_id])
  end

  def new
    @comment = Comment.new(parent_id: params[:parent])
    @track_id = params[:track_id]
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
    @comment.destroy
    redirect_to track_url(@comment.track_id)
  end

  def edit
  end

  def update
    if @comment.update(comment_params)
      redirect_to track_url(@comment.track_id)
    else
      flash[:errors] = @comment.errors.full_messages
      redirect_to track_url(@comment.track_id)
    end
  end

  private

  def comment_params
    params.require(:comment).permit([:body, :parent_id, :track_id])
  end

  def ensure_author
    @comment = Comment.find(params[:id])
    redirect_to root_url unless current_user.id == @comment.user_id
  end
end

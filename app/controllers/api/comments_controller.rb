class Api::CommentsController < BackboneController

  def index
    @track = Track.find(params[:track_id])
    @comments = @track.comments
  end

  def create
    @track = Track.includes({comments: [:user, parent_comment: :user]}, :likes).find(params[:track_id])
    @comment = @track.comments.new(comment_params)
    current_user.comments << @comment

    if @comment.save
      render :show
    else
      render :index
    end
  end

  def destroy
    @comment = current_user.comments.find(params[:id])
    @comment.destroy
    render :show
  end

  private

  def comment_params
    params.require(:comment).permit([:body, :parent_id])
  end



end

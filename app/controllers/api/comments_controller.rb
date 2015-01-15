class Api::CommentsController < BackboneController

  def index
    @track = Track.find(params[:track_id])
    @comments = @track.comments
  end

  def create
    @track = Track.includes({comments: [:user, parent_comment: :user]}, :likes).find(params[:track_id])
    @comment = @track.comments.new(comment_params)

    if @comment.save
      current_user.comments << @comment
      render :show
    else
      render_errors(@comment)
    end
  end

  def destroy
    @comment = current_user.comments.find(params[:id])
    @comment.destroy
    render :show
  end

  def update
    @comment = current_user.comments.find(params[:id])
    if @comment.update(comment_params)
      render :show
    else
      render_errors(@comment)
    end
  end

  private

  def comment_params
    params.require(:comment).permit([:body, :parent_id])
  end



end

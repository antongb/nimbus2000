class Api::TagsController < BackboneController

  def index
    @tags = Tag.all
  end

end

class AddAttachmentCoverToTracks < ActiveRecord::Migration
  def change
    add_attachment :tracks, :cover
  end
end

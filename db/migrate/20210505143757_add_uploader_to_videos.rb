class AddUploaderToVideos < ActiveRecord::Migration[5.2]
  def change
    add_column :videos, :uploader_id, :bigint, null: false
    add_index :videos, :uploader_id
  end
end

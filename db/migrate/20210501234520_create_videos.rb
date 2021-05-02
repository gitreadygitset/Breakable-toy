class CreateVideos < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :video_url, null: false
      t.string :title, null: false
      t.belongs_to :user, null: false
      t.timestamps null: false
    end
  end
end

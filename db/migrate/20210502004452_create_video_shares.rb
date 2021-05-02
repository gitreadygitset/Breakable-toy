class CreateVideoShares < ActiveRecord::Migration[5.2]
  def change
    create_table :video_shares do |t|
      t.belongs_to :user, null: false
      t.belongs_to :video, null: false

      t.timestamps null: false
    end
  end
end

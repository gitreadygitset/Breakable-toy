class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :body
      t.integer :vid_timestamp 
      t.belongs_to :video, null: false
      t.timestamps null: false
    end
  end
end

class Video < ApplicationRecord
  validates :video_url, :title, presence: true

  belongs_to :User, optional: true
  has_and_belongs_to_many :shared_users, class_name: "User", join_table: "video_shares", foreign_key: "video_id", association_foreign_key: "user_id"

  def creator
    User.find(user_id)
  end
end

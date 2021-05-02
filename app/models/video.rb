class Video < ApplicationRecord
  validates :video_url, :title, presence: true

  belongs_to :user

  has_many :video_shares
  has_many :shared_users, class_name: "User", foreign_key: "video_id"
end

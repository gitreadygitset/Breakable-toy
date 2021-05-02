class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :videos, dependent: :destroy
  
  has_and_belongs_to_many :shared_videos, class_name: "Video", join_table: "video_shares", foreign_key: "user_id", association_foreign_key: "video_id"

  validates :username, :email, :password, :role, presence: true
  validates :role, inclusion: { in: ["supported user", "independent user", "admin"] }
end

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :videos

  has_many :video_shares
  has_many :shared_videos, class_name: "Video", foreign_key: "user_id"
end

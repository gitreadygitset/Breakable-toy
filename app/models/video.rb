class Video < ApplicationRecord
  has_many :video_shares
  has_many :users, through: :video_shares
  has_many :questions

  belongs_to :uploader, class_name: 'User'

  mount_uploader :video_url, VideoUploader

  validates :video_url, :title, presence: true
end

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  
  has_many :video_shares
  has_many :videos, through: :video_shares

  has_many :uploads, class_name: 'Video', foreign_key: 'uploader_id'

  validates :username, :email, :password, :role, presence: true
  validates :role, inclusion: { in: ['supported user', 'independent user', 'admin'] }
end

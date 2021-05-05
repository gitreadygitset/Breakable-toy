class VideoSerializer < ActiveModel::Serializer
  attributes :id, :title, :video_url

  has_many :shared_users
end

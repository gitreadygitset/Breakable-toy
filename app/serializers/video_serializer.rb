class VideoSerializer < ActiveModel::Serializer
  attributes :id, :title, :video_url

  has_many :users
end

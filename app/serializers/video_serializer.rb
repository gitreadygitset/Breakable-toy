class VideoSerializer < ActiveModel::Serializer
  attributes :id, :title, :video_url, :thumbnail
end

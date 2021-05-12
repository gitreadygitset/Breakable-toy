class ThumbnailUploader < CarrierWave::Uploader::Base
  if Rails.env.test? || Rails.env.development?
    storage :file
  else
    storage :fog
  end

  def store_dir
    if Rails.env.development?
      "uploads/video/thumbnail/#{model.id}"
    elsif Rails.env.test?
      "spec/test_thumbnails/#{model.id}"
    end
  end

end

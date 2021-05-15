class ThumbnailUploader < CarrierWave::Uploader::Base
  if Rails.env.test? || Rails.env.development?
    storage :file
  else
    storage :fog
  end

  def store_dir
    if Rails.env.development? || Rails.env.production?
      "uploads/video/thumbnail/#{model.id}"
    elsif Rails.env.test?
      "spec/test_thumbnails/#{model.id}"
    end
  end

  def default_url()
    "/logo2-01.png"
  end
end

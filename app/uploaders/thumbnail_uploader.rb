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
  
  def default_url()
    "https://daily-buzz-profile-pics-development.s3.amazonaws.com/coffee-791045_1280.jpg"
  end
end

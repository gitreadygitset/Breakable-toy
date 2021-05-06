class VideoUploader < CarrierWave::Uploader::Base
 
  if Rails.env.test? || Rails.env.development?
    storage :file
  else
    storage :fog
  end

  def store_dir
    "uploads/video/video_url/#{model.id}"
  end

  def extension_allowlist
    %w(mov mp4)
  end

end

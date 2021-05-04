class Api::V1::VideosController < ApplicationController
  before_action :authenticate_user, except: [:create]
  skip_before_action :verify_authenticity_token

  def index
    render json: current_user.videos
  end

  def create
    video = Video.new(title: params["title"], video_url: params["video_url"], user: current_user)
    if video.save
      binding.pry
      render json: video
    else
      render json: {error:["Your video could not be saved"]}
    end
  end

  private 

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end

  def video_params
    binding.pry
  end
end

class Api::V1::VideosController < ApplicationController
  before_action :authenticate_user, except: [:create]
  skip_before_action :verify_authenticity_token

  def index
    render json: current_user.videos
  end

  def create
    video = Video.new(title: params["title"], video_url: params["video_url"], user: current_user)
    binding.pry
    if video.save
      render json: video
    else
      render json: { error: video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private 

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end
end

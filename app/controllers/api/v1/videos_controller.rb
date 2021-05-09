class Api::V1::VideosController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_user, only: [:show]
  skip_before_action :verify_authenticity_token

  def index
    binding.pry
    render json: current_user.uploads
  end

  def create
    video = Video.new(title: params["title"], video_url: params["video_url"], uploader: current_user)
    if video.save
      render json: video
    else
      render json: { error: video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    video = Video.find(params[:id])
    questions = video.questions
    users = video.users

    render json: {
      video: VideoSerializer.new(video),
      questions: questions,
      users: users
    }
  end

  private 

  def authorize_user
    video = Video.find(params[:id])
    if current_user != video.uploader && current_user != video.users
      render json: { error: 'You do not have access to this video' }, status: :forbidden
    end
  end
end

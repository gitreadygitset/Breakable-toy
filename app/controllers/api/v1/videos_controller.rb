class Api::V1::VideosController < ApplicationController
  before_action :authenticate_user!
  before_action :authorize_user, only: [:show]
  skip_before_action :verify_authenticity_token

  def index
    if current_user.role == 'supported user' 
      videos = current_user.videos.map do |video|
        ActiveModelSerializers::SerializableResource.new(video, {serializer: VideoSerializer})
      end
    else
      all_videos = current_user.uploads + current_user.videos
      videos = all_videos.map do |video|
        ActiveModelSerializers::SerializableResource.new(video, {serializer: VideoSerializer})
      end
    end
    render json: {
      videos: videos,
      role: current_user.role
    }
  end

  def create
    video = Video.new(title: params["title"], video_url: params["video_url"], thumbnail: params["thumbnail"], uploader: current_user)
    if video.save
      render json: video
    else
      render json: { error: video.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
     if Video.find(params[:id])
      video = Video.find(params[:id])
      questions = video.questions
      users = video.users

      render json: {
        video: VideoSerializer.new(video),
        questions: questions,
        users: users,
        current_user: current_user
      }
    else 
      status 404
    end
  end

  def destroy
    video = Video.find(params[:id])
    video.destroy
    render json: { message: "video removed" }, status: :ok
  end

  def update
    video = Video.find(params[:id])
    video.update_attributes(title: params[:title])
    render json: video
  end

  private 

  def authorize_user
    video = Video.find(params[:id])
    if current_user != video.uploader && !video.users.include?(current_user)
      render json: { error: 'You do not have access to this video' }, status: :forbidden
    end
  end

  def video_params
  end
end

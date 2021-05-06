class Api::V1::VideoSharesController < ApplicationController
  before_action :authenticate_user!

  def create
    user = User.find_by(username: params[:username])
    video = Video.find(params[:video_id])

    if VideoShare.find_by(user: user, video: video)
      render json: { error: "That user already has access to this video" }
    else
      share = VideoShare.new(user: user, video: video)
      if share.save
        render json: user
      else
        render json: { error: share.errors.full_messages }
      end
    end
  end

end

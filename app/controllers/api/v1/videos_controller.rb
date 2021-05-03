class Api::V1::VideosController < ApplicationController
  before_action :authenticate_user

  def index
    render json: current_user.videos
  end

  def authenticate_user
    if !user_signed_in?
      render json: {error: ["You need to be signed in first"]}
    end
  end
end

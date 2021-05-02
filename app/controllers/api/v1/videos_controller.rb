class Api::V1::VideosController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.videos
  end
end

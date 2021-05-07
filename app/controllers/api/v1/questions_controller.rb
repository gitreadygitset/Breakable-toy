class Api::V1::QuestionsController < ApplicationController
  before_action :authenticate_user!

  def create
    video = Video.find(params[:video_id])
    question = Question.new(body: params["body"], vid_timestamp: params["vid_timestamp"].to_i, video: video)
    binding.pry
    if question.save
      render json: question
    else 
      render json: { error: question.errors.full_messages }
    end
  end

end

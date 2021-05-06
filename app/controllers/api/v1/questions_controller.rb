class Api::V1::QuestionsController < ApplicationController
  before_action :authenticate_user!

  def create
    video = Video.find(params[:video_id])
    question = Question.new(body: params["body"], video: video)
    binding.pry
    if question.save
      binding.pry
      render json: question
    else 
      binding.pry
      render json: { error: question.errors.full_messages }
    end
  end

end

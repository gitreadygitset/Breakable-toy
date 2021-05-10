class Api::V1::QuestionsController < ApplicationController
  before_action :authenticate_user!

  def create
    video = Video.find(params[:video_id])
    question = Question.new(question_params)
    question.video = video
 
    if question.save
      render json: question
    else 
      render json: { error: question.errors.full_messages }
    end
  end

  def destroy
    question = Question.find(params[:id])
    question.destroy
    render json: { message: "question removed" }, status: :ok
  end

  def update
    question = Question.find(params[:id])
    question.update_attributes(question_params)
    render json: question
  end

  private
  def question_params
    params.require(:question).permit(:body, :vid_timestamp)
  end
end

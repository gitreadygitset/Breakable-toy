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

  def speak
    key = ENV["VOICERSS_API_KEY"]
    text = Question.find(params[:id]).body
    url = "http://api.voicerss.org/?key=#{key}&c=wav&hl=en-us&src=#{text}&v=Mike"
    api_response = Faraday.get(url)
    if api_response.success? 
      send_data api_response.body
    else 
      render json: api_response.errors.full_messages
    end
  end

  private
  def question_params
    params.require(:question).permit(:body, :vid_timestamp)
  end
end

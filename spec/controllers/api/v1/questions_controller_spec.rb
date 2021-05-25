require 'rails_helper'

RSpec.describe Api::V1::QuestionsController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:video1) { FactoryBot.create(:video, uploader: user1) }
  let!(:question1) { FactoryBot.create(:question, video: video1) }

  describe "POST#create" do
    it "Should create a question and return a JSON with the question's information" do
      sign_in user1
      post_json = {
        question: {
          body: "question body",
          vid_timestamp: 6,
        },
        video_id: video1.id
      }
      prev_count = Question.count
      post :create, params: post_json
      returned_json = JSON.parse(response.body)

      expect(Question.count).to eq(prev_count+1)
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["body"]).to eq("question body")
      expect(returned_json["vid_timestamp"]).to eq(6)
    end
  end

  describe "POST#destroy" do
    it "Should delete the question" do
      sign_in user1
      post = {
        id: question1.id,
        video_id: video1.id
      }

      prev_count = Question.count
      post(:destroy, params: post)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(Question.count). to eq(prev_count-1)
    end
  end

  describe "POST#update" do 
    it "Updates the question with new information" do
      sign_in user1
      post = {
        question: {
        body: "new body",
        vid_timestamp: 12,
        },
        id: question1.id,
        video_id: video1.id
      }

      prev_count = Question.count
      post(:update, params: post)
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(Question.count).to eq(prev_count)
      expect(Question.find(question1.id)["body"]).to eq("new body")
      expect(Question.find(question1.id)["vid_timestamp"]).to eq(12)
    end
  end
end

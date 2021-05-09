require 'rails_helper'

RSpec.describe Api::V1::QuestionsController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:video1) { FactoryBot.create(:video, uploader: user1) }

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
end

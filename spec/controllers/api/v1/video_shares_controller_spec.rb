require 'rails_helper'

RSpec.describe Api::V1::VideoSharesController, type: :controller do
  let!(:user1) { FactoryBot.create(:user) }
  let!(:user2) { FactoryBot.create(:user, username: 'guest2') }
  let!(:video1) { FactoryBot.create(:video, uploader: user1) }
  
  describe "POST#create" do
    it "Should create a new share and return a JSON with the shared user's information" do
      sign_in user1
      post_json = {
          username: user2.username,
          video_id: video1.id
        }
      prev_count = VideoShare.count
      post(:create, params: post_json)

      returned_json = JSON.parse(response.body)
  
      expect(VideoShare.count).to eq(prev_count + 1)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["username"]).to eq(user2.username)
    end
  end
end

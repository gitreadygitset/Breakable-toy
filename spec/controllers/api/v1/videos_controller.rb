require 'rails_helper'

RSpec.describe Api::V1::VideosController, type: :controller do
  let!(:user1) { FactoryBot.create(:user, role: 'independent user') }
  let!(:user2) { FactoryBot.create(:user, username: 'guest2', role: 'independent user' )}
  let!(:video1) { FactoryBot.create(:video, uploader: user1) }
  let!(:video2) { FactoryBot.create(:video, uploader: user1, title: 'another test video') }

  describe "GET#index" do
    it "Should return a list of videos uploaded by the current user" do
      sign_in user1
      get :index
      returned_json = JSON.parse(response.body)

      expect(returned_json["videos"].length).to eq(2)
      expect(returned_json["videos"][0]["title"]).to eq("test video")
      expect(returned_json["videos"][1]["title"]).to eq("another test video")
    end
  end

  describe "POST#create" do
    it "Should create a new video and return a JSON with its information" do
      sign_in user1
      post= {
          title: "uploaded video",
          video_url: fixture_file_upload('spec/fixtures/IMG_1404-1.mov', 'video/mov')
        }
      prev_count = Video.count
      post(:create, params: post)
      returned_json = JSON.parse(response.body)

      expect(Video.count).to eq(prev_count + 1)

      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json).to be_kind_of(Hash)
      expect(returned_json).to_not be_kind_of(Array)
      expect(returned_json["video"]["title"]).to eq("uploaded video")
    end
  end
end

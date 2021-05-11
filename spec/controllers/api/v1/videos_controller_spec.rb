require 'rails_helper'

RSpec.describe Api::V1::VideosController, type: :controller do
  let!(:user1) { FactoryBot.create(:user, role: 'independent user') }
  let!(:user2) { FactoryBot.create(:user, username: 'guest2', role: 'independent user' )}
  let!(:user3) { FactoryBot.create(:user, username: 'guest3') }
  let!(:video1) { FactoryBot.create(:video, uploader: user1) }
  let!(:video2) { FactoryBot.create(:video, uploader: user1, title: 'another test video') }
  let!(:video_share1) { VideoShare.create(user: user2, video: video1)}

  describe "GET#index" do
    it "Should return a list of videos uploaded by the current user" do
      sign_in user1
      get :index
      returned_json = JSON.parse(response.body)

      expect(returned_json["videos"].length).to eq(2)
      expect(returned_json["videos"][0]["video"]["title"]).to eq("test video")
      expect(returned_json["videos"][1]["video"]["title"]).to eq("another test video")
    end

    it "Should redirect to the login page if the user is not signed in" do
      get :index
      expect(response.status).to eq(302)
    end
  end

  describe "GET#show" do
    it "Should return the correct video" do
      sign_in user1
      get :show, params: {id: video1.id}
      returned_json = JSON.parse(response.body)
      
      expect(response.status).to eq 200
      expect(response.content_type).to eq("application/json")
      expect(returned_json["video"]["title"]).to eq(video1.title)
      expect(returned_json["users"].length).to eq(1)
    end

    it "Should display an error message if the user does not have access to the video" do
      sign_in user3
      get :show, params: {id: video1.id}
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 403
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
      expect(returned_json["video"]["title"]).to eq("uploaded video")
    end
  end
end

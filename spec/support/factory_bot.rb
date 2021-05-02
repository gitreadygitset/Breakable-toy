require 'factory_bot'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    username { 'guestuser1' }
    password { 'password' }
    password_confirmation { 'password' }
    role { 'supported user'}
  end

  factory :video do
    video_url { https://launch-video-playground.s3.amazonaws.com/uploads/IMG_1402.MOV }
    title { "Here is a video" }
  end
end

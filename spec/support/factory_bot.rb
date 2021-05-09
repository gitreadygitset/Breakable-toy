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
    video_url { fixture_file_upload 'spec/fixtures/IMG_1404-1.mov', 'video/mov' }
    title { 'test video' }
  end

  factory :question do
    body { 'my question' }
    vid_timestamp { 7 }
  end
end

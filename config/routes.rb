Rails.application.routes.draw do
  root "homes#landing"
  get "/videos", to: "homes#authenticated"
  get "/videos/:id", to: "homes#authenticated"
  user_session_path = "homes#authenticated"

  devise_for :users
   
  namespace :api do
    namespace :v1 do
      resources :videos, only: [:index, :create, :show, :destroy] do
        resources :questions, only: [:create, :destroy, :update]
        resources :video_shares, only: [:create, :destroy]
      end
      get "/questions/speak/:id", to: "questions#speak"
    end
  end
end

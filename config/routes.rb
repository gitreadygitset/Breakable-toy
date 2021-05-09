Rails.application.routes.draw do
  root "homes#authenticated"
  get "/videos", to: "homes#authenticated"
  get "/videos/:id", to: "homes#authenticated"
  
  devise_for :users
   
  namespace :api do
    namespace :v1 do
      resources :videos, only: [:index, :create, :show] do
        resources :questions, only: [:create, :destroy]
        resources :video_shares, only: [:create, :destroy]
      end
    end
  end
end

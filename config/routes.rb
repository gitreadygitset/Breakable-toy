Rails.application.routes.draw do

  root 'static_pages#index'
  
  get "/videos", to: "static_pages#index"
  get "/videos/:id", to: "static_pages#index"

  devise_for :users
   
  namespace :api do
    namespace :v1 do
      resources :videos, only: [:index]
    end
  end
end

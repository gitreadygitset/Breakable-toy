Rails.application.routes.draw do
  root "homes#authenticated"
  get "/videos", to: "homes#authenticated"
  
  devise_for :users
   
  namespace :api do
    namespace :v1 do
      resources :videos, only: [:index]
    end
  end
end

Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  namespace :api do

    resources :users, only: [:update]
    resources :matches, only: [:create]


    post "/users/:id", to: "users#index"
    get "/users/:id", to: "users#match_users"

    post "/users/:user_id/message_history", to: "messages#message_history"
    post "/users/:user_id/create_message", to: "messages#create_message"
    get "/users/:user_id/message_histories", to: "messages#message_histories"

    patch "/matches", to: "matches#update_last_read_at"




    
    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"
  end
  
  


  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
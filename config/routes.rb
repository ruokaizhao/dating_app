Rails.application.routes.draw do
  mount ActionCable.server => "/cable"
  namespace :api do
    resources :matches, only: [:create]
    resources :users, only: [:update] do
      post "/message_history", to: "messages#message_history"
      post "/create_message", to: "messages#create_message"
      get "/message_histories", to: "messages#message_histories"
      get "/matches/:recipient_id", to: "matches#get_match"
    end

    post "/users/:id", to: "users#index"
    get "/users/:id", to: "users#match_users"
    patch "/matches", to: "matches#update_last_read_at"

    post "/signup", to: "users#create"
    get "/me", to: "users#show"
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    post "/forgot_password", to: "users#forgot_password"
    post "/reset_password", to: "users#reset_password"
    post "/change_password", to: "users#change_password"
  end

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
      
end
Rails.application.routes.draw do
  root 'tracks#index'
  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  resources :tracks
  resource :profile, only: [:edit, :update]
  resources :users do
    resources :playlists, only: :index
  end
  resources :playlists, except: :index
end

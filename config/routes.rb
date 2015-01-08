Rails.application.routes.draw do
  root 'tracks#index'
  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  resources :tracks do
    resources :comments, only: [:new, :create, :index]
  end
  resource :profile, only: [:edit, :update]
  resources :users do
    resources :playlists, only: :index
  end

  resources :comments, only: [:edit, :update, :destroy]

  resources :playlist_memberships, only: [:create, :destroy]
  resources :playlists, except: :index
end

Rails.application.routes.draw do
  root 'backbone#index'

  namespace :api, defaults: {format: :json} do

    resources :users do
      resources :playlists, only: :index
    end

    resources :tracks do
      resources :comments, only: [:new, :create, :index]
      member do
        post 'like'
      end
    end

    resources :playlists, except: :index
    resources :playlists do
      member do
        post 'add_track/:track_id' => 'playlists#add_track'
        post 'remove_track/:track_id' => 'playlists#remove_track'
      end
    end

    resources :comments, only: [:edit, :update, :destroy]

  end

  get 'backbone', to: 'backbone#index'

  resources :users, only: [:new, :create, :show]
  resource :session, only: [:new, :create, :destroy]
  resources :tracks do
    member do
      get 'like'
      get 'unlike'
    end
    resources :comments, only: [:new, :create, :index]
  end
  resource :profile, only: [:edit, :update]
  resources :liked_tracks, only: :index
  resources :users do
    resources :playlists, only: :index
  end

  resources :comments, only: [:edit, :update, :destroy]

  resources :playlist_memberships, only: [:create, :destroy]
  resources :playlists, except: :index
end

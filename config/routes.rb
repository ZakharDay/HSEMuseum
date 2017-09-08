Rails.application.routes.draw do
  get 'users/index'

  devise_for :users
  resources :annotations
  resources :galleries
  resources :artworks
  resources :artists
  root 'artists#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

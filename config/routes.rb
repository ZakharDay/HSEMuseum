Rails.application.routes.draw do
  get 'users/index'

  devise_for :users

  get 'annotations/new_link', as: 'new_link_annotation'
  resources :annotations

  resources :galleries do
    resources :annotations
  end

  resources :artworks
  resources :artists
  root 'artists#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

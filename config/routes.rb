Rails.application.routes.draw do
  get 'users/index'

  devise_for :users

  resources :galleries do
    member do
      post :sort_items
    end

    resources :annotations do
      collection do
        get :new_link, as: :new_link_annotation
      end
    end

    resources :exhibitions, only: [:create, :destroy]
  end

  resources :artworks
  resources :artists
  root 'artists#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

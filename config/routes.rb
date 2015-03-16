Rails.application.routes.draw do
  devise_for :users
  resources :posts

  root 'posts#index'

  get 'admin' => 'admin#index'
end

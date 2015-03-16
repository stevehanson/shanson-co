Rails.application.routes.draw do
  resources :posts

  get '/auth/:provider/callback', to: 'sessions#create'

  root 'posts#index'

  # admin
  scope :admin, as: "admin" do
    get  "/"      => "admin#index"
    get  "login"  => "admin#show_login"
    get  "logout" => "admin#logout"
    post "login"  => "admin#login"
    post "posts/markdown" => "posts#markdown_preview"
  end

end

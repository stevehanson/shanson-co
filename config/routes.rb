Rails.application.routes.draw do
  resources :posts, except: [:show]

  get '/auth/:provider/callback', to: 'sessions#create'

  root "posts#index"
  get "/feed" => "posts#feed", :as => :feed, :defaults => { :format => 'atom' }

  scope :admin, as: "admin" do
    get  "login"  => "admin#show_login"
    get  "logout" => "admin#logout"
    post "login"  => "admin#login"
  end

  namespace :admin do
    get "/"       => "posts#index"

    resources :posts, except: [:show, :edit] do
      post "markdown"
    end
    get "/posts"  => "posts#index"
    post "posts/markdown" => "posts#markdown_preview"
  end

  namespace :api do
    post   "/kudos/:id" => "kudos#create"
    delete "/kudos/:id" => "kudos#destroy"
  end

  get "/hello-asciidoc-goodbye-word" => redirect("http://codetutr.com/2013/12/08/hello-asciidoc-goodbye-word/")

  get ":id" => "posts#show", as: :show_post

end

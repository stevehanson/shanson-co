class HomeController < ApplicationController

  def index
    @posts = Post.order("published_at DESC")
  end

end

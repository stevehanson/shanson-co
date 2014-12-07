class AdminController < ApplicationController

  def index
    @posts = Post.all
  end

end

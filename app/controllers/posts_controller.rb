class PostsController < ApplicationController
  def index
    @posts = Post.published.desc
  end

  def show
    @post = Post.published.find_by(slug: params[:id])
    not_found and return if @post.nil?
  end
end

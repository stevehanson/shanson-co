class PostsController < ApplicationController
  def index
    @posts = Post.not_pages.published.desc
  end

  def show
    @post = Post.published.find_by(slug: params[:id])
    not_found and return if @post.nil?

    template = @post.template || 'post'
    render "site_templates/#{template}"
  end
end

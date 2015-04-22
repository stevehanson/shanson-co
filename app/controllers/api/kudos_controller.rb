class Api::KudosController < ApplicationController
  def create
    post = Post.find(params[:id])
    post.increment!(:kudos)
    render json: { status: 200, message: "Sucess", count: post.kudos }, status: 201
  end

  def destroy
    post = Post.find(params[:id])
    post.decrement!(:kudos)
    render json: { status: 200, message: "Sucess", count: post.kudos }, status: 200
  end

  def show
    @post = Post.published.find_by(slug: params[:id])
    not_found and return if @post.nil?

    template = @post.template || 'post'
    render "site_templates/#{template}"
  end
end

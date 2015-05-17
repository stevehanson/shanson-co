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
end

class PostsController < ApplicationController

  def index
    @posts = Post.order("published_at DESC")
    respond_to do |format|
      format.html
      format.json { render json: @posts }
    end
  end

  def show
    @post = Post.find_by(slug: params[:id])
    not_found and return if @post.nil?
  end

  def create
    post_params['slug'] = post_params['name'].dasherize

    @post = Post.new(post_params)

    if @post.save
      render json: @post, status: :created
    else
      head :unprocessable_entity
    end
  end

  def update
    @post = Post.find(params[:id])

    if @post.update_attributes(post_params)
      render json: @post
    end
  end

  def destroy
    Post.find(params[:id]).destroy
    head :no_content
  end

  def post_params
    params.require(:post).permit(:title, :body, :published_at)
  end

end

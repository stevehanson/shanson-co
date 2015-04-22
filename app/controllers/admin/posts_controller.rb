class Admin::PostsController < AdminController
  def index
    @posts = Post.all
    respond_to do |format|
      format.html
      format.json { render json: @posts }
    end
  end

  def create
    params[:post][:slug] = post_params[:title].dasherize if post_params[:slug].blank?
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

  def markdown_preview
    render text: markdown(params[:markdown])
  end

  protected

  def post_params
    params.require(:post).permit(:title, :slug, :body, :draft, :template, :published_at)
  end
end
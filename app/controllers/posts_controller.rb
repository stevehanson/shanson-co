class PostsController < ApplicationController
  def index
    @posts = Post.not_pages.published.desc
  end

  def show
    @post = Post.find_by(slug: params[:id])
    not_found and return if @post.nil?

    template = @post.template || 'post'
    render "site_templates/#{template}"
  end

  # GET /feed
  def feed
    @posts = Post.not_pages.published.desc
    # this will be our Feed's update timestamp
    @updated = @posts.first.published_at unless @posts.empty?

    respond_to do |format|
      format.atom { render :layout => false }
      format.rss { redirect_to feed_path(:format => :atom), :status => :moved_permanently }
    end
  end
end

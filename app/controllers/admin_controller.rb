class AdminController < ApplicationController
  layout "admin"
  before_filter :set_user, :authorized?, except: [:show_login]

  def index
    @posts = Post.all
  end

  def show_login
    render file: "admin/login", layout: nil
  end

  def logout
    session[:current_user_id] = nil
    redirect_to admin_login_url
  end

  private

  def set_user
    @current_user = User.find(session[:current_user_id]) if admin?
  end

  def current_user
    set_user unless @current_user
    @current_user
  end

  def authorized?
    unless admin?
      flash[:error] = "You are not authorized to view this page."
      redirect_to admin_login_path
    end
  end

  def admin?
    session[:current_user_id]
  end
end

class SessionsController < ApplicationController
  skip_before_action :validate_user, only: :create

  def create
    user = User.find_or_create_by(email: google_params[:info][:email]) do |user|
      user.name = google_params[:info][:name],
      user.domain = google_params[:extra][:raw_info][:hd],
      user.uid = google_params[:uid],
      user.avatar_url = google_params[:info][:image]
    end

    if user.valid_user?
      session[:current_user_id] = user.id
      redirect_to :admin
    else
      flash[:notice] = "Error logging in.<br>Please request access."
      redirect_to :admin_login
    end
  end

  private

  def google_params
    @google_params ||= request.env['omniauth.auth']
  end
end
class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :authenticate

  def authenticate
    @current_user = User.find session[:user_id] if session[:user_id]

    if @current_user && @current_user.ip_address != request.remote_ip
      @current_user.update(ip_address: request.remote_ip)
    end

  end
end

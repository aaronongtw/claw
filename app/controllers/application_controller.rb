class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  @current_user = User.find 1

  def authenticate #global variable checklogin and access info
    #@current_user = User.find session[:user_id] if session[:user_id]

  end
end

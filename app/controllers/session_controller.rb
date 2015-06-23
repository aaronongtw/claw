class SessionController < ApplicationController
  # protect_from_forgery with: :exception

  def new
  end

  def create
    user = User.find_by :email => params[:email]
    binding.pry
    if user.present? && user.authenticate(params[:password])
      session[:user_id] = user.id
      user.update(ip_address: request.remote_ip)
      redirect_to root_path

    else
      flash[:notice] = "Invalid login, please try again."
      redirect_to root_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end


end


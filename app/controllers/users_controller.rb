class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def geolocation
    @current_user.update(user_params)
    render text: "got your geolocation thanks"
  end

  def uvoucher
    @clientList = []
    @userVouchers = []
    @current_user.vouchers.each do |v|
      @clientList << v.client.name 
    end
    @userVouchers << @current_user.vouchers << @clientList
    render json: @userVouchers
  end

  # GET /users
  # GET /users.json
  def index

    if @current_user.admin
      @users = User.all
    else
      redirect_to root_path
    end

  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        session[:user_id] = @user.id
        format.html { redirect_to root_path }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to root_path}
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = @current_user
    end

    # Never trust parameters from the scary internet, only allow the white list through.u
    def user_params
      params.require(:user).permit(:email, :username, :password, :password_confirmation, :lat, :lon, :ip_address)
    end
end

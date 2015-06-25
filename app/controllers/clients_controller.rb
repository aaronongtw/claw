class ClientsController < ApplicationController
  before_action :set_client, only: [:show, :edit, :update, :destroy]
  before_action :check_if_admin
  # GET /clients
  # GET /clients.json
  def index
      @clients = Client.all
  end

  def closestVoucher
    if @current_user.coins > 0 
      cVouchers = []
      coins_used = 1
      client = Client.near(@current_user, 1000, :order => "distance")
      client.each do |c|
        cVouchers << c.vouchers.sample
      end
      clawGM = (Client.find_by :name => "Claw of Noms")
      clawGM.vouchers.each do |v|
          cVouchers << v
      end
      clawGM.id
      prize = cVouchers.sample
      @current_user.coins -= coins_used
      @current_user.save
      @current_user.vouchers << prize
      data = [prize, @current_user.coins, (@current_user.vouchers.where("client_id != #{clawGM.id} ")).length]
      render :json => data
    end
  end

  # GET /clients/1
  # GET /clients/1.json
  def show
  end

  # GET /clients/new
  def new
    @client = Client.new
  end

  # GET /clients/1/edit
  def edit
  end

  # POST /clients
  # POST /clients.json
  def create
    @client = Client.new(client_params)

    respond_to do |format|
      if @client.save
        format.html { redirect_to @client, notice: 'Client was successfully created.' }
        format.json { render :show, status: :created, location: @client }
      else
        format.html { render :new }
        format.json { render json: @client.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /clients/1
  # PATCH/PUT /clients/1.json
  def update
    respond_to do |format|
      if @client.update(client_params)
        format.html { redirect_to @client, notice: 'Client was successfully updated.' }
        format.json { render :show, status: :ok, location: @client }
      else
        format.html { render :edit }
        format.json { render json: @client.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /clients/1
  # DELETE /clients/1.json
  def destroy
    @client.destroy
    respond_to do |format|
      format.html { redirect_to clients_url, notice: 'Client was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_client
      @client = Client.find(params[:id])
    end

    def check_if_admin
      if !@current_user.admin
        redirect_to root_path
      end

    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def client_params
      params.require(:client).permit(:name, :location, :clienttype, :latitude, :longitude, :used)
    end
end

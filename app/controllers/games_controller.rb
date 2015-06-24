class GamesController < ApplicationController
  before_action :set_game, only: [:show, :edit, :update, :destroy]
  include GamesHelper

  def game_rank
    score = game_params[:highscore].to_i
    game = game_params[:name]
    
    rank = nil
    
    if game && score
      rank = check_db_score(game, score) #games_helper.rb function
    end


    if request.xhr? && score
      render :json => rank
    end

  end


  # GET /games
  # GET /games.json
  def index
      if @current_user.admin
      @games = Game.all
    else
      redirect_to root_path
    end
  end

  # GET /games/1
  # GET /games/1.json
  def show
    if !@current_user.admin
      redirect_to root_path
    end
  end

  # GET /games/new
  def new
    @game = Game.new
  end

  # GET /games/1/edit
  def edit
    if !@current_user.admin
      redirect_to root_path
    end

  end

  # POST /games
  # POST /games.json
  def create
    @game = Game.new(game_params)

    respond_to do |format|
      if @game.save
        format.html { redirect_to @game, notice: 'Game was successfully created.' }
        format.json { render :show, status: :created, location: @game }
      else
        format.html { render :new }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /games/1
  # PATCH/PUT /games/1.json
  def update
    respond_to do |format|
      if @game.update(game_params)
        format.html { redirect_to @game, notice: 'Game was successfully updated.' }
        format.json { render :show, status: :ok, location: @game }
      else
        format.html { render :edit }
        format.json { render json: @game.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /games/1
  # DELETE /games/1.json
  def destroy
    @game.destroy
    respond_to do |format|
      format.html { redirect_to games_url, notice: 'Game was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game
      @game = Game.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def game_params
      params.require(:game).permit(:name, :highscore)
    end
end

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :authenticate

  def authenticate
    @current_user = User.find_by_id session[:user_id] if session[:user_id]
    
    reset_highscores if (Time.now - Game.first.updated_at).to_i > 2.hours
    
    if @current_user.present?
      @current_user.update(ip_address: request.remote_ip)
    end

  end


  def reset_highscores
    update = Game.first.resetscores ? false : true
    Game.first.update( resetscores: update )

      Game.all.each do |game|

        topscore_array = Highscore.where(
            :game_id => game.id).order(
            score: :desc, updated_at: :asc)

        #only want the first 5 high scores
        topscore_array = topscore_array[0..4] if topscore_array.count > 5

        coins_distribute(topscore_array)

      end

      playerscore_reset
  end


  def coins_distribute(topscore_array)
      #not using User.find because throws sql errors in console with id nil
      topscore_array.each do | score |
        user = (User.where :id => score.user_id).first
        if user            #need to check for user because of nil user 
          user.coins +=1 if user.coins < 10
          user.save
        end
      end

      

  end


  def playerscore_reset
      scores = Highscore.where.not(user_id: nil)
      scores.update_all(score: 0, rank: 0)
  end



end

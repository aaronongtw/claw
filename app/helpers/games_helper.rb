module GamesHelper

  def check_db_score(name, score)
    
      u_id = 4 #Need to fix this session variable! @current_user.id
      g_id = (Game.find_by :name => name).id

      #check if user has a game score
      user_score = Highscore.find_by :user_id => u_id, 
                                   :game_id => g_id

      
      #update if exist
      if user_score

        #only update if user score is lower than new score
        if user_score.score < score
          user_score.score = score
         
          user_score.save
        end

      #if not create a game score
      else
        user_score = Highscore.new
        user_score.user_id = u_id
        user_score.game_id = g_id
        user_score.score = score
        user_score.save

        
        user_score.save

      end

      #runs the what_rank which calcs ranking
      what_rank(user_score)

      return user_score.rank
  end



  def what_rank(user_score)

    #array of objects sorted by highest and oldest score
    #if youre first to get high score youre first
    rank_array = Highscore.where(
          :game_id => user_score.game_id).order(
          score: :desc, updated_at: :asc)

    #finds where the users.id is and returns its index in array
    #array index is the players rank + 1
    rank = rank_array.find_index { |score| score.id == user_score.id }
    rank += 1

    user_score.rank = rank
    user_score.save

  end


end
